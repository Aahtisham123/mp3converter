# Link download service

Small Node.js service used by mp3convert.tools for "paste a link" downloads. It uses
[yt-dlp](https://github.com/yt-dlp/yt-dlp) to fetch videos and FFmpeg to convert them to MP3 or MP4.
The website (on Vercel) calls it from the visitor's browser.

## API
| Method | Path | Body / result |
| --- | --- | --- |
| `POST` | `/api/info` | `{ url }` → title, thumbnail, duration, available MP3/MP4 qualities |
| `POST` | `/api/jobs` | `{ url, type: "mp3" \| "mp4", quality, title }` → job |
| `GET` | `/api/jobs/:id` | status (`downloading`, `converting`, `done`, `error`), progress |
| `GET` | `/api/jobs/:id/file` | the finished file (deleted after `FILE_TTL_MINUTES`) |
| `GET` | `/health` | health check |

Built-in reliability: automatic retries when a site blocks a request (`BLOCK_RETRIES`), a file cache so
popular videos are fetched once and served instantly (`CACHE_TTL_MINUTES`, `CACHE_MAX_MB`; all YouTube link
forms share one cache entry), a video-info cache (`INFO_CACHE_MINUTES`) and sharing of identical requests
that are in progress.

Built-in protection: single videos only (no playlists or live streams), maximum length and file size,
per-IP rate limits, a concurrency limit, blocking of private/internal addresses, and a `BLOCKLIST`
for links you are asked to remove.

## Deploy on a VPS (Ubuntu, about 5 minutes)
1. Create a VPS with at least 2 GB RAM (Hetzner, DigitalOcean, Vultr…).
2. Point a DNS **A record**, for example `dl.mp3convert.tools`, to the server's IP.
3. On the server:
   ```bash
   curl -fsSL https://get.docker.com | sh
   git clone https://github.com/Aahtisham123/mp3converter.git
   cd mp3converter/downloader
   cp .env.example .env    # then edit DOMAIN and ALLOWED_ORIGINS
   docker compose up -d --build
   ```
4. Check `https://dl.mp3convert.tools/health` shows `{"ok":true,...}`.
5. In Vercel → Project → Settings → Environment Variables, add
   `NEXT_PUBLIC_DOWNLOADER_URL=https://dl.mp3convert.tools` and redeploy the website.

## Keeping it working
- yt-dlp updates itself each time the container starts. Restart daily with cron:
  `0 4 * * * cd /root/mp3converter/downloader && docker compose restart downloader`
- If the logs show "Sign in to confirm you're not a bot" or "Failed to extract any player response",
  YouTube is blocking the server's IP. Set `YTDLP_PROXY` to a residential proxy and
  `YTDLP_PROXY_DOMAINS=youtube.com,youtu.be` so only YouTube uses (and is billed through) the proxy.
- If logs still show "Sign in to confirm you're not a bot" with a proxy, the proxy IP is flagged too.
  Use a residential proxy, or give yt-dlp YouTube cookies: export `cookies.txt` from a spare Google
  account (see the yt-dlp wiki "Exporting YouTube cookies"), add it as a secret file
  (Render: Environment → Secret Files → `cookies.txt`) and set `YTDLP_COOKIES=/etc/secrets/cookies.txt`.
  The server works on a private writable copy of the file. Never use your main Google account.
- Logs: `docker compose logs -f downloader`

## Local testing
```bash
pip install "yt-dlp[default]"   # and install ffmpeg
ALLOWED_ORIGINS=http://localhost:3000 node server.mjs
```
