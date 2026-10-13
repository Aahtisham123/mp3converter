FROM node:22-bookworm-slim

# FFmpeg converts to MP3 and merges video + audio. yt-dlp fetches the media.
RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg python3 python3-venv ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && python3 -m venv /opt/yt \
 && /opt/yt/bin/pip install --no-cache-dir -U "yt-dlp[default]" \
 && useradd --create-home app \
 && mkdir -p /data/jobs && chown -R app /data /opt/yt

ENV PATH="/opt/yt/bin:$PATH" \
    WORK_DIR=/data/jobs \
    PORT=8080 \
    NODE_ENV=production

WORKDIR /app
COPY --chown=app server.mjs entrypoint.sh ./
RUN chmod +x entrypoint.sh
USER app
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s CMD node -e "fetch('http://127.0.0.1:8080/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["./entrypoint.sh"]
