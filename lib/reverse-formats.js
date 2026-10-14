// Settings for "MP3 to X" conversions. Every format is created in the browser with FFmpeg (WebAssembly),
// except AMR, which uses the opencore-amr encoder (public/vendor/amrnb-worker.js).
// Codec choices were tested with the site's FFmpeg build: libopus hangs there, so Opus uses FFmpeg's
// own encoder; the CAF muxer does not accept AAC, so CAF offers ALAC or PCM.

const audio = (codec, extra = []) => (kbps) => ['-i', 'IN', '-vn', '-c:a', codec, ...(kbps ? ['-b:a', `${kbps}k`] : []), ...extra];
const kbpsOptions = (list, make, suffix = 'kbps') => list.map((k) => ({ value: String(k), label: `${k} ${suffix}`, args: make(k) }));

// A video with a plain dark background, so audio can be used where a video file is required.
const stillVideo = (audioArgs) => [
  '-i', 'IN',
  '-f', 'lavfi', '-i', 'color=c=0x1e1b4b:s=1280x720:r=1',
  '-map', '1:v', '-map', '0:a',
  '-c:v', 'libx264', '-preset', 'ultrafast', '-tune', 'stillimage', '-pix_fmt', 'yuv420p',
  ...audioArgs,
  '-shortest',
];

export const REVERSE_TARGETS = {
  wma: {
    label: 'WMA', ext: 'wma', mime: 'audio/x-ms-wma',
    options: kbpsOptions([96, 128, 160, 192], audio('wmav2')), defaultOption: '128',
  },
  amr: {
    label: 'AMR', ext: 'amr', mime: 'audio/amr', amr: true,
    options: [
      { value: '7', label: '12.2 kbps (best voice quality)' },
      { value: '6', label: '10.2 kbps' },
      { value: '5', label: '7.95 kbps' },
      { value: '4', label: '7.4 kbps' },
      { value: '2', label: '5.9 kbps' },
      { value: '0', label: '4.75 kbps (smallest)' },
    ],
    defaultOption: '7',
    note: 'AMR is a speech format: the result is mono at 8 kHz, like a phone call.',
  },
  caf: {
    label: 'CAF', ext: 'caf', mime: 'audio/x-caf',
    options: [
      { value: 'alac', label: 'Apple Lossless (ALAC)', args: audio('alac')() },
      { value: 'pcm', label: 'Uncompressed PCM (largest)', args: audio('pcm_s16be')() },
    ],
    defaultOption: 'alac',
  },
  ac3: {
    label: 'AC3', ext: 'ac3', mime: 'audio/ac3',
    options: kbpsOptions([128, 192, 256, 384, 448], audio('ac3')), defaultOption: '256',
  },
  alac: {
    label: 'ALAC', ext: 'm4a', mime: 'audio/mp4',
    options: [{ value: 'alac', label: 'Apple Lossless', args: audio('alac')() }], defaultOption: 'alac',
    note: 'Saved as an .m4a file with Apple Lossless audio, ready for Apple Music and iTunes.',
  },
  m4b: {
    label: 'M4B', ext: 'm4b', mime: 'audio/mp4', allowMono: true, defaultMono: true,
    options: kbpsOptions([32, 48, 64, 96, 128], audio('aac')), defaultOption: '64',
  },
  flac: {
    label: 'FLAC', ext: 'flac', mime: 'audio/flac',
    options: [{ value: 'flac', label: 'Lossless FLAC', args: audio('flac')() }], defaultOption: 'flac',
    note: 'FLAC is lossless, so it keeps the MP3 exactly as it is. It cannot restore detail the MP3 already removed.',
  },
  aac: {
    label: 'AAC', ext: 'aac', mime: 'audio/aac', allowMono: true,
    options: kbpsOptions([96, 128, 160, 192, 256, 320], audio('aac')), defaultOption: '192',
  },
  ogg: {
    label: 'OGG', ext: 'ogg', mime: 'audio/ogg', allowMono: true,
    options: kbpsOptions([96, 128, 160, 192, 256, 320], audio('libvorbis')), defaultOption: '192',
  },
  opus: {
    label: 'OPUS', ext: 'opus', mime: 'audio/ogg', allowMono: true,
    options: kbpsOptions([32, 48, 64, 96, 128, 160], audio('opus', ['-strict', '-2', '-ar', '48000'])), defaultOption: '96',
  },
  webm: {
    label: 'WEBM', ext: 'webm', mime: 'audio/webm', allowMono: true,
    options: kbpsOptions([64, 96, 128, 160], audio('opus', ['-strict', '-2', '-ar', '48000'])), defaultOption: '128',
    note: 'Creates an audio-only WebM file with Opus sound, ideal for websites and web apps.',
  },
  mov: {
    label: 'MOV', ext: 'mov', mime: 'video/quicktime', video: true,
    options: kbpsOptions([128, 192, 256], (k) => stillVideo(['-c:a', 'aac', '-b:a', `${k}k`])), defaultOption: '192',
    note: 'Creates a QuickTime video with a plain dark background, so you can use your audio in video apps and upload sites.',
  },
  mkv: {
    label: 'MKV', ext: 'mkv', mime: 'video/x-matroska', video: true,
    options: [{ value: 'copy', label: 'Keep original MP3 audio (fastest)', args: stillVideo(['-c:a', 'copy']) }],
    defaultOption: 'copy',
    note: 'Creates an MKV video with a plain dark background and your original MP3 sound, without re-encoding the audio.',
  },
};
