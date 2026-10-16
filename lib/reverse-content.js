// Two-way converter pages: titles plus the "MP3 to X" content added to each format page in lib/tools.js.

export const REVERSE_CONTENT = {
  'wav-to-mp3': {
    target: 'wav',
    h1: 'WAV to MP3 & MP3 to WAV Converter',
    metaTitle: 'WAV to MP3 & MP3 to WAV Converter – Free Online',
    metaDescription:
      'Convert WAV to MP3 to save space, or MP3 to WAV for editing, CDs and DJ software. Free, private and runs in your browser with no upload.',
    sections: [
      {
        h2: 'Converting MP3 to WAV',
        paras: [
          'Sometimes you need the opposite direction. Audio editors, DJ software, CD burning apps and some upload forms ask for WAV files, and a few older programs open nothing else. Switch the converter to MP3 → WAV, choose 44.1 kHz for music and CDs or 48 kHz for video projects, then add your MP3 files. Each one becomes a standard 16-bit PCM .wav file.',
          'Keep in mind what this conversion can and cannot do. The WAV holds the MP3 sound exactly, so editing and saving it again adds no new loss. However, it cannot bring back detail the MP3 already removed, and the file grows to about 10 MB per minute. For speech, turning on Mono halves that size, because WAV stores every channel in full.',
        ],
        list: [
          ['Editing and mixing', 'Import a WAV into Audacity, GarageBand, FL Studio or Premiere Pro without decoding delays.'],
          ['Burning an audio CD', 'Many CD apps expect 44.1 kHz, 16-bit WAV, which is exactly what the 44.1 kHz option creates.'],
          ['DJ and sampler gear', 'Some hardware players and samplers only read WAV from a USB stick or SD card.'],
        ],
      },
    ],
    faqs: [
      { q: 'Does converting MP3 to WAV improve the quality?', a: 'No. The WAV keeps the MP3 sound exactly, but it cannot add back detail the MP3 removed. Convert MP3 to WAV for compatibility and editing, not for better sound.' },
      { q: 'Why is my WAV so much bigger than the MP3?', a: 'WAV is uncompressed, so it stores every sample in full: about 10 MB per minute in stereo at 44.1 kHz, compared with roughly 1 to 2.4 MB for an MP3.' },
      { q: 'Which sample rate should I pick for MP3 to WAV?', a: 'Choose 44.1 kHz for music and audio CDs, and 48 kHz if the WAV is going into a video editor.' },
    ],
  },

  'flac-to-mp3': {
    target: 'flac',
    h1: 'FLAC to MP3 & MP3 to FLAC Converter',
    metaTitle: 'FLAC to MP3 & MP3 to FLAC Converter – Free, Lossless Options',
    metaDescription:
      'Convert FLAC to MP3 at up to 320 kbps, or turn MP3 into FLAC for software that needs lossless files. Free, private and runs in your browser with no upload.',
    sections: [
      {
        h2: 'Converting MP3 to FLAC',
        paras: [
          'Switch the converter to MP3 → FLAC when an app, editor or upload form only accepts FLAC files. The tool wraps your MP3 audio in a lossless FLAC file, so nothing further is lost during the conversion.',
          'Keep expectations realistic, though: FLAC cannot bring back detail the MP3 already threw away. An MP3-to-FLAC file sounds exactly like the MP3, it is just larger. If you need true lossless quality, start from the original CD, WAV or studio master instead.',
        ],
      },
    ],
    faqs: [
      { q: 'Does converting MP3 to FLAC improve the sound?', a: 'No. FLAC stores audio perfectly, but it can only store what the MP3 still contains. Use MP3 to FLAC for compatibility, not for better quality.' },
      { q: 'Why is my FLAC file bigger than the MP3?', a: 'FLAC is lossless, so it saves every sample without throwing anything away. Lossless files are typically several times larger than MP3s.' },
    ],
  },

  'aac-to-mp3': {
    target: 'aac',
    h1: 'AAC to MP3 & MP3 to AAC Converter',
    metaTitle: 'AAC to MP3 & MP3 to AAC Converter – Free Online',
    metaDescription:
      'Convert AAC to MP3 for any player, or MP3 to AAC for Apple devices and smaller files. Choose 96 to 320 kbps. Free, private and works in your browser.',
    sections: [
      {
        h2: 'Converting MP3 to AAC',
        paras: [
          'AAC is the format Apple devices, YouTube and many streaming services use by default. It sounds a little better than MP3 at the same bitrate, which makes it handy when you want smaller files for an iPhone, iPad or Apple Music library.',
          'Choose MP3 → AAC, add your MP3 files and pick a bitrate. Because both formats are lossy, choose a bitrate at least as high as the original MP3 (192 kbps is a safe choice) so the conversion adds as little loss as possible. Turn on Mono for speech, so the whole bitrate goes to one clear voice channel.',
        ],
      },
    ],
    faqs: [
      { q: 'Is AAC better than MP3?', a: 'At the same bitrate AAC usually sounds slightly better, especially below 128 kbps. Above 192 kbps most listeners hear no difference.' },
      { q: 'Will MP3 to AAC reduce quality?', a: 'Converting between two lossy formats always loses a little. Using the same or a higher bitrate than the MP3 keeps the difference very small.' },
    ],
  },

  'ogg-to-mp3': {
    target: 'ogg',
    h1: 'OGG to MP3 & MP3 to OGG Converter',
    metaTitle: 'OGG to MP3 & MP3 to OGG Converter – Free, No Upload',
    metaDescription:
      'Convert OGG Vorbis to MP3 for iPhone and any player, or MP3 to OGG for games, Linux and open-source projects. 96 to 320 kbps, free and private.',
    sections: [
      {
        h2: 'Converting MP3 to OGG',
        paras: [
          'OGG Vorbis is open and royalty-free, which is why game developers, Linux software and many open-source projects prefer it. Game engines such as Godot and Unity handle OGG music and sound effects very well, and it often loops more cleanly than MP3.',
          'Pick MP3 → OGG, choose a bitrate (160 to 192 kbps suits music, 96 kbps mono suits voice) and convert your files in one batch. Keep the original MP3s in case you need them later.',
        ],
      },
    ],
    faqs: [
      { q: 'Why convert MP3 to OGG for games?', a: 'OGG Vorbis is royalty-free, widely supported by game engines and usually loops without the tiny gap MP3 files can have at the start.' },
      { q: 'Which bitrate should I use for OGG?', a: 'Around 160 to 192 kbps for music and 96 kbps for speech or simple sound effects.' },
    ],
  },

  'opus-to-mp3': {
    target: 'opus',
    h1: 'OPUS to MP3 & MP3 to OPUS Converter',
    metaTitle: 'OPUS to MP3 & MP3 to OPUS Converter – Voice Notes & More',
    metaDescription:
      'Convert OPUS voice notes to MP3, or MP3 to OPUS for tiny high-quality files and messaging apps. 32 to 160 kbps. Free, private and runs in your browser.',
    sections: [
      {
        h2: 'Converting MP3 to OPUS',
        paras: [
          'Opus is one of the most efficient audio formats available. Speech still sounds clear at 32 to 48 kbps and music sounds good at 96 to 128 kbps, so an MP3 can often shrink to a third of its size. Messaging apps such as Telegram and WhatsApp use Opus for voice messages, and some bots and voice tools expect it.',
          'Switch to MP3 → OPUS, pick a bitrate, and turn on Mono for voice recordings. The tool creates a standard .opus file (Opus audio in an Ogg container) at 48 kHz.',
        ],
      },
    ],
    faqs: [
      { q: 'What bitrate should I use for MP3 to OPUS?', a: '32 to 48 kbps mono for speech, 96 kbps for most music and 128 to 160 kbps if you want the highest quality.' },
      { q: 'Can I send the OPUS file as a voice message?', a: 'Many apps and bots accept Opus voice files, but each app has its own rules for what appears as a voice note. Check the app’s requirements if it does not show up as expected.' },
    ],
  },

  'webm-to-mp3': {
    target: 'webm',
    h1: 'WEBM to MP3 & MP3 to WEBM Converter',
    metaTitle: 'WEBM to MP3 & MP3 to WEBM Converter – Free Online',
    metaDescription:
      'Extract MP3 audio from WEBM videos, or convert MP3 to audio-only WEBM (Opus) for websites and web apps. Free, private and works in any modern browser.',
    sections: [
      {
        h2: 'Converting MP3 to WEBM',
        paras: [
          'WEBM is the web’s own open media format. An audio-only WEBM file with Opus sound is small, streams well and plays in all modern browsers, which makes it a good choice for background audio, podcast players and sound effects on websites.',
          'Choose MP3 → WEBM, pick a bitrate (96 to 128 kbps covers most uses) and convert. The result contains audio only, with no video track, so it stays light for your web pages.',
        ],
      },
    ],
    faqs: [
      { q: 'Does MP3 to WEBM create a video?', a: 'No. It creates an audio-only WEBM file with Opus sound, which is ideal for websites. Use MP3 to MOV or MP3 to MKV if you need a video file.' },
      { q: 'Will the WEBM file be smaller than the MP3?', a: 'Usually yes. Opus sounds good at lower bitrates, so a 96 to 128 kbps WEBM is often smaller than the original MP3.' },
    ],
  },

  'mov-to-mp3': {
    target: 'mov',
    h1: 'MOV to MP3 & MP3 to MOV Converter',
    metaTitle: 'MOV to MP3 & MP3 to MOV Converter – Audio to Video Free',
    metaDescription:
      'Extract MP3 from MOV videos, or turn MP3 into a MOV video with a plain background for iMovie, Final Cut or video upload sites. Free and private.',
    sections: [
      {
        h2: 'Converting MP3 to MOV',
        paras: [
          'Many places accept only video files: YouTube, social networks, presentation tools and video editors such as iMovie and Final Cut. Switch to MP3 → MOV and the converter places your audio on a simple dark background, creating a standard QuickTime video you can upload or edit.',
          'The picture is a single still frame, so the file stays small and converts quickly. Choose 192 kbps for most audio, or 256 kbps for music you want to keep crisp.',
        ],
      },
    ],
    faqs: [
      { q: 'Why would I convert MP3 to MOV?', a: 'To upload audio to sites that only accept video, such as YouTube, or to bring it into video editors like iMovie and Final Cut.' },
      { q: 'What will the MOV video show?', a: 'A plain dark background for the full length of your audio. You can replace or add images later in any video editor.' },
    ],
  },

  'mkv-to-mp3': {
    target: 'mkv',
    h1: 'MKV to MP3 & MP3 to MKV Converter',
    metaTitle: 'MKV to MP3 & MP3 to MKV Converter – Free, Private',
    metaDescription:
      'Extract MP3 audio from MKV videos, or turn MP3 into an MKV video with a plain background while keeping the original audio untouched. Free, in your browser.',
    sections: [
      {
        h2: 'Converting MP3 to MKV',
        paras: [
          'MKV (Matroska) is a flexible video container loved by media servers and players such as Plex, Kodi and VLC. Switch to MP3 → MKV to wrap your audio in an MKV video with a plain dark background, for example to add it to a media library or upload it where a video file is required.',
          'Your MP3 sound is copied into the MKV exactly as it is, without re-encoding, so there is no extra quality loss and the conversion is very fast.',
        ],
      },
    ],
    faqs: [
      { q: 'Does MP3 to MKV change my audio?', a: 'No. The original MP3 audio is copied into the MKV file unchanged; only a simple still picture is added.' },
      { q: 'Can I play the MKV on my TV?', a: 'Most smart TVs, media players and apps like VLC, Plex and Kodi play MKV files with MP3 audio.' },
    ],
  },

  'wma-to-mp3': {
    target: 'wma',
    h1: 'WMA to MP3 & MP3 to WMA Converter',
    metaTitle: 'WMA to MP3 & MP3 to WMA Converter – Free Online',
    metaDescription:
      'Convert old WMA files to MP3 for any device, or MP3 to WMA for Windows Media Player and older devices. 96 to 192 kbps, free, private and no upload.',
    sections: [
      {
        h2: 'Converting MP3 to WMA',
        paras: [
          'Some older Windows software, in-car systems and portable players were built around Windows Media Audio and handle WMA better than MP3. Corporate systems and legacy presentation workflows sometimes expect WMA too.',
          'Switch to MP3 → WMA, choose a bitrate (128 kbps is a good balance) and convert your files in one go. The result is a standard WMA file that opens in Windows Media Player and other Windows apps.',
        ],
      },
    ],
    faqs: [
      { q: 'When should I convert MP3 to WMA?', a: 'Only when a device or program specifically needs WMA. For everything else, MP3 is more widely supported.' },
      { q: 'Which bitrate is best for MP3 to WMA?', a: '128 kbps works well for most music; use 160 to 192 kbps for higher quality.' },
    ],
  },

  'amr-to-mp3': {
    target: 'amr',
    h1: 'AMR to MP3 & MP3 to AMR Converter',
    metaTitle: 'AMR to MP3 & MP3 to AMR Converter – Voice Files Free',
    metaDescription:
      'Convert AMR voice recordings to MP3, or MP3 to AMR for tiny voice files, older phones and telephony systems. Free, private and works in your browser.',
    sections: [
      {
        h2: 'Converting MP3 to AMR',
        paras: [
          'AMR creates incredibly small speech files, which is why phone networks, voicemail and IVR systems, MMS messages and older mobile phones use it. A minute of AMR at 12.2 kbps is only about 90 KB.',
          'Switch to MP3 → AMR and choose a bitrate from 4.75 to 12.2 kbps. The converter mixes your audio to mono and resamples it to 8 kHz, the standard for AMR-NB, so the result sounds like a clear phone call. That is perfect for voice prompts and announcements, but not suitable for music.',
        ],
      },
    ],
    faqs: [
      { q: 'Can I convert music from MP3 to AMR?', a: 'You can, but AMR is designed for speech at phone quality (8 kHz mono), so music will sound thin. It works best for voice prompts, announcements and recordings.' },
      { q: 'Which AMR bitrate should I choose?', a: '12.2 kbps gives the clearest voice. Lower settings make smaller files when storage or bandwidth is very limited.' },
    ],
  },

  'caf-to-mp3': {
    target: 'caf',
    h1: 'CAF to MP3 & MP3 to CAF Converter',
    metaTitle: 'CAF to MP3 & MP3 to CAF Converter – Apple Core Audio',
    metaDescription:
      'Convert CAF to MP3 for Windows and Android, or MP3 to CAF (Apple Lossless or PCM) for Xcode, iOS sounds and GarageBand. Free and private.',
    sections: [
      {
        h2: 'Converting MP3 to CAF',
        paras: [
          'Developers and musicians working in Apple’s world often need CAF files. Xcode projects and iOS system sounds accept CAF, and GarageBand and Logic import it without fuss.',
          'Choose MP3 → CAF and pick what goes inside the file: Apple Lossless (ALAC) keeps the sound exactly as in your MP3 at a moderate size, while uncompressed PCM gives maximum compatibility with audio tools at the cost of larger files.',
        ],
      },
    ],
    faqs: [
      { q: 'Should I choose ALAC or PCM for my CAF file?', a: 'ALAC is lossless and about half the size of PCM. Choose PCM only if a tool specifically needs uncompressed audio.' },
      { q: 'Can I use the CAF file in my iOS app?', a: 'Yes. CAF is a native Apple format, and both options work with Apple’s audio frameworks.' },
    ],
  },

  'ac3-to-mp3': {
    target: 'ac3',
    h1: 'AC3 to MP3 & MP3 to AC3 Converter',
    metaTitle: 'AC3 to MP3 & MP3 to AC3 Converter – Dolby Digital Free',
    metaDescription:
      'Convert Dolby Digital AC3 to stereo MP3, or MP3 to AC3 for DVD authoring, video editors and home theatre systems. 128 to 448 kbps. Free and private.',
    sections: [
      {
        h2: 'Converting MP3 to AC3',
        paras: [
          'The DVD-Video standard does not allow MP3 sound, so DVD authoring programs usually need AC3 (Dolby Digital) audio. AC3 is also the native format of many home-theatre receivers and some video editing workflows.',
          'Switch to MP3 → AC3 and choose a bitrate. 192 to 256 kbps is typical for stereo, while 384 or 448 kbps gives extra headroom. The result is stereo Dolby Digital, ready for your DVD project or editor.',
        ],
      },
    ],
    faqs: [
      { q: 'Why do DVDs need AC3 instead of MP3?', a: 'The DVD-Video specification only allows certain audio formats, such as AC3 and LPCM. MP3 is not one of them, so authoring tools ask for AC3.' },
      { q: 'Will MP3 to AC3 create 5.1 surround?', a: 'No. Your MP3 is stereo, so the AC3 file is stereo too. Creating real surround needs separate source tracks for each speaker.' },
    ],
  },

  'alac-to-mp3': {
    target: 'alac',
    h1: 'ALAC to MP3 & MP3 to ALAC Converter',
    metaTitle: 'ALAC to MP3 & MP3 to ALAC Converter – Apple Lossless',
    metaDescription:
      'Convert Apple Lossless (ALAC) to MP3 for Android and Windows, or MP3 to ALAC (.m4a) to keep one consistent Apple Music library. Free, private, no upload.',
    sections: [
      {
        h2: 'Converting MP3 to ALAC',
        paras: [
          'Some people keep their whole Apple Music or iTunes library in Apple Lossless and like every file to match. Others edit audio and want to avoid adding another round of MP3 compression each time they save. In both cases, MP3 → ALAC is handy.',
          'The converter saves your MP3 sound into an Apple Lossless .m4a file, losing nothing further. Remember that ALAC cannot restore detail the MP3 already removed: the file is larger, but it sounds the same as the MP3.',
        ],
      },
    ],
    faqs: [
      { q: 'Does MP3 to ALAC improve audio quality?', a: 'No. ALAC preserves exactly what is in the MP3. It is useful for consistency and editing, not for better sound.' },
      { q: 'Will the ALAC file play in Apple Music?', a: 'Yes. The file is a standard .m4a with Apple Lossless audio, which Apple Music, iTunes and iPhone play natively.' },
    ],
  },

  'm4b-to-mp3': {
    target: 'm4b',
    h1: 'M4B to MP3 & MP3 to M4B Converter',
    metaTitle: 'M4B to MP3 & MP3 to M4B Converter – Audiobooks Free',
    metaDescription:
      'Convert M4B audiobooks to MP3 for any player, or MP3 to M4B so Apple Books and audiobook apps remember your place. Speech-friendly settings, free and private.',
    sections: [
      {
        h2: 'Converting MP3 to M4B',
        paras: [
          'M4B is the audiobook format. Apple Books and many audiobook apps treat M4B files as books, remember where you stopped and let you change playback speed without losing your place. If your audiobook or lecture series is a pile of MP3s, converting to M4B makes it much nicer to listen to.',
          'Tip: first join the chapter MP3s into one file with our Audio Joiner, then switch to MP3 → M4B here. The default 64 kbps mono setting keeps narration clear while a ten-hour book stays under about 300 MB.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I turn several MP3 chapters into one M4B?', a: 'Join the chapters into a single MP3 with our Audio Joiner, then convert that file with MP3 → M4B.' },
      { q: 'Will my M4B have chapter markers?', a: 'No. The converter creates one continuous M4B. Apps still remember your position, but chapters are not added.' },
    ],
  },
};
