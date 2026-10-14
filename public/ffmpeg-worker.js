/* FFmpeg compiled to WebAssembly (https://ffmpegwasm.netlify.app, LGPL/GPL), used for two jobs:
   1. decode: turn any audio/video file the browser cannot read into 16-bit WAV;
   2. convert: create other formats (WMA, AC3, ALAC, FLAC, OGG, ...) from an MP3 or other audio file.
   Everything runs inside the visitor's browser. */
let core = null;

async function load() {
  if (core) return core;
  importScripts('/ffmpeg/ffmpeg-core.js');
  const meta = btoa(JSON.stringify({ wasmURL: '/ffmpeg/ffmpeg-core.wasm', workerURL: '' }));
  core = await self.createFFmpegCore({ mainScriptUrlOrBlob: `/ffmpeg/ffmpeg-core.js#${meta}` });
  core.setLogger(() => {});
  return core;
}

function remove(ff, name) {
  try {
    ff.FS.unlink(name);
  } catch {}
}

self.onmessage = async (e) => {
  const { id, type = 'decode', file, ext, args, out } = e.data;
  const input = `input.${ext || 'bin'}`;
  const output = type === 'convert' ? out : 'output.wav';
  try {
    const ff = await load();
    self.postMessage({ id, type: 'loaded' });
    ff.setProgress(({ progress }) => {
      if (progress >= 0 && progress <= 1) self.postMessage({ id, type: 'progress', progress });
    });
    ff.FS.writeFile(input, new Uint8Array(await file.arrayBuffer()));
    ff.setTimeout(-1);
    if (type === 'convert') {
      // `args` uses the placeholder "IN" for the input file; the output file name is appended.
      ff.exec('-hide_banner', '-y', ...args.map((a) => (a === 'IN' ? input : a)), output);
    } else {
      ff.exec('-hide_banner', '-i', input, '-vn', '-sn', '-dn', '-ac', '2', '-ar', '44100', '-c:a', 'pcm_s16le', '-bitexact', '-f', 'wav', output);
    }
    const ret = ff.ret;
    ff.reset();
    remove(ff, input);
    if (ret !== 0) {
      remove(ff, output);
      throw new Error(type === 'convert' ? 'Conversion failed' : 'No readable audio track found');
    }
    const data = ff.FS.readFile(output);
    remove(ff, output);
    self.postMessage({ id, type: 'done', data }, [data.buffer]);
  } catch (err) {
    if (core) {
      remove(core, input);
      remove(core, output);
    }
    // A crashed WebAssembly instance cannot be reused, so start fresh next time.
    if (!(err && /No readable audio track|Conversion failed/.test(err.message))) core = null;
    self.postMessage({ id, type: 'error', message: (err && err.message) || String(err) });
  }
};
