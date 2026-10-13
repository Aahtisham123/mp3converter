# MP3 Converter — mp3convert.tools

Free online MP3 converter built with Next.js (App Router). Audio and video files are converted to MP3
**inside the visitor's browser** — nothing is uploaded to a server.

## How it works
- The browser's Web Audio API decodes the file (WAV, M4A, AAC, FLAC, OGG, OPUS, MP4, MOV, WEBM, MKV, …).
- `public/mp3-worker.js` encodes the audio to MP3 in a Web Worker using LAME via
  [lamejs](https://github.com/zhuker/lamejs) (`public/vendor/lame.min.js`, LGPL-3.0, licence included).
- Bitrates: 128 / 192 / 256 / 320 kbps, optional mono, batch conversion, and microphone recording to MP3.

Codec support depends on the browser (e.g. MP4/AAC needs Chrome, Edge, Safari or Firefox with system codecs).

## Development
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure
- `app/page.js` – homepage (tool + SEO content + JSON-LD: WebSite, WebApplication, FAQPage)
- `app/layout.js` – metadata, Open Graph, fonts
- `app/sitemap.js`, `app/robots.js` – `/sitemap.xml` and `/robots.txt`
- `components/AppShell.js` – collapsible sidebar (desktop icon rail, mobile drawer)
- `components/Converter.js` – upload / record converter UI
- `lib/site.js` – site settings and navigation (tool pages other than `/` are not built yet)
- `public/images/` – illustrations, logo and Open Graph image
