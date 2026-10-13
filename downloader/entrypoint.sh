#!/bin/sh
# Sites like YouTube change often, so update yt-dlp every time the container starts.
pip install --no-cache-dir -q -U "yt-dlp[default]" >/dev/null 2>&1 || echo "yt-dlp update failed, using installed version"
echo "yt-dlp $(yt-dlp --version)"
exec node server.mjs
