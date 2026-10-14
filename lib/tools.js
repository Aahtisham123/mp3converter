// Content and settings for every tool page (rendered by app/[slug]/page.js).

const videoFormats = 'MP4, MOV, MKV, WEBM, AVI, WMV, FLV, 3GP, M4V';

export const TOOLS = [

  // ------------------------------------------------------------------ YouTube to MP3
  {
    slug: 'youtube-to-mp3',
    nav: 'YouTube to MP3 Converter',
    kind: 'link',
    tool: {
      heading: 'Paste a YouTube link to convert it to MP3.',
      formats: 'Videos, Shorts and YouTube Music links · 64 to 320 kbps · mono or stereo · cut any part',
      linkFormats: ['mp3'],
      sites: 'youtube',
      advanced: true,
      placeholder: 'Paste a YouTube link, e.g. https://www.youtube.com/watch?v=…',
    },
    metaTitle: 'YouTube to MP3 Converter – 320 kbps, Trim & Mono Options',
    metaDescription:
      'Convert YouTube videos, Shorts and YouTube Music links to MP3. Choose 64 to 320 kbps, mono or stereo, and cut out just the part you need. Free, no sign-up.',
    h1: 'YouTube to MP3 Converter',
    lead: 'Turn any YouTube link into an MP3 with full control: pick the bitrate, choose mono or stereo, and save only the minutes you actually want.',
    intro: {
      h2: 'More than a basic YouTube MP3 download',
      paras: [
        'Most YouTube to MP3 tools give you one button and one quality. That works, yet it often leaves you with a file that is bigger than needed, or a full two-hour livestream recording when you only wanted a ten-minute talk inside it.',
        'This converter focuses on audio only, so it can offer the options that matter for sound. You choose from seven bitrates, switch speech to mono to halve the file size, and cut a section by typing a start and end time. The result is a clean MP3 that fits your phone, your car stereo or your podcast app.',
      ],
    },
    steps: [
      ['Copy the YouTube link', 'Tap Share under the video and choose Copy link. Watch pages, youtu.be short links, Shorts and YouTube Music links all work.'],
      ['Paste it and pick a bitrate', '192 kbps is the sweet spot for most videos. Go up to 320 kbps for music, or down to 64 to 96 kbps for long talks.'],
      ['Add extras if you like', 'Turn on Mono for speech. Turn on Cut a part and enter times such as 1:20 to 4:05 to keep only that section.'],
      ['Convert and download', 'Tap Convert to MP3, watch the circle fill up, then tap the round Download button.'],
    ],
    sections: [
      {
        h2: 'Which settings should you choose?',
        list: [
          ['Music and live sessions', '256 or 320 kbps in stereo keeps every instrument clear.'],
          ['Podcasts, interviews and lectures', '96 or 128 kbps in mono sounds just as clear and takes about a quarter of the space.'],
          ['Language lessons and audiobooks', '64 kbps mono makes very long recordings small enough to carry dozens on your phone.'],
          ['Ringtones and clips', 'Use Cut a part to keep 20 to 30 seconds, then trim further with our MP3 Cutter if needed.'],
        ],
      },
      {
        h2: 'How good can a YouTube MP3 sound?',
        paras: [
          'YouTube usually delivers audio at roughly 128 to 160 kbps in the Opus or AAC format. Converting at 192 kbps therefore keeps everything the original stream contains. A 320 kbps file adds a safety margin for music, but it cannot add detail that YouTube never sent, so there is no need to go higher for spoken content.',
        ],
      },
      {
        h2: 'Use it responsibly',
        paras: [
          'YouTube’s terms only allow downloads where YouTube offers a download option, and much of its music is protected by copyright. Please convert your own uploads, Creative Commons and public-domain videos, or content you have permission to save. MP3 Converter is an independent tool and is not affiliated with, endorsed by or sponsored by YouTube or Google.',
        ],
      },
    ],
    faqs: [
      { q: 'Can I convert only part of a YouTube video to MP3?', a: 'Yes. Turn on Cut a part, enter a start time such as 2:10 and an end time such as 5:45, then convert. Only that section becomes your MP3, which saves time and data.' },
      { q: 'What is the best bitrate for YouTube to MP3?', a: 'For most videos 192 kbps keeps all the quality YouTube provides. Choose 320 kbps for music you want to keep, and 64 to 128 kbps mono for speech.' },
      { q: 'Does it work with YouTube Shorts and YouTube Music?', a: 'Yes. Paste a Shorts link, a youtu.be short link or a music.youtube.com link exactly as you copied it.' },
      { q: 'Can I convert a whole playlist?', a: 'Not at the moment. Paste the link of each video separately; playlist links are converted as the single video they point to.' },
      { q: 'Why do I see “temporarily blocking downloads”?', a: 'YouTube sometimes limits requests for a short while. Wait a minute or two and try again.' },
      { q: 'Do I need YouTube to MP4 instead?', a: 'If you want the picture as well as the sound, use our YouTube to MP4 tool. This page always produces audio-only MP3 files.' },
    ],
    related: ['youtube-to-mp4', 'mp3-cutter', 'mp3-compressor', 'mp4-to-mp3'],
  },

  // ------------------------------------------------------------------ YouTube to MP4
  {
    slug: 'youtube-to-mp4',
    nav: 'YouTube to MP4 Downloader',
    kind: 'link',
    tool: {
      heading: 'Paste a YouTube link to save it as MP4.',
      formats: 'Videos and Shorts · 240p to 1080p Full HD · MP4 with sound',
      linkFormats: ['mp4'],
      sites: 'youtube',
      placeholder: 'Paste a YouTube link, e.g. https://youtu.be/…',
    },
    metaTitle: 'YouTube to MP4 Downloader – Save Videos in 240p to 1080p',
    metaDescription:
      'Download YouTube videos and Shorts as MP4 with sound, from 240p to 1080p Full HD. Paste the link, choose a resolution and save a file that plays on any device.',
    h1: 'YouTube to MP4 Downloader',
    lead: 'Keep a YouTube video for offline viewing as a standard MP4 file with sound, in the resolution that suits your screen and your storage.',
    intro: {
      h2: 'Offline video that plays everywhere',
      paras: [
        'An internet connection is not always there when you need it: on a flight, in a classroom with weak Wi-Fi, or in a meeting room where you must present your own video without buffering. An MP4 copy solves that.',
        'This downloader works only with YouTube links and only creates MP4 files, so every option on the page is about video. It picks the H.264 video format whenever YouTube offers it, because H.264 plays on practically every phone, TV, laptop and editing app, then joins the picture and sound into one tidy file.',
      ],
    },
    steps: [
      ['Copy the link', 'Use Share then Copy link under the video, or copy it from the address bar. Shorts links work too.'],
      ['Paste and choose a resolution', 'Pick 720p HD for a good balance, 1080p for large screens, or 240p to 360p to save data.'],
      ['Convert', 'Tap Convert to MP4. The circle shows the download progress in real time.'],
      ['Download', 'Tap the round Download button to save the MP4 to your device.'],
    ],
    sections: [
      {
        h2: 'Choosing the right resolution',
        list: [
          ['240p and 360p', 'Tiny files for slow connections, phones with little storage, or talks where the picture matters less.'],
          ['480p', 'Clear enough for faces and on-screen text on a phone or tablet.'],
          ['720p HD', 'Sharp on laptops and most monitors while keeping files reasonable.'],
          ['1080p Full HD', 'Best for TVs, projectors and editing. Files are roughly twice the size of 720p.'],
        ],
      },
      {
        h2: 'Why a resolution may be missing',
        paras: [
          'A download can never be sharper than the original upload. If a creator uploaded in 720p, choosing 1080p gives you the best available version, which is 720p. Older videos and some Shorts may only exist in lower resolutions.',
        ],
      },
      {
        h2: 'Download responsibly',
        paras: [
          'Save videos you made yourself, videos that are clearly licensed for re-use, or videos you have permission to keep. YouTube’s terms do not allow other downloads. MP3 Converter is not affiliated with, endorsed by or sponsored by YouTube or Google.',
        ],
      },
    ],
    faqs: [
      { q: 'Does the MP4 include sound?', a: 'Yes. YouTube stores picture and sound separately at higher qualities, and this tool joins them into one MP4 with audio.' },
      { q: 'Can I download YouTube videos in 4K?', a: 'The highest option is 1080p Full HD. It keeps download times short and files small enough for phones.' },
      { q: 'Will the MP4 play on my iPhone or smart TV?', a: 'Yes. The tool prefers the H.264 format, which iPhones, Android phones, smart TVs and video editors all support.' },
      { q: 'I only need the audio. What should I use?', a: 'Use our YouTube to MP3 converter. It also lets you choose the bitrate, mono and a time range.' },
      { q: 'Can I download private or members-only videos?', a: 'No. Only public videos can be downloaded.' },
    ],
    related: ['youtube-to-mp3', 'mp4-to-mp3', 'online-video-downloader', 'video-to-mp3'],
  },

  // ------------------------------------------------------------------ Any site
  {
    slug: 'online-video-downloader',
    nav: 'Online Video Downloader',
    kind: 'link',
    tool: {
      heading: 'Paste a link from a website that offers free downloads.',
      formats: 'Direct MP4/WEBM/MOV links, Internet Archive, Vimeo videos with downloads enabled and many more',
      linkFormats: ['mp4'],
      sites: 'other',
      placeholder: 'Paste a video link, e.g. https://archive.org/details/…',
    },
    metaTitle: 'Online Video Downloader – Save Free Videos from Any Link',
    metaDescription:
      'Download freely available videos from direct links, Internet Archive, Vimeo and other open websites as MP4. Paste the link, pick a resolution and save. No sign-up.',
    h1: 'Online Video Downloader',
    lead: 'Save openly available videos from around the web as MP4 files. Paste a link from a site that allows downloads and get a file that plays on any device.',
    intro: {
      h2: 'One downloader for the open web',
      paras: [
        'Plenty of video online is meant to be shared and saved: public-domain films on Internet Archive, Creative Commons clips, NASA and government footage, open courseware, and creators on Vimeo who switch on the download option. Each site has its own player, which makes saving a copy harder than it should be.',
        'Paste the page link or a direct file link here and the downloader finds the video, picks the best matching quality and hands you a clean MP4. It is built for sites that welcome downloads, so YouTube and TikTok are handled by their own dedicated pages.',
      ],
    },
    steps: [
      ['Find a downloadable video', 'Look for a public-domain, Creative Commons or “download allowed” label, or a direct link ending in .mp4, .webm or .mov.'],
      ['Copy and paste the link', 'Copy the page address or the direct file link and paste it into the box.'],
      ['Choose a resolution', '720p is a sensible default. Smaller sizes save data; 1080p suits large screens.'],
      ['Convert and download', 'Tap Convert to MP4 and then the round Download button when the circle is complete.'],
    ],
    sections: [
      {
        h2: 'Great places to find free videos',
        list: [
          ['Internet Archive', 'Classic films, old TV, lectures and news footage in the public domain.'],
          ['Wikimedia Commons', 'Freely licensed clips used across Wikipedia.'],
          ['NASA and public agencies', 'Space footage and government video that is usually free to reuse.'],
          ['Vimeo', 'Videos whose creators have enabled the download button.'],
          ['Direct file links', 'Any public link that ends in .mp4, .webm, .mov or .mkv.'],
        ],
      },
      {
        h2: 'Links this tool does not handle',
        list: [
          ['YouTube', 'Use our YouTube to MP4 or YouTube to MP3 pages instead.'],
          ['TikTok', 'A dedicated TikTok tool is coming soon.'],
          ['Paid or private content', 'Videos behind a login, paywall or copy protection (such as Netflix or Disney+) cannot be downloaded.'],
        ],
      },
      {
        h2: 'Check the licence before you reuse',
        paras: [
          '“Free to watch” does not always mean “free to reuse”. Before you publish a downloaded video elsewhere, check its licence. Public-domain works can be reused freely, while Creative Commons licences may ask you to credit the creator or avoid commercial use.',
        ],
      },
    ],
    faqs: [
      { q: 'Which websites can I download videos from?', a: 'Sites that offer videos for free download, such as Internet Archive, Wikimedia Commons, NASA, Vimeo videos with downloads enabled, and any direct link to a video file.' },
      { q: 'Why does it not accept YouTube links?', a: 'YouTube has its own dedicated tools on this site: YouTube to MP4 for video and YouTube to MP3 for audio.' },
      { q: 'Can I get just the audio from a video link?', a: 'Yes. Use MP4 to MP3, which accepts both uploaded files and video links.' },
      { q: 'How long are files kept?', a: 'Finished files are stored only so you can download them and are deleted automatically within a few hours at most.' },
    ],
    related: ['mp4-to-mp3', 'youtube-to-mp4', 'video-to-mp3', 'webm-to-mp3'],
  },

  // ------------------------------------------------------------------ MP4
  {
    slug: 'mp4-to-mp3',
    nav: 'MP4 to MP3 Converter',
    kind: 'convert',
    tool: {
      heading: 'Upload an MP4 video to convert to MP3.',
      formats: 'MP4, M4V, MOV',
      buttonLabel: 'Choose MP4 Files',
      showRecord: false,
      showLink: true,
      linkProps: {
        heading: 'Paste a link to an MP4 video to convert it to MP3.',
        subheading: 'Direct .mp4 links and free video websites such as Internet Archive or Vimeo (downloads enabled)',
        placeholder: 'Paste an MP4 link, e.g. https://example.com/video.mp4',
        formats: ['mp3'],
        sites: 'other',
      },
    },
    metaTitle: 'MP4 to MP3 Converter – Upload a File or Paste an MP4 Link',
    metaDescription:
      'Convert MP4 to MP3 online for free. Upload a video from your device or paste an MP4 link, choose up to 320 kbps and download the audio. No sign-up, no watermark.',
    h1: 'MP4 to MP3 Converter',
    lead: 'Pull the sound out of any MP4 video, whether the file is on your device or online. Upload it, or paste a direct MP4 link, and download a clean MP3.',
    intro: {
      h2: 'Two ways to turn MP4 into MP3',
      paras: [
        'MP4 is the format your phone, screen recorder and most editing apps save to. Very often, though, you only need what you can hear: the speech from a webinar, the soundtrack of a holiday clip or the narration of a tutorial.',
        'Choose Upload for files already on your phone or computer. The conversion then happens entirely inside your browser, so your private videos never leave your device. Choose Paste Link when the MP4 lives online, for example on Internet Archive or as a direct .mp4 link, and our server fetches it and sends you the MP3.',
      ],
    },
    steps: [
      ['Pick Upload or Paste Link', 'Upload for files on your device; Paste Link for a video that is online.'],
      ['Add your MP4', 'Choose one or more files, or paste the MP4 link.'],
      ['Set the quality', '192 kbps suits most videos. Use 320 kbps for music and Mono for speech.'],
      ['Download the MP3', 'Save the finished audio, or play it on the page first.'],
    ],
    sections: [
      {
        h2: 'When to use each option',
        list: [
          ['Upload (most private)', 'Phone recordings, screen captures, meeting exports and anything personal. Nothing is uploaded to a server.'],
          ['Paste Link (no download needed)', 'Large MP4 files hosted online, so you skip downloading the whole video first.'],
          ['Batch upload', 'Select several MP4 files at once and download them all as MP3.'],
        ],
      },
      {
        h2: 'Will the audio sound the same?',
        paras: [
          'Most MP4 files store sound as AAC at about 128 to 256 kbps. Converting at the same or a slightly higher bitrate keeps the result very close to the original. Going higher than the source makes the file larger without improving the sound, so 192 kbps is a safe default.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I convert an MP4 link to MP3?', a: 'Switch to the Paste Link tab, paste the address of the MP4 file or the page that hosts it, choose a bitrate and tap Convert to MP3.' },
      { q: 'Can I convert MP4 to MP3 on my phone?', a: 'Yes. On iPhone or Android, tap Choose MP4 Files and pick the video from your gallery or Files app, or paste a link instead.' },
      { q: 'Are uploaded videos sent to your server?', a: 'No. Uploaded files are converted inside your browser. Only the Paste Link option uses our server, and those files are deleted automatically.' },
      { q: 'Can I paste a YouTube or TikTok link here?', a: 'For YouTube, use our YouTube to MP3 tool. TikTok to MP3 is coming soon.' },
      { q: 'Is there a size limit?', a: 'Uploaded files can be up to 500 MB each. Linked videos follow the length limit shown on the page.' },
    ],
    related: ['youtube-to-mp3', 'video-to-mp3', 'online-video-downloader', 'mp3-cutter'],
  },

  // ------------------------------------------------------------------ TikTok (coming soon)
  {
    slug: 'tiktok-to-mp3',
    nav: 'TikTok to MP3',
    kind: 'soon',
    tool: {
      name: 'TikTok to MP3',
      heading: 'Convert TikTok videos to MP3.',
      formats: 'TikTok video links · MP3 up to 320 kbps · no watermark audio',
      placeholder: 'Paste a TikTok link, e.g. https://www.tiktok.com/@user/video/…',
    },
    metaTitle: 'TikTok to MP3 Converter – Save TikTok Sounds as MP3 (Coming Soon)',
    metaDescription:
      'TikTok to MP3 is coming soon to MP3 Converter: paste a TikTok link and save the sound as a high-quality MP3 for offline listening, editing or your own projects.',
    h1: 'TikTok to MP3 Converter',
    lead: 'Save the sound from a TikTok video as an MP3 file. We are putting the finishing touches on this tool, and it will be available here very soon.',
    intro: {
      h2: 'Keep the sounds you hear on TikTok',
      paras: [
        'A lot of today’s catchy audio first appears on TikTok: remixes, voice-overs, short comedy bits, cooking narrations and original songs from new artists. TikTok lets you save sounds inside the app, yet you cannot easily take them elsewhere as a normal audio file.',
        'Our TikTok to MP3 converter will let you paste a video link and download just the audio as an MP3. That makes it simple to listen offline, reuse your own sounds in an editing app, or keep a backup of the voice-overs you created.',
      ],
    },
    steps: [
      ['Copy the TikTok link', 'In the TikTok app, tap Share on the video and choose Copy link.'],
      ['Paste it into the box', 'The tool will read the video and find its sound track.'],
      ['Choose MP3 quality', 'Select a bitrate up to 320 kbps.'],
      ['Download the MP3', 'Save the audio to your phone or computer.'],
    ],
    sections: [
      {
        h2: 'What you will be able to do',
        list: [
          ['Save your own sounds', 'Keep a high-quality copy of the original audio and voice-overs you uploaded.'],
          ['Edit outside TikTok', 'Bring a sound into CapCut, Audacity or a video editor as an MP3.'],
          ['Listen offline', 'Play saved audio on your music app, in the car or on a smartwatch.'],
          ['Cut the best part', 'Combine with our MP3 Cutter to keep only the hook or a ringtone-length clip.'],
        ],
      },
      {
        h2: 'While you wait',
        paras: [
          'If you already saved a TikTok video to your device, you can convert it to MP3 right now with our MP4 to MP3 converter. It runs in your browser and keeps your file private.',
        ],
      },
      {
        h2: 'Respect creators',
        paras: [
          'Most TikTok sounds belong to their creators or to record labels. Please only download audio you created yourself or have permission to use. MP3 Converter is not affiliated with, endorsed by or sponsored by TikTok or ByteDance.',
        ],
      },
    ],
    faqs: [
      { q: 'When will TikTok to MP3 be available?', a: 'We are testing it now and will launch it on this page soon. Bookmark the page to check back.' },
      { q: 'Can I convert a TikTok video I already downloaded?', a: 'Yes. Use our MP4 to MP3 converter, choose the saved video and download the MP3. It works today.' },
      { q: 'Will it work on iPhone and Android?', a: 'Yes. Like all our tools, it will work in the browser on any phone, tablet or computer, with no app needed.' },
      { q: 'Will the MP3 include the TikTok watermark sound?', a: 'No. The converter saves only the video’s audio track, without any extra watermark jingle.' },
    ],
    related: ['mp4-to-mp3', 'youtube-to-mp3', 'mp3-cutter', 'voice-to-mp3'],
  },

  // ------------------------------------------------------------------ Video
  {
    slug: 'video-to-mp3',
    nav: 'Video to MP3 Converter',
    kind: 'convert',
    tool: { heading: 'Upload a video file to extract the audio as MP3.', formats: videoFormats, buttonLabel: 'Choose Videos', showRecord: false },
    metaTitle: 'Video to MP3 Converter – Extract Audio from Any Video',
    metaDescription:
      'Free video to MP3 converter. Extract audio from MP4, MOV, MKV, WEBM, AVI and more. Works in your browser with no upload and no software to install.',
    h1: 'Video to MP3 Converter',
    lead: 'Extract the audio from almost any video file and save it as MP3. One simple tool for MP4, MOV, MKV, WEBM, AVI and more.',
    intro: {
      h2: 'One converter for every kind of video',
      paras: [
        'Videos come from many places: your phone, a screen recorder, a video call, a camera or an editing app. Each one may use a different format. Rather than hunting for a separate tool for each, you can drop any of them here.',
        'The converter reads the video, finds the sound track and turns it into an MP3. In other words, you get only the audio, in a format that every device understands.',
      ],
    },
    steps: [
      ['Add your videos', 'Select one or more video files, or drag them in. You can mix formats in the same batch.'],
      ['Pick quality and channels', 'Choose a bitrate. Turn on Mono for speech to make the file even smaller.'],
      ['Save your audio', 'Download each MP3, or use Download all when you convert several files.'],
    ],
    sections: [
      {
        h2: 'Supported video formats',
        paras: ['The tool first tries your browser’s built-in decoder, which is very fast. If the browser cannot read a format, it switches to a built-in FFmpeg decoder that runs locally. Because of this, it handles a wide range of files:'],
        list: [
          ['MP4 and M4V', 'Phones, YouTube Studio exports, most editors.'],
          ['MOV', 'iPhone and Mac recordings, QuickTime.'],
          ['MKV and WEBM', 'Screen recorders, OBS, web downloads of your own videos.'],
          ['AVI, WMV, FLV and 3GP', 'Older cameras, Windows recordings and early mobile phones.'],
        ],
      },
      {
        h2: 'Tips for the best result',
        list: [
          ['Trim afterwards', 'Need only one part? Convert first, then open the MP3 Cutter to keep just the section you want.'],
          ['Use mono for talks', 'Meetings and lectures sound the same in mono and the file shrinks by about half.'],
          ['Keep the original', 'MP3 is a lossy format, so keep the video in case you need higher quality later.'],
        ],
      },
    ],
    faqs: [
      { q: 'Which video formats can I convert to MP3?', a: 'MP4, MOV, MKV, WEBM, AVI, WMV, FLV, 3GP, M4V, MPEG and most other common formats. If a video has a sound track, the tool can usually extract it.' },
      { q: 'Why did my video fail to convert?', a: 'The most common reason is that the video has no sound track at all, for example a silent screen recording. Copy-protected (DRM) videos from streaming services also cannot be read.' },
      { q: 'Can I extract audio from a YouTube link?', a: 'This page converts video files on your device. For YouTube links, use our YouTube to MP3 converter, which also lets you choose the bitrate and cut a section.' },
      { q: 'Does it reduce the video quality?', a: 'Your original video is never changed. The tool creates a new MP3 file next to it.' },
    ],
    related: ['mp4-to-mp3', 'mkv-to-mp3', 'webm-to-mp3', 'mov-to-mp3'],
  },

  // ------------------------------------------------------------------ WAV
  {
    slug: 'wav-to-mp3',
    nav: 'WAV to MP3 Converter',
    kind: 'convert',
    tool: { heading: 'Upload WAV files to convert to MP3.', formats: 'WAV, WAVE, AIFF', buttonLabel: 'Choose WAV Files', defaultBitrate: 320, showRecord: false },
    metaTitle: 'WAV to MP3 Converter – Shrink WAV Files Free Online',
    metaDescription:
      'Convert WAV to MP3 online for free and make files up to 10x smaller. Choose 128 to 320 kbps. Private, fast and works in any browser without upload.',
    h1: 'WAV to MP3 Converter',
    lead: 'Shrink large WAV recordings into small MP3 files that still sound great. Batch convert in seconds, right in your browser.',
    intro: {
      h2: 'Why WAV files are so big',
      paras: [
        'WAV stores sound without any compression. CD-quality WAV uses about 1,411 kbps, which works out to roughly 10 MB for every minute. That is perfect for recording and editing, yet too heavy for email, phones or uploading.',
        'An MP3 at 320 kbps uses about 2.4 MB per minute, and at 192 kbps only 1.44 MB. So a WAV to MP3 conversion usually cuts the size by 75 to 90 percent while most listeners hear no difference.',
      ],
    },
    steps: [
      ['Add your WAV files', 'Choose one file or a whole batch from your recorder, DAW export or sample folder.'],
      ['Choose a bitrate', 'The page starts at 320 kbps, the best MP3 quality, since WAV is a high-quality source.'],
      ['Download', 'Grab each MP3 or use Download all. The files keep their original names.'],
    ],
    sections: [
      {
        h2: 'Which bitrate is right for your WAV?',
        list: [
          ['320 kbps', 'Finished songs, mixes and anything you want to keep long term.'],
          ['192 kbps', 'Demos and rough mixes you send to bandmates or clients.'],
          ['128 kbps mono', 'Voice recordings, interviews and dictation from a field recorder.'],
        ],
      },
      {
        h2: 'Keep your WAV masters',
        paras: [
          'Think of the WAV as your master copy and the MP3 as the copy you share. If you ever need to edit, remaster or create another format, start again from the WAV rather than from the MP3. This way you never stack quality losses on top of each other.',
        ],
      },
    ],
    faqs: [
      { q: 'Does converting WAV to MP3 lose quality?', a: 'Yes, a little, because MP3 is lossy. At 256 or 320 kbps the difference is very hard to hear for most people and most speakers.' },
      { q: 'Can I convert 24-bit or 32-bit WAV files?', a: 'Yes. High-resolution WAV files are supported. The MP3 is created at 44.1 kHz, the standard rate for MP3 music.' },
      { q: 'How many WAV files can I convert at once?', a: 'There is no fixed limit. Files are processed one after another to keep your device responsive.' },
      { q: 'Is there a size limit?', a: 'Each file can be up to 500 MB, which is roughly 50 minutes of CD-quality stereo WAV.' },
    ],
    related: ['flac-to-mp3', 'mp3-compressor', 'audio-joiner', 'm4a-to-mp3'],
  },

  // ------------------------------------------------------------------ M4A
  {
    slug: 'm4a-to-mp3',
    nav: 'M4A to MP3 Converter',
    kind: 'convert',
    tool: { heading: 'Upload M4A files to convert to MP3.', formats: 'M4A, AAC, M4B, ALAC', buttonLabel: 'Choose M4A Files', showRecord: false },
    metaTitle: 'M4A to MP3 Converter – Free, Fast and Private',
    metaDescription:
      'Convert M4A to MP3 free online. Perfect for iPhone voice memos, iTunes audio and AAC files. No upload, no sign-up, works on iPhone, Android and PC.',
    h1: 'M4A to MP3 Converter',
    lead: 'Turn iPhone voice memos, iTunes tracks and other M4A files into MP3 that opens on any device.',
    intro: {
      h2: 'What is an M4A file?',
      paras: [
        'M4A is an audio file in an MPEG-4 container. Apple uses it for Voice Memos, GarageBand exports and music bought from iTunes. Inside, the sound is usually AAC, or sometimes Apple Lossless (ALAC).',
        'M4A sounds good and stays small. Still, some Windows programs, older car stereos, websites and Android apps refuse to open it. Converting M4A to MP3 removes that problem in a few seconds.',
      ],
    },
    steps: [
      ['Select your M4A files', 'On iPhone, save the memo to Files first, then pick it here.'],
      ['Pick quality', '128 kbps mono is ideal for voice memos. Use 192 to 256 kbps for music.'],
      ['Download your MP3', 'Share it by email, WhatsApp or upload it wherever MP3 is required.'],
    ],
    sections: [
      {
        h2: 'Common M4A to MP3 situations',
        list: [
          ['Voice memos', 'Send a recorded lecture or meeting to someone on Windows or Android.'],
          ['Upload forms', 'Many sites and learning platforms only accept MP3 files.'],
          ['Older players', 'Car stereos and MP3 players from a few years ago often skip M4A tracks.'],
        ],
      },
      {
        h2: 'A note on protected iTunes files',
        paras: [
          'Songs bought from iTunes before 2009 may use the M4P format with copy protection (DRM). Those files cannot be converted by any honest browser tool. Music purchased later, and your own recordings, convert normally.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I convert an iPhone voice memo to MP3?', a: 'In Voice Memos, tap the memo, tap Share, then Save to Files. Open this page in Safari, tap Choose M4A Files, pick the memo and tap Download when it is ready.' },
      { q: 'Is M4A better quality than MP3?', a: 'At the same bitrate, AAC inside M4A is usually a little more efficient. However, at 192 kbps and above, both sound excellent and MP3 is more widely supported.' },
      { q: 'Can I convert Apple Lossless (ALAC) M4A?', a: 'Yes. Lossless M4A files convert just like normal ones. Choose 320 kbps to keep as much quality as possible.' },
      { q: 'Can I convert M4B audiobooks?', a: 'Yes, as long as they are not copy protected. Choose 64 to 96 kbps mono to keep long audiobooks small.' },
    ],
    related: ['aac-to-mp3', 'voice-to-mp3', 'mp4-to-mp3', 'mp3-compressor'],
  },

  // ------------------------------------------------------------------ Voice
  {
    slug: 'voice-to-mp3',
    nav: 'Voice Recorder to MP3',
    kind: 'convert',
    tool: { initialMode: 'record', defaultBitrate: 128, defaultMono: true },
    metaTitle: 'Online Voice Recorder to MP3 – Record Audio Free',
    metaDescription:
      'Record your voice online and save it as MP3 for free. No app, no sign-up. Works with any microphone on PC, Mac, iPhone and Android. Private by design.',
    h1: 'Online Voice Recorder to MP3',
    lead: 'Record your voice with any microphone and download it as an MP3 in one click. No app to install and no account needed.',
    intro: {
      h2: 'Record and save MP3 in your browser',
      paras: [
        'Sometimes you just need a quick recording: a voice message, a podcast intro, a song idea or a spoken note for a colleague. This online voice recorder lets you do that without installing anything.',
        'Press Start Recording, allow the microphone, and speak. When you press Stop, the recording turns into an MP3 automatically. The audio stays on your device the whole time.',
      ],
    },
    steps: [
      ['Allow the microphone', 'Press Start Recording. Your browser will ask for permission the first time.'],
      ['Speak or play', 'A timer shows how long you have been recording. Keep the mic close for clear sound.'],
      ['Stop and download', 'Press Stop & Convert, listen to the result and download the MP3.'],
    ],
    sections: [
      {
        h2: 'Tips for a clearer recording',
        list: [
          ['Pick a quiet room', 'Soft furniture and curtains reduce echo far better than any software filter.'],
          ['Stay close to the mic', 'About a hand’s width away from a headset or laptop mic works well.'],
          ['Use mono', 'Speech is recorded in mono by default here, which halves the file size with no loss in clarity.'],
          ['Do a test first', 'Record five seconds, play it back, and adjust your distance or volume before the real take.'],
        ],
      },
      {
        h2: 'Already have a recording?',
        paras: ['Switch to the Upload tab to convert existing voice notes, such as M4A memos from an iPhone or OPUS notes from WhatsApp, into MP3.'],
      },
    ],
    faqs: [
      { q: 'Is there a time limit for recording?', a: 'There is no fixed limit. For very long sessions (over an hour), a computer is more reliable than a phone because it has more free memory.' },
      { q: 'Why does my browser ask for microphone access?', a: 'Browsers always ask before a website can use the microphone. The audio is only used on this page to create your MP3 and is never sent anywhere.' },
      { q: 'Does it work on iPhone?', a: 'Yes. Use Safari on iOS 14.3 or newer. Tap Start Recording, allow the microphone and tap Stop & Convert when you finish.' },
      { q: 'Can I trim the start and end of my recording?', a: 'Yes. Download the MP3, then open the MP3 Cutter to remove silence or mistakes at the start and end.' },
    ],
    related: ['mp3-cutter', 'm4a-to-mp3', 'opus-to-mp3', 'podcast-to-mp3'],
  },

  // ------------------------------------------------------------------ FLAC
  {
    slug: 'flac-to-mp3',
    nav: 'FLAC to MP3',
    kind: 'convert',
    tool: { heading: 'Upload FLAC files to convert to MP3.', formats: 'FLAC, ALAC, WAV', buttonLabel: 'Choose FLAC Files', defaultBitrate: 320, showRecord: false },
    metaTitle: 'FLAC to MP3 Converter – Lossless to 320 kbps MP3',
    metaDescription:
      'Convert FLAC to MP3 free online at up to 320 kbps. Batch convert whole albums in your browser with no upload. Ideal for phones, cars and MP3 players.',
    h1: 'FLAC to MP3 Converter',
    lead: 'Make portable 320 kbps MP3 copies of your lossless FLAC music for your phone, car or MP3 player.',
    intro: {
      h2: 'From lossless FLAC to portable MP3',
      paras: [
        'FLAC keeps every detail of the original recording, which is why audiophiles love it. The downside is size: a FLAC album often takes 300 to 500 MB, and many car stereos, smart TVs and older players cannot play it.',
        'Converting FLAC to MP3 gives you a lighter copy for everyday listening while you keep the FLAC as your archive. Because FLAC is a perfect source, the MP3 you create here is as good as an MP3 can be.',
      ],
    },
    steps: [
      ['Add your album', 'Select all the FLAC tracks at once. They convert one after another.'],
      ['Keep 320 kbps', 'This page starts at 320 kbps, the highest MP3 quality, which suits lossless sources.'],
      ['Download all', 'Use Download all to save every track when the batch finishes.'],
    ],
    sections: [
      {
        h2: 'FLAC vs MP3 at a glance',
        list: [
          ['FLAC', 'Lossless, about 25 to 35 MB per song, limited player support.'],
          ['MP3 320 kbps', 'Near-transparent, about 8 to 10 MB per song, plays almost anywhere.'],
          ['MP3 192 kbps', 'Very good, about 5 MB per song, great for phones with little storage.'],
        ],
      },
      {
        h2: 'About tags and album art',
        paras: ['The converter focuses on the audio. Song titles, artist names and cover art stored inside the FLAC are not copied into the MP3. You can add them afterwards with a free tag editor such as Mp3tag or MusicBrainz Picard.'],
      },
    ],
    faqs: [
      { q: 'Is 320 kbps MP3 as good as FLAC?', a: 'Technically no, since MP3 removes some data. In blind listening tests, however, most people cannot tell 320 kbps MP3 from FLAC on normal headphones or speakers.' },
      { q: 'Can I convert hi-res 24-bit/96 kHz FLAC?', a: 'Yes. The tool reads hi-res FLAC and creates a standard 44.1 kHz MP3.' },
      { q: 'How long does a full album take?', a: 'On a modern computer, a typical album converts in about one to three minutes. Phones take a little longer.' },
      { q: 'Should I delete my FLAC files afterwards?', a: 'We suggest you keep them. FLAC is your lossless master and lets you create any format again in the future.' },
    ],
    related: ['wav-to-mp3', 'aac-to-mp3', 'ogg-to-mp3', 'mp3-compressor'],
  },

  // ------------------------------------------------------------------ AAC
  {
    slug: 'aac-to-mp3',
    nav: 'AAC to MP3',
    kind: 'convert',
    tool: { heading: 'Upload AAC files to convert to MP3.', formats: 'AAC, M4A, ADTS', buttonLabel: 'Choose AAC Files', showRecord: false },
    metaTitle: 'AAC to MP3 Converter – Free Online, No Upload',
    metaDescription:
      'Convert AAC to MP3 online for free. Make AAC audio play on any car stereo, MP3 player or app. Fast, private and no software to install.',
    h1: 'AAC to MP3 Converter',
    lead: 'Convert AAC audio to MP3 so it plays on every device, from old car stereos to any media player.',
    intro: {
      h2: 'AAC is great, but MP3 plays everywhere',
      paras: [
        'AAC (Advanced Audio Coding) was designed as the successor to MP3. It powers Apple Music, YouTube audio and many radio streams. Raw AAC files often come from recorders, streams and some Android apps.',
        'Although AAC is efficient, plain .aac files are not always welcome. Some players, editors and upload forms only accept MP3. Converting fixes that instantly.',
      ],
    },
    steps: [
      ['Choose your AAC files', 'Add .aac or .m4a files, one at a time or in a batch.'],
      ['Match the bitrate', 'Pick the same or a slightly higher bitrate than the source, often 192 kbps.'],
      ['Download', 'Save your MP3 files and play them anywhere.'],
    ],
    sections: [
      {
        h2: 'Choosing a bitrate for AAC sources',
        paras: [
          'AAC at 128 kbps sounds roughly like MP3 at 160 to 192 kbps. So when you convert a 128 kbps AAC file, choose 192 kbps to keep the sound close to the original. For AAC at 256 kbps, choose 256 or 320 kbps.',
        ],
      },
    ],
    faqs: [
      { q: 'What is the difference between AAC and M4A?', a: 'AAC is the audio codec. M4A is a file container that usually holds AAC audio. Both convert the same way here.' },
      { q: 'Will my AAC file lose quality?', a: 'Converting between two lossy formats always loses a tiny amount. Picking a higher bitrate than the source keeps that loss very small.' },
      { q: 'Can I convert AAC on Android?', a: 'Yes. Open this page in Chrome, tap Choose AAC Files and pick the file from your storage.' },
    ],
    related: ['m4a-to-mp3', 'mp4-to-mp3', 'ogg-to-mp3', 'flac-to-mp3'],
  },

  // ------------------------------------------------------------------ OGG
  {
    slug: 'ogg-to-mp3',
    nav: 'OGG to MP3',
    kind: 'convert',
    tool: { heading: 'Upload OGG files to convert to MP3.', formats: 'OGG, OGA, Vorbis, OPUS', buttonLabel: 'Choose OGG Files', showRecord: false },
    metaTitle: 'OGG to MP3 Converter – Convert Vorbis Audio Free',
    metaDescription:
      'Convert OGG Vorbis to MP3 online for free. Make game sounds, Linux recordings and web audio play on iPhone and any player. No upload needed.',
    h1: 'OGG to MP3 Converter',
    lead: 'Turn OGG Vorbis audio into MP3 so it plays on iPhone, Windows Media Player and any device.',
    intro: {
      h2: 'Where OGG files come from',
      paras: [
        'OGG is an open, royalty-free container, usually holding Vorbis or Opus audio. You will find it in video games, Linux software, Wikipedia audio, some Android recorders and audio from web apps.',
        'Unfortunately, OGG support is patchy. Older iPhones, many car stereos and some Windows apps will not play it. Converting OGG to MP3 gives you a file that works everywhere.',
      ],
    },
    steps: [
      ['Add OGG files', 'Choose one or more .ogg or .oga files.'],
      ['Pick a bitrate', '192 kbps suits most OGG music. Use 128 kbps mono for voice.'],
      ['Download your MP3', 'Play it on any phone, PC or car stereo.'],
    ],
    sections: [
      {
        h2: 'OGG vs MP3',
        list: [
          ['OGG Vorbis', 'Open and efficient, but not supported on many devices.'],
          ['MP3', 'Slightly larger at the same quality, yet supported by practically everything.'],
        ],
      },
    ],
    faqs: [
      { q: 'Why will my iPhone not play OGG files?', a: 'Older versions of iOS do not include an OGG decoder. Converting to MP3 is the simplest fix.' },
      { q: 'Can I convert game sound files?', a: 'Yes, if they are standard OGG files you have the right to use. Files packed inside game archives must be extracted first.' },
      { q: 'Does it support OGG Opus too?', a: 'Yes. Both Vorbis and Opus audio inside an OGG file are supported.' },
    ],
    related: ['opus-to-mp3', 'webm-to-mp3', 'flac-to-mp3', 'aac-to-mp3'],
  },

  // ------------------------------------------------------------------ OPUS
  {
    slug: 'opus-to-mp3',
    nav: 'OPUS to MP3',
    kind: 'convert',
    tool: { heading: 'Upload OPUS voice notes to convert to MP3.', formats: 'OPUS, OGG, WEBM', buttonLabel: 'Choose OPUS Files', defaultBitrate: 128, defaultMono: true, showRecord: false },
    metaTitle: 'OPUS to MP3 Converter – WhatsApp Voice Notes to MP3',
    metaDescription:
      'Convert OPUS to MP3 free online. Turn WhatsApp and Telegram voice notes into MP3 that plays anywhere. Private, browser-based and no sign-up.',
    h1: 'OPUS to MP3 Converter',
    lead: 'Turn WhatsApp, Telegram and Signal voice notes into MP3 files anyone can open.',
    intro: {
      h2: 'Voice notes are usually OPUS',
      paras: [
        'Opus is a modern codec made for voice and calls. WhatsApp, Telegram, Discord and many browsers use it because it sounds clear at very small sizes. However, when you export a voice note, the .opus file often will not play on a computer or in an email.',
        'This OPUS to MP3 converter changes that. Because voice notes are speech, the page starts with 128 kbps and mono, which keeps the MP3 small and clear.',
      ],
    },
    steps: [
      ['Export the voice note', 'In WhatsApp, long-press the note, tap Share and save it to your files.'],
      ['Add it here', 'Choose the .opus file. You can add many notes at once.'],
      ['Download the MP3', 'Share it, archive it or add it to a video project.'],
    ],
    sections: [
      {
        h2: 'Why convert voice notes?',
        list: [
          ['Keep important messages', 'Save messages from loved ones in a format that will still open in years to come.'],
          ['Use them as evidence or records', 'Many systems and lawyers ask for MP3 rather than OPUS.'],
          ['Edit them', 'Most audio editors import MP3 without any extra plugins.'],
        ],
      },
    ],
    faqs: [
      { q: 'How do I get the OPUS file from WhatsApp?', a: 'On Android, voice notes are saved in the WhatsApp Media folder under Voice Notes. On iPhone, long-press the note, tap Forward, then the Share icon, and choose Save to Files.' },
      { q: 'Will the MP3 be larger than the OPUS file?', a: 'Usually yes. Opus is extremely efficient. A 128 kbps mono MP3 is still small, about 1 MB per minute.' },
      { q: 'Are my voice notes uploaded anywhere?', a: 'No. Everything happens in your browser, which matters for private conversations.' },
    ],
    related: ['ogg-to-mp3', 'voice-to-mp3', 'm4a-to-mp3', 'audio-joiner'],
  },

  // ------------------------------------------------------------------ WEBM
  {
    slug: 'webm-to-mp3',
    nav: 'WEBM to MP3',
    kind: 'convert',
    tool: { heading: 'Upload WEBM files to convert to MP3.', formats: 'WEBM, MKV, OGG', buttonLabel: 'Choose WEBM Files', showRecord: false },
    metaTitle: 'WEBM to MP3 Converter – Extract Audio from WEBM',
    metaDescription:
      'Convert WEBM to MP3 online for free. Extract audio from screen recordings, browser captures and web videos. No upload and no software needed.',
    h1: 'WEBM to MP3 Converter',
    lead: 'Extract the audio from WEBM screen recordings and web videos and save it as a regular MP3.',
    intro: {
      h2: 'What is a WEBM file?',
      paras: [
        'WEBM is a video and audio format made for the web. Browser-based screen recorders, Loom-style tools, OBS and many online recorders save to WEBM, usually with Opus or Vorbis audio inside.',
        'If you only need the narration from a screen recording or the sound from a web clip, converting WEBM to MP3 gives you a lighter file that works in any audio app.',
      ],
    },
    steps: [
      ['Add the WEBM file', 'Choose a WEBM video or audio file, or drag it in.'],
      ['Choose quality', 'For narration, 128 kbps mono is enough. For music, choose 192 kbps or higher.'],
      ['Download the MP3', 'Use it as a podcast, voice-over or audio note.'],
    ],
    sections: [
      {
        h2: 'Typical uses',
        list: [
          ['Screen recording narration', 'Turn a recorded tutorial into an audio lesson.'],
          ['Meeting recordings', 'Extract the conversation from a browser-recorded meeting to share or transcribe.'],
          ['Audio-only WEBM', 'Some web recorders save sound-only WEBM files, which convert the same way.'],
        ],
      },
    ],
    faqs: [
      { q: 'Can I convert audio-only WEBM files?', a: 'Yes. WEBM files with or without video both work.' },
      { q: 'Why is my WEBM silent after converting?', a: 'The recording may not have captured any audio. Play the original file to check whether it has sound.' },
      { q: 'Is WEBM to MP3 conversion free?', a: 'Yes, completely free with no limits or watermarks.' },
    ],
    related: ['video-to-mp3', 'mkv-to-mp3', 'opus-to-mp3', 'mp3-cutter'],
  },

  // ------------------------------------------------------------------ MOV
  {
    slug: 'mov-to-mp3',
    nav: 'MOV to MP3',
    kind: 'convert',
    tool: { heading: 'Upload MOV videos to convert to MP3.', formats: 'MOV, QT, MP4', buttonLabel: 'Choose MOV Files', showRecord: false },
    metaTitle: 'MOV to MP3 Converter – iPhone Video to MP3 Free',
    metaDescription:
      'Convert MOV to MP3 online for free. Extract audio from iPhone and Mac QuickTime videos in your browser. No upload, no app and no sign-up.',
    h1: 'MOV to MP3 Converter',
    lead: 'Pull the audio out of iPhone and QuickTime MOV videos and save it as MP3 in seconds.',
    intro: {
      h2: 'MOV files from iPhone and Mac',
      paras: [
        'MOV is Apple’s QuickTime video format. iPhones, iPads and Macs often save recordings as MOV, and screen recordings on a Mac do too. These files can be very large, especially in 4K.',
        'When you only need the sound, such as a speech, a song or an interview, converting MOV to MP3 saves a lot of space and makes sharing easy.',
      ],
    },
    steps: [
      ['Pick your MOV file', 'On iPhone, choose the video from Photos or Files.'],
      ['Set the quality', '192 kbps is a great default. Choose mono for speeches and interviews.'],
      ['Download the MP3', 'Save it to Files, or share it straight away.'],
    ],
    sections: [
      {
        h2: 'Handy tips for iPhone videos',
        list: [
          ['Large 4K clips', 'They work too. The video is decoded on your device, so a newer phone or a computer is faster.'],
          ['Only need part of it?', 'Convert to MP3, then use the MP3 Cutter to keep the section you want.'],
        ],
      },
    ],
    faqs: [
      { q: 'How do I convert an iPhone video to MP3?', a: 'Open this page in Safari, tap Choose MOV Files, pick the video from your library and tap Download when it is done.' },
      { q: 'Can I convert MOV on Windows?', a: 'Yes. The converter works in any modern browser on Windows, Mac, Linux, Android and iOS.' },
      { q: 'What if my MOV uses an Apple codec Chrome cannot read?', a: 'The tool automatically switches to its built-in FFmpeg decoder, so the conversion still works.' },
    ],
    related: ['mp4-to-mp3', 'video-to-mp3', 'm4a-to-mp3', 'mp3-cutter'],
  },

  // ------------------------------------------------------------------ MKV
  {
    slug: 'mkv-to-mp3',
    nav: 'MKV to MP3',
    kind: 'convert',
    tool: { heading: 'Upload MKV videos to convert to MP3.', formats: 'MKV, MKA, WEBM', buttonLabel: 'Choose MKV Files', showRecord: false },
    metaTitle: 'MKV to MP3 Converter – Extract Audio from MKV Free',
    metaDescription:
      'Convert MKV to MP3 free online. Extract AAC, AC3, DTS or Opus audio from MKV videos as MP3 in your browser. No upload and no software.',
    h1: 'MKV to MP3 Converter',
    lead: 'Extract the audio from MKV videos, including AC3 and multi-channel sound, and save it as stereo MP3.',
    intro: {
      h2: 'Why MKV files need a special converter',
      paras: [
        'MKV (Matroska) is a flexible container popular with OBS recordings and video archives. It can hold almost any audio codec, including AAC, AC3, E-AC3, DTS, FLAC and Opus.',
        'Most browsers can only read a few of these. That is why this tool includes an FFmpeg decoder that runs locally. It mixes surround sound down to stereo and saves a standard MP3.',
      ],
    },
    steps: [
      ['Add the MKV file', 'Choose an MKV video or MKA audio file.'],
      ['Wait for the decoder', 'The first time, the advanced decoder loads (about 30 MB). Later files start faster.'],
      ['Download the MP3', 'Your stereo MP3 is ready to play anywhere.'],
    ],
    sections: [
      {
        h2: 'Good to know',
        list: [
          ['Surround sound', '5.1 and 7.1 audio is mixed down to stereo, which suits headphones and phones.'],
          ['Multiple audio tracks', 'If the MKV has several languages, the default (first) track is converted.'],
          ['OBS recordings', 'Works well for extracting commentary from gameplay or streams you recorded.'],
        ],
      },
    ],
    faqs: [
      { q: 'Can I choose which audio track to convert?', a: 'At the moment the default audio track is used. For most MKV files this is the main language or main mix.' },
      { q: 'Why does MKV conversion take longer the first time?', a: 'The tool loads its built-in decoder once. After that it is cached by your browser and starts much faster.' },
      { q: 'Is there a file size limit?', a: 'Each MKV can be up to 500 MB.' },
    ],
    related: ['video-to-mp3', 'webm-to-mp3', 'mp4-to-mp3', 'audio-joiner'],
  },

  // ------------------------------------------------------------------ Cutter
  {
    slug: 'mp3-cutter',
    nav: 'MP3 Cutter',
    kind: 'cut',
    metaTitle: 'MP3 Cutter – Trim and Cut Audio Online Free',
    metaDescription:
      'Free online MP3 cutter. Trim songs, cut voice recordings, make ringtones and remove silence with fade in and out. Works in your browser, no upload.',
    h1: 'MP3 Cutter – Trim Audio Online',
    lead: 'Cut any song or recording to the exact part you need. Drag the handles, preview, and save a new MP3.',
    intro: {
      h2: 'A simple audio trimmer that works in your browser',
      paras: [
        'Whether you want a ringtone, a short clip for a video or a recording without the awkward silence at the start, an MP3 cutter saves you from installing a full audio editor.',
        'Load a file, drag the two purple handles on the waveform, and press Preview to hear your selection. Then choose to keep the selection or remove it, add a fade if you like, and save the result as MP3.',
      ],
    },
    steps: [
      ['Open a file', 'Choose an MP3 or any other audio or video file.'],
      ['Select the part', 'Drag the handles or type exact start and end times in seconds.'],
      ['Keep or remove', 'Keep only the selection, or remove it and join the rest together.'],
      ['Save as MP3', 'Add fades if you want, press Cut & Save MP3 and download.'],
    ],
    sections: [
      {
        h2: 'What people use the MP3 cutter for',
        list: [
          ['Ringtones', 'Keep a 20 to 30 second chorus and add a short fade out.'],
          ['Cleaning recordings', 'Remove silence, coughs or mistakes at the start and end.'],
          ['Clips for videos', 'Cut the exact music section that fits your edit.'],
          ['Removing a middle part', 'Choose Remove selection to delete an unwanted section inside a recording.'],
        ],
      },
      {
        h2: 'Tips for precise cuts',
        list: [
          ['Use the keyboard', 'Click a handle, then use the arrow keys to move it by 0.1 seconds, or hold Shift for 1 second.'],
          ['Cut at quiet points', 'Cutting between words or beats sounds more natural.'],
          ['Use fades for music', 'A short fade in and fade out prevents clicks at the edges.'],
        ],
      },
    ],
    faqs: [
      { q: 'How do I make a ringtone with this MP3 cutter?', a: 'Load the song, select about 20 to 30 seconds, turn on Fade in and Fade out, then press Cut & Save MP3. On iPhone you will need to convert it to M4R with GarageBand; Android can use MP3 directly.' },
      { q: 'Can I cut a video file?', a: 'Yes. Load any video and the cutter will work on its sound track. The result is always an MP3 audio file.' },
      { q: 'Does cutting reduce quality?', a: 'The selected part is re-encoded once. Choose a bitrate equal to or higher than the original to keep the quality.' },
      { q: 'Can I remove a section from the middle?', a: 'Yes. Select the unwanted part and choose Remove selection. The parts before and after are joined together.' },
    ],
    related: ['audio-joiner', 'mp3-compressor', 'voice-to-mp3', 'video-to-mp3'],
  },

  // ------------------------------------------------------------------ Compressor
  {
    slug: 'mp3-compressor',
    nav: 'MP3 Compressor',
    kind: 'convert',
    compress: true,
    tool: {
      heading: 'Upload MP3 or audio files to compress.',
      formats: 'MP3, WAV, M4A, FLAC, OGG',
      buttonLabel: 'Choose Files to Compress',
      defaultBitrate: 96,
      bitrates: 'compress',
      showRecord: false,
      compress: true,
    },
    metaTitle: 'MP3 Compressor – Reduce MP3 File Size Online Free',
    metaDescription:
      'Compress MP3 files online for free. Reduce audio file size for email, WhatsApp and uploads by lowering the bitrate. Private, fast and no upload.',
    h1: 'MP3 Compressor',
    lead: 'Make MP3 and other audio files smaller for email, messaging apps and upload limits, while keeping them easy to listen to.',
    intro: {
      h2: 'How MP3 compression works',
      paras: [
        'The size of an MP3 depends mainly on its bitrate and length. A 60-minute podcast at 320 kbps takes about 144 MB. The same episode at 64 kbps mono takes around 29 MB, and for speech it still sounds clear.',
        'This MP3 compressor re-encodes your file at a lower bitrate of your choice and, if you like, in mono. After each file, it shows how much smaller the new MP3 is.',
      ],
    },
    steps: [
      ['Add your files', 'Choose one or more MP3, WAV, M4A or other audio files.'],
      ['Pick a target', 'Use 64 kbps mono for speech, 96 to 128 kbps for music.'],
      ['Compare and download', 'Check the new size and listen on the page before you download.'],
    ],
    sections: [
      {
        h2: 'Which setting should you use?',
        list: [
          ['32 kbps mono', 'Smallest files for long voice recordings where size matters most.'],
          ['64 kbps mono', 'Podcasts, audiobooks, lectures and voice notes.'],
          ['96 kbps', 'A good balance for background music or casual listening.'],
          ['128 to 160 kbps', 'Music that you still want to sound good on headphones.'],
        ],
      },
      {
        h2: 'Common file size limits',
        paras: ['Many email services limit attachments to about 20 to 25 MB, and some upload forms accept only 10 MB or less. Compressing to 64 or 96 kbps usually brings even long recordings under these limits.'],
      },
    ],
    faqs: [
      { q: 'How much can I reduce an MP3 file size?', a: 'Going from 320 kbps to 64 kbps mono makes the file about 80 percent smaller. The exact saving depends on the original bitrate.' },
      { q: 'Will compressing make it sound worse?', a: 'Lower bitrates remove more detail. Speech handles this very well; music starts to sound thinner below about 96 kbps.' },
      { q: 'Can I compress a WAV file?', a: 'Yes. Any supported audio or video file can be compressed into a small MP3.' },
      { q: 'Why did my file get bigger?', a: 'If the original already had a low bitrate, choosing a higher one will make it bigger. Pick a lower bitrate than the original.' },
    ],
    related: ['mp3-cutter', 'wav-to-mp3', 'podcast-to-mp3', 'audio-joiner'],
  },

  // ------------------------------------------------------------------ Joiner
  {
    slug: 'audio-joiner',
    nav: 'Audio Joiner',
    kind: 'join',
    metaTitle: 'Audio Joiner – Merge MP3 Files Online Free',
    metaDescription:
      'Join MP3 and other audio files into one MP3 online for free. Reorder tracks, add gaps between them and download a single file. No upload needed.',
    h1: 'Audio Joiner – Merge MP3 Files',
    lead: 'Combine several songs, recordings or voice notes into a single MP3. Put them in order, add a gap if you like, and download.',
    intro: {
      h2: 'Join audio files in a few clicks',
      paras: [
        'Sometimes one long file is easier than ten short ones: a full lecture recorded in parts, a mix for a party, or a set of voice notes you want to keep together.',
        'This audio joiner lets you mix formats, so you can join an MP3 with a WAV, an M4A memo and even the sound from a video. Everything becomes one MP3 file.',
      ],
    },
    steps: [
      ['Add your files', 'Choose two or more files. You can add more at any time.'],
      ['Set the order', 'Use the up and down arrows to put the tracks in the right order.'],
      ['Choose a gap', 'Add a short pause between tracks, or none for a seamless join.'],
      ['Join and download', 'Press Join, listen to the result and download your MP3.'],
    ],
    sections: [
      {
        h2: 'Ideas for using the audio joiner',
        list: [
          ['Lectures in parts', 'Merge a class that was recorded in several chunks into one file.'],
          ['Voice note collections', 'Keep a series of messages together in one place.'],
          ['Practice playlists', 'Join backing tracks or exercises with a 2-second gap between each.'],
          ['Podcast segments', 'Attach your intro and outro to the main recording.'],
        ],
      },
    ],
    faqs: [
      { q: 'Can I join files of different formats?', a: 'Yes. You can mix MP3, WAV, M4A, FLAC, OGG and even video files. The result is always one MP3.' },
      { q: 'How many files can I join?', a: 'There is no fixed limit, but the total length matters. Several hours of audio works best on a computer with plenty of memory.' },
      { q: 'Can I join a mono and a stereo file?', a: 'Yes. Mono parts are played on both sides so the joined file sounds even.' },
      { q: 'Can I add a pause between tracks?', a: 'Yes. Choose a gap from half a second up to three seconds.' },
    ],
    related: ['mp3-cutter', 'mp3-compressor', 'voice-to-mp3', 'wav-to-mp3'],
  },

  // ------------------------------------------------------------------ WMA
  {
    slug: 'wma-to-mp3',
    nav: 'WMA to MP3',
    kind: 'convert',
    tool: { heading: 'Upload WMA files to convert to MP3.', formats: 'WMA, WMA Pro, WMA Lossless, ASF', buttonLabel: 'Choose WMA Files', showRecord: false },
    metaTitle: 'WMA to MP3 Converter – Play Old Windows Media Audio Anywhere',
    metaDescription:
      'Convert WMA to MP3 online for free. Make old Windows Media Audio files play on iPhone, Mac, Android and car stereos. Batch convert in your browser, no upload.',
    h1: 'WMA to MP3 Converter',
    lead: 'Give your old Windows Media Audio collection a second life. Turn WMA files into MP3s that play on every phone, Mac and car stereo.',
    intro: {
      h2: 'Why WMA files stopped playing',
      paras: [
        'Windows Media Audio was Microsoft’s answer to MP3. For years, Windows Media Player saved ripped CDs as WMA by default, so many family music libraries from the 2000s are still full of .wma files.',
        'Today the format is a problem. iPhones and Macs cannot open WMA without extra software, many Android music apps skip it, and most car stereos ignore it completely. Converting to MP3 is the simplest way to rescue those albums and recordings.',
      ],
    },
    steps: [
      ['Gather your WMA files', 'Select a whole album or folder at once. Every file is converted one after another.'],
      ['Pick a bitrate', 'Match the original: old CD rips were often 128 to 192 kbps, so 192 kbps keeps everything.'],
      ['Download your MP3s', 'Use Download all to save the whole batch with the original file names.'],
    ],
    sections: [
      {
        h2: 'Which WMA types are supported?',
        list: [
          ['WMA Standard', 'The common type used for CD rips and downloads.'],
          ['WMA Pro', 'Higher-quality and multichannel files, mixed down to stereo.'],
          ['WMA Lossless', 'Convert at 320 kbps to keep as much detail as possible.'],
          ['WMA Voice', 'Speech recordings from old dictation software; 64 to 96 kbps mono is plenty.'],
        ],
      },
      {
        h2: 'Files that cannot be converted',
        paras: [
          'Some songs bought from online stores in the 2000s were sold as WMA with copy protection (DRM). Those files only play on authorised players and cannot be converted by any honest tool. Files you ripped from your own CDs are not protected and convert normally.',
        ],
      },
    ],
    faqs: [
      { q: 'Does converting WMA to MP3 reduce quality?', a: 'Both formats are lossy, so a little detail can be lost. Choosing the same or a slightly higher bitrate than the original keeps the difference very hard to hear.' },
      { q: 'Can I play WMA on iPhone?', a: 'Not directly. Convert the files to MP3 here, then add them to your music app or Files.' },
      { q: 'How many WMA files can I convert at once?', a: 'There is no fixed limit. Select as many as you like and they are processed in order.' },
      { q: 'Are my files uploaded?', a: 'No. The conversion runs inside your browser, so your music stays on your device.' },
    ],
    related: ['m4a-to-mp3', 'flac-to-mp3', 'audio-joiner', 'mp3-compressor'],
  },

  // ------------------------------------------------------------------ AMR
  {
    slug: 'amr-to-mp3',
    nav: 'AMR to MP3',
    kind: 'convert',
    tool: { heading: 'Upload AMR recordings to convert to MP3.', formats: 'AMR, AMR-WB (.awb), 3GA, 3GP', buttonLabel: 'Choose AMR Files', defaultBitrate: 128, defaultMono: true, showRecord: false },
    metaTitle: 'AMR to MP3 Converter – Convert Call & Voice Recordings Free',
    metaDescription:
      'Convert AMR to MP3 online for free. Open old phone voice recordings and call recordings on any device. Mono MP3 output, private and works in your browser.',
    h1: 'AMR to MP3 Converter',
    lead: 'Turn AMR voice memos and call recordings from older phones into MP3 files that open on any computer, phone or messaging app.',
    intro: {
      h2: 'What is an AMR file?',
      paras: [
        'AMR (Adaptive Multi-Rate) is a speech codec designed for mobile phone calls. Because it squeezes a voice into very few bits, many phones, voice recorder apps and call recorders used it to save recordings. You will often find .amr, .awb or .3ga files on older Android and feature phones.',
        'The catch is that computers and modern apps rarely open AMR. Windows Media Player, iTunes and most email previews show an error. Converting to MP3 makes those interviews, lectures and family voice notes easy to play and share.',
      ],
    },
    steps: [
      ['Copy the recordings to your device', 'Connect your phone or download the files from your cloud backup.'],
      ['Upload the AMR files', 'Choose one recording or a whole folder.'],
      ['Keep mono at 128 kbps', 'The page starts with these settings because AMR is speech-only.'],
      ['Download the MP3s', 'Play them anywhere or attach them to an email.'],
    ],
    sections: [
      {
        h2: 'AMR-NB vs AMR-WB',
        list: [
          ['AMR-NB (.amr)', 'Narrowband, 8 kHz. Sounds like a classic phone call. Common on older phones.'],
          ['AMR-WB (.awb)', 'Wideband, 16 kHz, also called HD Voice. Clearer and more natural speech.'],
        ],
      },
      {
        h2: 'Best settings for voice recordings',
        paras: [
          'AMR stores speech at only 4.75 to 23.85 kbps, so a higher MP3 bitrate cannot add clarity that was never recorded. A 64 to 128 kbps mono MP3 sounds exactly like the original while staying small. If the recording is quiet or has long silences, trim it afterwards with the MP3 Cutter.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I open an AMR file on Windows or Mac?', a: 'Convert it to MP3 here. The MP3 opens in any media player, browser or music app.' },
      { q: 'Why does my MP3 still sound like a phone call?', a: 'AMR records a narrow band of frequencies to save space. The MP3 keeps that sound exactly, but it cannot recreate frequencies that were never captured.' },
      { q: 'Can I convert call recordings?', a: 'Yes. Please make sure you have the consent required by local law for any call you recorded.' },
      { q: 'Do 3GA files work?', a: 'Yes. Samsung voice recorders often save .3ga files, and they convert the same way.' },
    ],
    related: ['voice-to-mp3', 'm4a-to-mp3', 'mp3-cutter', 'opus-to-mp3'],
  },

  // ------------------------------------------------------------------ CAF
  {
    slug: 'caf-to-mp3',
    nav: 'CAF to MP3',
    kind: 'convert',
    tool: { heading: 'Upload CAF files to convert to MP3.', formats: 'CAF with ALAC, AAC, PCM or AMR audio', buttonLabel: 'Choose CAF Files', showRecord: false },
    metaTitle: 'CAF to MP3 Converter – Convert Apple Core Audio Files Free',
    metaDescription:
      'Convert CAF to MP3 online for free. Open Apple Core Audio Format files from GarageBand, Logic, Xcode and iPhone on Windows and Android. Private, in your browser.',
    h1: 'CAF to MP3 Converter',
    lead: 'Turn Apple Core Audio Format (.caf) files into MP3s you can play on Windows, Android or any website.',
    intro: {
      h2: 'What is a CAF file?',
      paras: [
        'CAF, short for Core Audio Format, is a container Apple created for macOS and iOS. It can hold almost any kind of audio, including uncompressed PCM, Apple Lossless (ALAC), AAC and even AMR, and it has no 4 GB size limit, which makes it handy for long recordings.',
        'You meet CAF files in GarageBand and Logic projects, Xcode sound effects, ringtone and alert sounds, and audio saved from some iPhone apps. Outside the Apple world, though, almost nothing opens them. A quick conversion to MP3 fixes that.',
      ],
    },
    steps: [
      ['Export or copy the CAF file', 'From your Mac, iPhone (via the Files app) or an app project folder.'],
      ['Upload it here', 'Choose one or several .caf files.'],
      ['Choose the quality', 'Use 320 kbps for music and sound design, 128 kbps mono for voice.'],
      ['Download the MP3', 'Share it with anyone, on any platform.'],
    ],
    sections: [
      {
        h2: 'What is inside your CAF file?',
        list: [
          ['PCM (uncompressed)', 'Very large files. MP3 at 256 or 320 kbps makes them about ten times smaller.'],
          ['Apple Lossless (ALAC)', 'Perfect quality source; 320 kbps keeps the most detail.'],
          ['AAC', 'Already compressed; 192 kbps is a good match.'],
          ['AMR or iLBC', 'Voice-quality audio; 64 to 128 kbps mono is enough.'],
        ],
      },
      {
        h2: 'Common uses for converted CAF files',
        list: [
          ['Share a GarageBand idea', 'Send a quick demo to bandmates on Windows or Android.'],
          ['Reuse app sounds', 'Bring your own iOS game or app sound effects into a web project.'],
          ['Archive voice notes', 'Keep recordings saved as CAF in a format that will open for years to come.'],
        ],
      },
    ],
    faqs: [
      { q: 'Can Windows play CAF files?', a: 'Not without extra software. Converting to MP3 lets Windows Media Player and every other player open them.' },
      { q: 'Is CAF the same as M4A?', a: 'No. Both can hold AAC or ALAC audio, but CAF is a different container that only Apple software reads well.' },
      { q: 'Will my CAF file keep its loops and markers?', a: 'No. MP3 stores only the audio, so project data such as loop points is not carried over.' },
      { q: 'Are my files uploaded?', a: 'No. The conversion happens in your browser.' },
    ],
    related: ['alac-to-mp3', 'm4a-to-mp3', 'wav-to-mp3', 'mp3-compressor'],
  },

  // ------------------------------------------------------------------ AC3
  {
    slug: 'ac3-to-mp3',
    nav: 'AC3 to MP3',
    kind: 'convert',
    tool: { heading: 'Upload AC3 files to convert to MP3.', formats: 'AC3, E-AC3 (Dolby Digital Plus), MKV/MP4/VOB with AC3 audio', buttonLabel: 'Choose AC3 Files', defaultBitrate: 256, showRecord: false },
    metaTitle: 'AC3 to MP3 Converter – Dolby Digital 5.1 to Stereo MP3',
    metaDescription:
      'Convert AC3 (Dolby Digital) to MP3 online for free. 5.1 surround is mixed down to clear stereo, dialogue included. Works with E-AC3 and movie files. No upload.',
    h1: 'AC3 to MP3 Converter',
    lead: 'Turn Dolby Digital AC3 audio from movies, DVDs and TV recordings into stereo MP3 that plays on headphones, phones and car stereos.',
    intro: {
      h2: 'From home-cinema surround to everyday stereo',
      paras: [
        'AC3 is the file format behind Dolby Digital, the surround sound used on DVDs, Blu-ray discs, digital TV and many movie files. It usually carries 5.1 channels: front left and right, centre, two surrounds and a subwoofer channel.',
        'That is perfect for a living-room speaker system, yet most phones, music apps and car stereos cannot play AC3 at all. Converting to MP3 gives you a normal stereo file. The converter blends all the speakers into left and right, so the centre channel, where most dialogue lives, is kept instead of being thrown away.',
      ],
    },
    steps: [
      ['Choose your AC3 audio', 'Upload an .ac3 file, or a video file (MKV, MP4, VOB) that contains AC3 sound.'],
      ['Pick a bitrate', 'The page starts at 256 kbps, a good match for movie soundtracks.'],
      ['Convert', 'All surround channels are mixed down to stereo automatically.'],
      ['Download the MP3', 'Listen on any device.'],
    ],
    sections: [
      {
        h2: 'How 5.1 becomes stereo',
        paras: [
          'The surround channels are combined using the standard down-mix rules: the centre and the rear speakers are blended into both the left and right sides at a lower level. As a result voices stay clear and effects still move from side to side, just without the extra speakers.',
        ],
      },
      {
        h2: 'Popular reasons to convert AC3',
        list: [
          ['Listen to a film soundtrack', 'Enjoy dialogue or music from your own movie files on the go.'],
          ['Edit audio', 'Most audio editors import MP3 without special plugins.'],
          ['TV recordings', 'Save the sound of recorded programmes and concerts.'],
        ],
      },
    ],
    faqs: [
      { q: 'Will I lose the surround sound?', a: 'The result is stereo, because MP3 players use two speakers. All six channels are blended in, so nothing important, such as dialogue, is lost.' },
      { q: 'Can I convert E-AC3 (Dolby Digital Plus)?', a: 'Yes. E-AC3 files and videos that contain E-AC3 sound are supported.' },
      { q: 'Can I convert audio from a DVD?', a: 'You can convert unprotected VOB or AC3 files from your own discs. Copy-protected commercial DVDs cannot be read.' },
      { q: 'What bitrate should I use?', a: '256 kbps works well for movies; 320 kbps for concerts and music.' },
    ],
    related: ['mkv-to-mp3', 'video-to-mp3', 'mp4-to-mp3', 'mp3-cutter'],
  },

  // ------------------------------------------------------------------ ALAC
  {
    slug: 'alac-to-mp3',
    nav: 'ALAC to MP3',
    kind: 'convert',
    tool: { heading: 'Upload Apple Lossless (ALAC) files to convert to MP3.', formats: 'ALAC in .m4a or .caf', buttonLabel: 'Choose ALAC Files', defaultBitrate: 320, showRecord: false },
    metaTitle: 'ALAC to MP3 Converter – Apple Lossless to 320 kbps MP3',
    metaDescription:
      'Convert ALAC (Apple Lossless) to MP3 online for free. Make lossless iTunes and Apple Music rips play on Android, Windows and car stereos at up to 320 kbps.',
    h1: 'ALAC to MP3 Converter',
    lead: 'Make portable MP3 copies of your Apple Lossless library for Android phones, Windows PCs, smart speakers and car stereos.',
    intro: {
      h2: 'What is ALAC?',
      paras: [
        'ALAC, or Apple Lossless Audio Codec, is Apple’s lossless format. It shrinks music to roughly half the size of a WAV file while keeping every bit of the original sound. Many people choose it when ripping CDs in iTunes or the Music app, and the files usually end in .m4a, which makes them easy to confuse with ordinary AAC files.',
        'Lossless files are wonderful at home, but they fill a phone quickly and some devices outside the Apple world cannot play them. Converting ALAC to MP3 gives you a smaller copy that plays anywhere, while your lossless originals stay safe as your archive.',
      ],
    },
    steps: [
      ['Select your ALAC tracks', 'Choose a whole album from your Music folder at once.'],
      ['Keep 320 kbps', 'The page starts at the highest MP3 quality, ideal for a lossless source.'],
      ['Download all', 'Save every converted track in one go.'],
    ],
    sections: [
      {
        h2: 'Is my .m4a file ALAC or AAC?',
        paras: [
          'Both use the .m4a extension. On a Mac, select the file in Finder and choose Get Info: the Codecs line shows “Apple Lossless” or “AAC”. In the Music app, look at the Kind column. Lossless files are also much larger, typically 25 to 40 MB per song. Either way, this converter handles both.',
        ],
      },
      {
        h2: 'ALAC vs MP3 at a glance',
        list: [
          ['ALAC', 'Lossless, around 30 MB per song, best for archiving and hi-fi playback.'],
          ['MP3 320 kbps', 'About 8 to 10 MB per song, near-identical sound for most listeners.'],
          ['MP3 192 kbps', 'About 5 MB per song, great when phone storage is tight.'],
        ],
      },
    ],
    faqs: [
      { q: 'Should I delete my ALAC files after converting?', a: 'We recommend keeping them. Lossless files are your master copy and let you create any format later without extra quality loss.' },
      { q: 'Can I convert hi-res 24-bit ALAC?', a: 'Yes. The MP3 is created at the standard 44.1 kHz sample rate.' },
      { q: 'Will album art and tags be copied?', a: 'The converter focuses on the audio, so tags and artwork are not copied. A free tag editor can add them back.' },
      { q: 'Is it safe for my music library?', a: 'Yes. Files are converted in your browser and are never uploaded.' },
    ],
    related: ['flac-to-mp3', 'caf-to-mp3', 'm4a-to-mp3', 'wav-to-mp3'],
  },

  // ------------------------------------------------------------------ M4B
  {
    slug: 'm4b-to-mp3',
    nav: 'M4B to MP3',
    kind: 'convert',
    tool: { heading: 'Upload M4B audiobooks to convert to MP3.', formats: 'M4B, M4A audiobooks (DRM-free)', buttonLabel: 'Choose M4B Files', defaultBitrate: 64, defaultMono: true, bitrates: 'compress', showRecord: false },
    metaTitle: 'M4B to MP3 Converter – Convert Audiobooks to MP3 Free',
    metaDescription:
      'Convert M4B audiobooks to MP3 online for free. Play DRM-free audiobooks on any MP3 player, car stereo or Android app, with small speech-friendly file sizes.',
    h1: 'M4B to MP3 Converter',
    lead: 'Listen to your DRM-free audiobooks on any device. Convert M4B files into compact MP3s for MP3 players, car stereos and every audiobook app.',
    intro: {
      h2: 'What is an M4B file?',
      paras: [
        'M4B is the audiobook version of the MPEG-4 audio format. Inside it is usually AAC audio, just like an .m4a song, but the file can also store chapter markers and remember where you stopped listening. Apple Books and many audiobook publishers use it.',
        'Outside Apple apps, support is patchy. Many MP3 players, older car stereos and some Android apps will not open M4B at all. Converting to MP3 makes your audiobook play almost everywhere, and because audiobooks are speech, the page starts with small mono settings that sound clear and save space.',
      ],
    },
    steps: [
      ['Choose the audiobook', 'Select the M4B file, or each part if your book is split into several files.'],
      ['Keep the speech settings', '64 kbps mono is ideal for narration; choose 96 kbps if the book includes music.'],
      ['Convert and download', 'Save the MP3 and copy it to your player or audiobook app.'],
    ],
    sections: [
      {
        h2: 'Recommended settings for audiobooks',
        list: [
          ['64 kbps mono', 'About 29 MB per hour. Clear narration and very compact.'],
          ['96 kbps mono', 'Slightly richer voice, good for dramatised books with music.'],
          ['32 kbps mono', 'Tiny files for very long books on devices with little storage.'],
        ],
      },
      {
        h2: 'Before you convert',
        list: [
          ['DRM-free only', 'Audiobooks bought with copy protection (for example Audible .aax files or protected Apple Books titles) cannot be converted.'],
          ['Chapters', 'MP3 does not keep chapter markers. Use the MP3 Cutter to split a long book into chapter files if you need them.'],
          ['Very long books', 'Converting runs on your own device, and a many-hour book needs a lot of memory. A computer works best; on phones, convert one part at a time.'],
        ],
      },
    ],
    faqs: [
      { q: 'Can I convert Audible audiobooks?', a: 'No. Audible and other protected audiobooks use DRM, which cannot be converted. DRM-free M4B files, such as many from publishers, Libro.fm or your own recordings, work fine.' },
      { q: 'Will chapters be kept in the MP3?', a: 'No. MP3 has no standard for chapters. The audio is kept in full, but chapter markers are removed.' },
      { q: 'How big will the MP3 be?', a: 'At 64 kbps mono, about 29 MB per hour of listening, so a 10-hour book is roughly 290 MB.' },
      { q: 'Is there a file size limit?', a: 'Each file can be up to 500 MB. For very long books, a computer with plenty of memory gives the best results.' },
    ],
    related: ['m4a-to-mp3', 'mp3-cutter', 'mp3-compressor', 'podcast-to-mp3'],
  },

  // ------------------------------------------------------------------ Podcast
  {
    slug: 'podcast-to-mp3',
    nav: 'Podcast to MP3',
    kind: 'convert',
    tool: {
      heading: 'Upload your podcast recording to convert to MP3.',
      formats: 'WAV, M4A, FLAC, MP4, MOV, WEBM',
      buttonLabel: 'Choose Episode Files',
      defaultBitrate: 128,
      defaultMono: true,
      showRecord: false,
    },
    metaTitle: 'Podcast to MP3 Converter – Export Episodes for Publishing',
    metaDescription:
      'Convert podcast recordings to MP3 for Spotify, Apple Podcasts and any host. Use recommended podcast settings, free and private in your browser.',
    h1: 'Podcast to MP3 Converter',
    lead: 'Turn raw podcast recordings and video calls into a publish-ready MP3 with the settings podcast hosts recommend.',
    intro: {
      h2: 'MP3 is still the podcast standard',
      paras: [
        'Podcast hosting platforms and listening apps all support MP3, and many hosts recommend it for uploads. A WAV episode can easily be over 500 MB, while a well-encoded MP3 of the same hour is around 30 to 60 MB.',
        'This page starts with 128 kbps mono, a common choice for spoken-word shows. If your show has music or stereo effects, switch to stereo at 128 to 192 kbps.',
      ],
    },
    steps: [
      ['Add your episode', 'Upload the final WAV, M4A or even a recorded video call.'],
      ['Check the settings', '128 kbps mono for talk shows. Stereo 192 kbps for music-heavy shows.'],
      ['Download and publish', 'Upload the MP3 to your podcast host.'],
    ],
    sections: [
      {
        h2: 'Recommended podcast MP3 settings',
        list: [
          ['Talk shows', '96 to 128 kbps, mono, 44.1 kHz.'],
          ['Music or sound design', '128 to 192 kbps, stereo, 44.1 kHz.'],
          ['Very long episodes', '64 to 96 kbps mono keeps downloads fast for listeners on mobile data.'],
        ],
      },
      {
        h2: 'Before you publish',
        list: [
          ['Trim the edges', 'Use the MP3 Cutter to remove silence before the intro and after the outro.'],
          ['Add intro and outro', 'Use the Audio Joiner to attach your standard intro music.'],
        ],
      },
    ],
    faqs: [
      { q: 'What bitrate do podcasts use?', a: 'Many spoken-word podcasts use 96 to 128 kbps mono. Shows with a lot of music often use 128 to 192 kbps stereo.' },
      { q: 'Can I convert a Zoom recording to a podcast MP3?', a: 'Yes. Zoom saves an MP4 video and an M4A audio file. Either one converts here.' },
      { q: 'Do I need to add ID3 tags?', a: 'Most podcast hosts add the episode title and artwork for you, so tags inside the MP3 are optional.' },
    ],
    related: ['audio-joiner', 'mp3-cutter', 'mp3-compressor', 'voice-to-mp3'],
  },
];

export const TOOL_MAP = Object.fromEntries(TOOLS.map((t) => [t.slug, t]));
