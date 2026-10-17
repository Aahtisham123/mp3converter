/* Speech to text in the browser with Whisper (OpenAI, MIT) running on transformers.js (Apache-2.0).
   The library and its ONNX runtime load from jsDelivr, the model from Hugging Face; the browser caches them.
   The audio itself never leaves the device. */
import { env, pipeline, Tensor, WhisperTextStreamer } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.1/dist/transformers.min.js';

env.allowLocalModels = false;

const MODELS = {
  tiny: 'Xenova/whisper-tiny',
  base: 'Xenova/whisper-base',
  small: 'Xenova/whisper-small',
};
const SAMPLE_RATE = 16000;
const CHUNK_S = 30;
const STRIDE_S = 5;

let loaded = { key: null, asr: null };

async function getPipeline(size, report) {
  if (loaded.key === size) return loaded.asr;
  if (loaded.asr) await loaded.asr.dispose().catch(() => {});
  loaded = { key: null, asr: null };
  const asr = await pipeline('automatic-speech-recognition', MODELS[size], {
    dtype: 'q8',
    device: 'wasm',
    progress_callback: (p) => {
      if (p.status === 'progress_total') report({ type: 'loading', progress: p.progress, loaded: p.loaded, total: p.total });
    },
  });
  loaded = { key: size, asr };
  return asr;
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

self.onmessage = async (e) => {
  const { id, audio, size, language, candidates } = e.data;
  const post = (msg) => self.postMessage({ id, ...msg });
  try {
    const asr = await getPipeline(size, post);
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
    post({ type: 'done', text: output.text.trim(), chunks, language: lang });
  } catch (err) {
    post({ type: 'error', message: (err && err.message) || String(err) });
  }
};
