export const SITE = {
  name: 'MP3 Converter',
  url: 'https://mp3convert.tools',
  tagline: 'Convert audio and video to MP3 free online',
  email: 'contact@mp3convert.tools',
};

// Social profiles shown in the footer. Replace '#' with your real profile URLs.
export const SOCIAL_LINKS = [
  { name: 'Facebook', icon: 'facebook', href: '#' },
  { name: 'X (Twitter)', icon: 'x', href: '#' },
  { name: 'Instagram', icon: 'instagram', href: '#' },
  { name: 'YouTube', icon: 'youtube', href: '#' },
  { name: 'TikTok', icon: 'tiktok', href: '#' },
];

// Link download service (see downloader/README.md). Set NEXT_PUBLIC_DOWNLOADER_URL in Vercel.
export const DOWNLOADER_URL = (process.env.NEXT_PUBLIC_DOWNLOADER_URL || '').replace(/\/+$/, '');

// Sidebar navigation. Every route here is a page in app/[slug] (content in lib/tools.js).
export const PRIMARY_NAV = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/youtube-to-mp3', label: 'YouTube to MP3', icon: 'youtube' },
  { href: '/youtube-to-mp4', label: 'YouTube to MP4', icon: 'youtube' },
  { href: '/youtube-to-wav', label: 'YouTube to WAV', icon: 'youtube' },
  { href: '/online-video-downloader', label: 'Online Video Downloader', icon: 'link' },
  { href: '/mp4-to-mp3', label: 'MP4 to MP3 Converter', icon: 'fileVideo' },
  { href: '/tiktok-to-mp3', label: 'TikTok to MP3', icon: 'music', soon: true },
  { href: '/video-to-mp3', label: 'Video to MP3 Converter', icon: 'film' },
  { href: '/wav-to-mp3', label: 'WAV to MP3 Converter', icon: 'wave' },
  { href: '/m4a-to-mp3', label: 'M4A to MP3 Converter', icon: 'fileAudio' },
  { href: '/voice-to-mp3', label: 'Voice Recorder to MP3', icon: 'mic' },
];

export const NAV_GROUPS = [
  {
    id: 'formats',
    label: 'MP3 Converter Tools',
    icon: 'grid',
    items: [
      { href: '/flac-to-mp3', label: 'FLAC to MP3', icon: 'music' },
      { href: '/aac-to-mp3', label: 'AAC to MP3', icon: 'music' },
      { href: '/ogg-to-mp3', label: 'OGG to MP3', icon: 'music' },
      { href: '/opus-to-mp3', label: 'OPUS to MP3', icon: 'music' },
      { href: '/webm-to-mp3', label: 'WEBM to MP3', icon: 'video' },
      { href: '/mov-to-mp3', label: 'MOV to MP3', icon: 'video' },
      { href: '/mkv-to-mp3', label: 'MKV to MP3', icon: 'video' },
      { href: '/wma-to-mp3', label: 'WMA to MP3', icon: 'fileAudio' },
      { href: '/amr-to-mp3', label: 'AMR to MP3', icon: 'mic' },
      { href: '/caf-to-mp3', label: 'CAF to MP3', icon: 'fileAudio' },
      { href: '/ac3-to-mp3', label: 'AC3 to MP3', icon: 'headphones' },
      { href: '/alac-to-mp3', label: 'ALAC to MP3', icon: 'music' },
      { href: '/m4b-to-mp3', label: 'M4B to MP3', icon: 'book' },
    ],
  },
  {
    id: 'tools',
    label: 'MP3 Tools',
    icon: 'sliders',
    items: [
      { href: '/mp3-cutter', label: 'MP3 Cutter', icon: 'scissors' },
      { href: '/mp3-compressor', label: 'MP3 Compressor', icon: 'compress' },
      { href: '/audio-joiner', label: 'Audio Joiner', icon: 'layers' },
      { href: '/podcast-to-mp3', label: 'Podcast to MP3', icon: 'podcast' },
    ],
  },
];
