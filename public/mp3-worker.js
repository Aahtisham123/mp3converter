/* Encodes decoded PCM audio to MP3 off the main thread using lamejs (LGPL-3.0, see /vendor/lamejs-LICENSE.txt). */
importScripts('/vendor/lame.min.js');

const FRAME = 1152;
const CHUNK = FRAME * 64;

function toInt16(float32) {
  const out = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

self.onmessage = (e) => {
  const { id, channels, sampleRate, bitrate } = e.data;
  try {
    const left = toInt16(channels[0]);
    const right = channels.length > 1 ? toInt16(channels[1]) : null;
    const encoder = new lamejs.Mp3Encoder(right ? 2 : 1, sampleRate, bitrate);
    const parts = [];
    const total = left.length;
    let lastReport = 0;

    for (let i = 0; i < total; i += CHUNK) {
      const l = left.subarray(i, i + CHUNK);
      const buf = right ? encoder.encodeBuffer(l, right.subarray(i, i + CHUNK)) : encoder.encodeBuffer(l);
      if (buf.length) parts.push(new Uint8Array(buf));
      const pct = Math.min(99, Math.round(((i + CHUNK) / total) * 100));
      if (pct > lastReport) {
        lastReport = pct;
        self.postMessage({ id, type: 'progress', progress: pct });
      }
    }
    const end = encoder.flush();
    if (end.length) parts.push(new Uint8Array(end));

    const blob = new Blob(parts, { type: 'audio/mpeg' });
    self.postMessage({ id, type: 'done', blob });
  } catch (err) {
    self.postMessage({ id, type: 'error', message: (err && err.message) || 'Encoding failed' });
  }
};
