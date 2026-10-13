// Copies the FFmpeg WebAssembly core into public/ so it is served from our own domain.
// It is only downloaded by visitors when their browser cannot decode a file natively.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'node_modules', '@ffmpeg', 'core', 'dist', 'umd');
const dest = join(root, 'public', 'ffmpeg');

if (!existsSync(src)) {
  console.warn('[copy-ffmpeg] @ffmpeg/core not installed, skipping');
  process.exit(0);
}
mkdirSync(dest, { recursive: true });
for (const f of ['ffmpeg-core.js', 'ffmpeg-core.wasm']) copyFileSync(join(src, f), join(dest, f));
console.log('[copy-ffmpeg] copied FFmpeg core to public/ffmpeg');
