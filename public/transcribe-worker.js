/* Speech to text in the browser with Whisper (OpenAI, MIT) running on transformers.js (Apache-2.0).
   The library and its ONNX runtime load from jsDelivr, the model from Hugging Face; the browser caches them.
   The audio itself never leaves the device.
   Where the browser supports WebGPU, the model runs on the graphics card (much faster); otherwise, or if the GPU
   cannot load or run it, it runs on the processor with WebAssembly. */
import { env, pipeline, Tensor, WhisperTextStreamer } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.1/dist/transformers.min.js';

env.allowLocalModels = false;

// WebAssembly uses 8-bit models; WebGPU uses a full-precision encoder (quantized encoders lose accuracy on GPU)
// and a 4-bit decoder, as in the transformers.js WebGPU Whisper examples.
const MODELS = {
  tiny: { wasm: 'Xenova/whisper-tiny', gpu: 'onnx-community/whisper-tiny' },
  base: { wasm: 'Xenova/whisper-base', gpu: 'onnx-community/whisper-base' },
  small: { wasm: 'Xenova/whisper-small', gpu: 'onnx-community/whisper-small' },
};
const GPU_DTYPE = { encoder_model: 'fp32', decoder_model_merged: 'q4' };
const SAMPLE_RATE = 16000;
const CHUNK_S = 30;
const STRIDE_S = 5;

let gpuUsable; // undefined until checked, false once the GPU failed
async function canUseGpu() {
  if (gpuUsable === undefined) {
    try {
      gpuUsable = Boolean(self.navigator && navigator.gpu && (await navigator.gpu.requestAdapter()));
    } catch {
      gpuUsable = false;
    }
  }
  return gpuUsable;
}

// Download progress goes to whichever request is waiting; a preload has no listener yet.
const progress_callback = (p) => {
  if (p.status === 'progress_total') self.postMessage({ type: 'loading', progress: p.progress, loaded: p.loaded, total: p.total });
};

async function load(size, cpuOnly) {
  if (!cpuOnly && (await canUseGpu())) {
    try {
      const asr = await pipeline('automatic-speech-recognition', MODELS[size].gpu, { device: 'webgpu', dtype: GPU_DTYPE, progress_callback });
      return { asr, device: 'webgpu' };
    } catch (err) {
      console.warn('[transcriber] WebGPU unavailable, using the processor instead:', err);
      gpuUsable = false;
    }
  }
  const asr = await pipeline('automatic-speech-recognition', MODELS[size].wasm, { device: 'wasm', dtype: 'q8', progress_callback });
  return { asr, device: 'wasm' };
}

// One model in memory at a time. A preload and the real request share the same promise, so nothing downloads twice.
let current = null; // { size, cpuOnly, device, promise }; device is set once loaded
function getPipeline(size, cpuOnly = false) {
  if (gpuUsable === false) cpuOnly = true;
  // A pending load is reused too: if the GPU fails while loading, load() itself falls back to the processor.
  if (current && current.size === size && (!cpuOnly || current.device !== 'webgpu')) return current.promise;
  const previous = current;
  const entry = { size, cpuOnly, device: null, promise: null };
  entry.promise = (async () => {
    if (previous) {
      try {
        await (await previous.promise).asr.dispose();
      } catch {}
    }
    const loaded = await load(size, cpuOnly);
    entry.device = loaded.device;
    return loaded;
  })();
  current = entry;
  entry.promise.catch(() => {
    if (current === entry) current = null;
  });
  return entry.promise;
}

/** Whisper predicts the language as its first token: score the candidate languages on the first 30 seconds. */
async function detectLanguage(asr, audio, candidates) {
  const { model, processor } = asr;
  const { input_features } = await processor(audio.subarray(0, SAMPLE_RATE * CHUNK_S));
  const config = model.generation_config;
  const decoder_input_ids = new Tensor('int64', BigInt64Array.from([BigInt(config.decoder_start_token_id)]), [1, 1]);
  const { logits } = await model({ input_features, decoder_input_ids });
  const scores = logits.data;
  const offset = scores.length - logits.dims.at(-1);
  let best = 'en';
  let bestScore = -Infinity;
  for (const [token, id] of Object.entries(config.lang_to_id)) {
    const code = token.slice(2, -2);
    if (candidates && candidates.length && !candidates.includes(code)) continue;
    if (scores[offset + id] > bestScore) {
      bestScore = scores[offset + id];
      best = code;
    }
  }
  return best;
}

function windowCount(samples) {
  const window = SAMPLE_RATE * CHUNK_S;
  const jump = SAMPLE_RATE * (CHUNK_S - 2 * STRIDE_S);
  return samples <= window ? 1 : Math.ceil((samples - window) / jump) + 1;
}

async function transcribe(asr, audio, language, candidates, post) {
  let lang = language;
  if (!lang || lang === 'auto') {
    post({ type: 'detecting' });
    lang = await detectLanguage(asr, audio, candidates);
  }
  post({ type: 'language', language: lang });

  const total = windowCount(audio.length);
  let done = 0;
  post({ type: 'progress', done, total });
  const streamer = new WhisperTextStreamer(asr.tokenizer, {
    skip_prompt: true,
    callback_function: (text) => post({ type: 'partial', text }),
  });
  const end = streamer.end.bind(streamer);
  streamer.end = () => {
    end();
    done = Math.min(total, done + 1);
    post({ type: 'progress', done, total });
  };

  const output = await asr(audio, {
    language: lang,
    task: 'transcribe',
    return_timestamps: true,
    chunk_length_s: CHUNK_S,
    stride_length_s: STRIDE_S,
    // Stops Whisper from looping on one word when the audio is unclear.
    no_repeat_ngram_size: 4,
    streamer,
  });
  const chunks = (output.chunks || []).map((c) => ({ start: c.timestamp[0], end: c.timestamp[1], text: c.text }));
  return { text: output.text.trim(), chunks, language: lang };
}

self.onmessage = async (e) => {
  // Started as soon as a file is chosen or a recording begins, so the download overlaps with the visitor's next steps.
  if (e.data.type === 'preload') {
    getPipeline(e.data.size).catch(() => {});
    return;
  }
  const { id, audio, size, language, candidates } = e.data;
  const post = (msg) => self.postMessage({ id, ...msg });
  try {
    let { asr, device } = await getPipeline(size);
    post({ type: 'engine', device });
    let result;
    try {
      result = await transcribe(asr, audio, language, candidates, post);
    } catch (err) {
      if (device !== 'webgpu') throw err;
      // The GPU loaded the model but could not run it: retry once on the processor.
      console.warn('[transcriber] WebGPU run failed, retrying on the processor:', err);
      gpuUsable = false;
      ({ asr, device } = await getPipeline(size, true));
      post({ type: 'engine', device });
      result = await transcribe(asr, audio, language, candidates, post);
    }
    post({ type: 'done', ...result });
  } catch (err) {
    post({ type: 'error', message: (err && err.message) || String(err) });
  }
};
