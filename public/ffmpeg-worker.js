/* Fallback decoder: turns any audio/video file the browser cannot read into 16-bit WAV
   using FFmpeg compiled to WebAssembly (https://ffmpegwasm.netlify.app, LGPL/GPL). */
let core = null;

async function load() {
  if (core) return core;
  importScripts('/ffmpeg/ffmpeg-core.js');
  const meta = btoa(JSON.stringify({ wasmURL: '/ffmpeg/ffmpeg-core.wasm', workerURL: '' }));
  core = await self.createFFmpegCore({ mainScriptUrlOrBlob: `/ffmpeg/ffmpeg-core.js#${meta}` });
  core.setLogger(() => {});
  return core;
}

self.onmessage = async (e) => {
  const { id, file, ext } = e.data;
  const input = `input.${ext || 'bin'}`;
  try {
    const ff = await load();
    self.postMessage({ id, type: 'loaded' });
    ff.setProgress(({ progress }) => {
      if (progress >= 0 && progress <= 1) self.postMessage({ id, type: 'progress', progress });
    });
    ff.FS.writeFile(input, new Uint8Array(await file.arrayBuffer()));
    ff.setTimeout(-1);
    ff.exec('-hide_banner', '-i', input, '-vn', '-sn', '-dn', '-ac', '2', '-ar', '44100', '-c:a', 'pcm_s16le', '-bitexact', '-f', 'wav', 'output.wav');
    const ret = ff.ret;
    ff.reset();
    try { ff.FS.unlink(input); } catch {}
    if (ret !== 0) throw new Error('No readable audio track found');
    const out = ff.FS.readFile('output.wav');
    try { ff.FS.unlink('output.wav'); } catch {}
    self.postMessage({ id, type: 'done', data: out }, [out.buffer]);
  } catch (err) {
    try { core && core.FS.unlink(input); } catch {}
    // A crashed WebAssembly instance cannot be reused, so start fresh next time.
    if (!(err && err.message === 'No readable audio track found')) core = null;
    self.postMessage({ id, type: 'error', message: (err && err.message) || String(err) });
  }
};
