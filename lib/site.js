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

// Sidebar navigation. Labels come from the dictionary (nav.<slug>, nav.group<Id>); every route is a page in
// app/[lang]/[slug] with its content in lib/tools.js. Groups with a hub link their heading to that hub page, which
// lists every tool of the group, and tool pages use their group for breadcrumbs.
const item = (slug, icon) => ({ href: `/${slug}`, icon });

export const POPULAR_NAV = [
  item('mp4-to-mp3', 'fileVideo'),
  item('youtube-to-mp3', 'youtube'),
  item('wav-to-mp3', 'wave'),
  item('m4a-to-mp3', 'fileAudio'),
  item('mp3-cutter', 'scissors'),
];

export const NAV_GROUPS = [
  {
    id: 'video',
    label: 'groupVideo',
    hub: '/video-to-mp3',
    icon: 'film',
    items: [item('mp4-to-mp3', 'fileVideo'), item('mov-to-mp3', 'video'), item('webm-to-mp3', 'video'), item('mkv-to-mp3', 'video'), item('video-to-mp3', 'film')],
  },
  {
    id: 'audio',
    label: 'groupAudio',
    hub: '/audio-to-mp3',
    icon: 'music',
    items: [
      item('wav-to-mp3', 'wave'),
      item('m4a-to-mp3', 'fileAudio'),
      item('flac-to-mp3', 'music'),
      item('aac-to-mp3', 'music'),
      item('ogg-to-mp3', 'music'),
      item('opus-to-mp3', 'music'),
      item('wma-to-mp3', 'fileAudio'),
      item('amr-to-mp3', 'mic'),
      item('alac-to-mp3', 'music'),
      item('ac3-to-mp3', 'headphones'),
      item('caf-to-mp3', 'fileAudio'),
      item('m4b-to-mp3', 'book'),
    ],
  },
  {
    id: 'link',
    label: 'groupLink',
    hub: '/link-to-mp3',
    icon: 'link',
    items: [item('youtube-to-mp3', 'youtube'), item('youtube-to-wav', 'youtube'), item('podcast-to-mp3', 'podcast'), item('youtube-to-mp4', 'youtube'), item('online-video-downloader', 'link')],
  },
  {
    id: 'edit',
    label: 'groupEdit',
    hub: '/mp3-tools',
    icon: 'sliders',
    items: [item('mp3-cutter', 'scissors'), item('mp3-compressor', 'compress'), item('audio-joiner', 'layers')],
  },
  {
    id: 'record',
    label: 'groupRecord',
    icon: 'mic',
    items: [item('voice-to-mp3', 'mic'), item('transcribe-audio-to-text', 'fileText')],
  },
];

/** The hub group a tool belongs to (its first group with a hub page), or null. */
export function hubGroupOf(slug) {
  const href = `/${slug}`;
  if (NAV_GROUPS.some((g) => g.hub === href)) return null;
  return NAV_GROUPS.find((g) => g.hub && g.items.some((i) => i.href === href)) || null;
}
