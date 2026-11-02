// English homepage content. Translations in lib/i18n/locales/<lang>/home.json mirror this structure.
// Inline markup: **bold**, *italic*, [link text](/path) — internal paths are localized automatically.

export const HOME = {
  metaTitle: 'MP3 Converter – Convert Audio & Video to MP3 Free Online',
  metaDescription:
    'Free online MP3 converter. Turn WAV, M4A, FLAC, MP4, MOV and other audio or video files into MP3 at up to 320 kbps. No sign-up, no upload, works in your browser.',
  ogDescription: 'Convert any audio or video file to MP3 in seconds. Free, private and works on phone or computer.',
  h1: 'MP3 Converter – Convert Audio & Video to',
  h1Highlight: 'MP3 Free Online',
  lead:
    'Drop in a song, a voice memo or a video and get an MP3 back in seconds. The conversion runs inside your browser, so your file stays on your device. It is free, needs no account and handles 30+ formats, from WAV and M4A to MP4 and MKV.',
  badges: ['Files stay on your device', 'No limit on conversions', 'Free, no sign-up', 'Up to 320 kbps'],

  popular: {
    eyebrow: 'Popular conversions',
    h2: 'Pick your format',
    intro:
      'The converter above accepts all of these. Each format page adds advice for that file type, such as the best bitrate and common problems.',
    tags: { video: 'Video', audio: 'Audio', lossless: 'Lossless' },
    names: {
      'mp4-to-mp3': 'MP4 to MP3',
      'wav-to-mp3': 'WAV to MP3',
      'm4a-to-mp3': 'M4A to MP3',
      'flac-to-mp3': 'FLAC to MP3',
      'mov-to-mp3': 'MOV to MP3',
      'ogg-to-mp3': 'OGG to MP3',
      'webm-to-mp3': 'WEBM to MP3',
      'aac-to-mp3': 'AAC to MP3',
    },
  },

  whatIs: {
    eyebrow: 'How it works',
    h2: 'What this MP3 converter does',
    paras: [
      'It takes a file your phone, car or website will not accept, such as a WAV recording, an iPhone M4A memo or the sound of an MP4 video, and saves it as an MP3. MP3 is still the format that plays almost everywhere: phones, car stereos, smart speakers, old MP3 players and every music app.',
      'Most converter sites upload your file to a server and make you wait in a queue. Here, your browser does the work. It decodes the audio with its built-in engine, falls back to FFmpeg for unusual formats, and encodes the MP3 with LAME, the same open-source encoder many desktop programs use.',
    ],
    imageAlt: 'Audio and video files converted to MP3',
    caption: 'Audio and video files go in, small and widely supported MP3 files come out.',
    after:
      'How fast is it? In our tests in Chrome on an ordinary 4-core machine, a 4-minute WAV song (40 MB) became a 320 kbps MP3 (9.2 MB) in about 20 seconds, and a 10-minute 720p MP4 (189 MB) became a 14 MB MP3 in about 45 seconds. Newer laptops and phones are usually faster. Since nothing is uploaded, a slow internet connection does not slow you down.',
  },

  howTo: {
    eyebrow: 'Step by step',
    h2: 'How to convert a file to MP3',
    intro: 'It takes four steps and usually under a minute.',
    imageAlt: 'How to convert a file to MP3',
    steps: [
      ['Choose the quality first', 'Leave 192 kbps for everyday listening, pick 320 kbps for music you want to keep, or 128 kbps with Mono for speech. Settings apply to files you add after changing them.'],
      ['Add one or more files', 'Click *Choose Files* or drag files onto the box. You can mix audio and video, up to 500 MB per file.'],
      ['Watch the progress', 'Each file shows its own progress bar. Files convert one at a time, so your device stays responsive.'],
      ['Download your MP3', 'Press *Download* next to a file, or *Download all* when several are ready. Each MP3 keeps the original file name.'],
    ],
    callout:
      '**Want to record instead?** Open the *Record* tab, allow the microphone and press *Stop & Convert* when you finish. You get an MP3 of your voice straight away.',
  },

  devices: {
    eyebrow: 'Any device',
    h2: 'Where your MP3 is saved on each device',
    intro: 'There is no app to install. The only difference between devices is where the finished file ends up.',
    list: [
      ['iPhone and iPad', 'In Safari, tap Choose Files and pick from Photos or the Files app. After you tap Download, the MP3 is in the Files app under Downloads, ready to share or open in a music app such as VLC.'],
      ['Android', 'In Chrome or another current browser, finished MP3s go to the Downloads folder, where your file manager and music apps can find them.'],
      ['Windows, Mac, Linux and Chromebook', 'Drag many files at once from your folders onto the box, then use Download all. Files land in your usual Downloads folder.'],
    ],
  },

  why: {
    eyebrow: 'Why MP3',
    h2: 'When converting to MP3 makes sense',
    intro: 'MP3 is not the newest format, but it solves four everyday problems.',
    list: [
      ['A device will not play your file', 'Car stereos, older MP3 players and some smart speakers refuse FLAC, OPUS, WMA or M4A. They all read MP3.'],
      ['The file is too big', 'Three minutes of WAV take about 30 MB. The same song as a 192 kbps MP3 takes about 4.3 MB, roughly seven times less.'],
      ['You need to send or upload it', 'Smaller files fit email attachment limits, send faster on WhatsApp and are accepted by sites that only take MP3.'],
      ['You only need the sound', 'For a lecture, a family video or a screen recording, the picture is often extra weight. Our [video to MP3](/video-to-mp3) tools keep just the audio.'],
    ],
  },

  bitrate: {
    eyebrow: 'Quality guide',
    h2: 'Which MP3 bitrate should you choose?',
    intro:
      'Bitrate (kbps) sets how much data each second of sound may use. Higher means more detail and a bigger file. These sizes are exact for stereo MP3 at a constant bitrate:',
    head: ['Bitrate', 'Size per minute', 'Best for'],
    rows: [
      ['128 kbps', 'about 0.96 MB', 'Podcasts, audiobooks, lectures, voice memos'],
      ['192 kbps', 'about 1.44 MB', 'Everyday music on phones and earbuds'],
      ['256 kbps', 'about 1.92 MB', 'Music on good headphones or home speakers'],
      ['320 kbps', 'about 2.40 MB', 'Music you want to keep, DJ sets, the highest MP3 quality'],
    ],
    tipsTitle: 'Four rules that matter more than the number',
    tips: [
      ['Start from the best source', 'An MP3 made from WAV or FLAC sounds cleaner than one made from another compressed file.'],
      ['Never “upscale”', 'Turning a 128 kbps file into 320 kbps only makes it bigger. Detail that was removed does not come back.'],
      ['Use Mono for a single voice', 'Speech sounds the same in mono, and the whole bitrate goes to one channel.'],
      ['Keep the original', 'MP3 is lossy. Keep the source file in case you need a different quality later.'],
    ],
  },

  compare: {
    eyebrow: 'Format comparison',
    h2: 'MP3 vs WAV vs AAC vs FLAC',
    intro:
      'Every format trades size against quality and compatibility. Here is how the four most common ones compare.',
    head: ['Format', 'Type', 'File size', 'Compatibility'],
    rows: [
      ['MP3', 'Lossy', 'Small', 'Plays on almost every device and app'],
      ['WAV', 'Uncompressed', 'Very large (about 10 MB per minute)', 'Best for recording and editing'],
      ['AAC / M4A', 'Lossy', 'Small', 'Excellent on Apple devices, patchy on older players'],
      ['FLAC', 'Lossless', 'Large (about half of WAV)', 'Favoured by audiophiles, not supported everywhere'],
    ],
    outro: 'Rule of thumb: use MP3 for listening and sharing, and keep WAV or FLAC as the master copy for editing and archiving.',
  },

  features: {
    eyebrow: 'Features',
    h2: 'What you get',
    intro: 'Simple enough for a first-time user, with the settings people who work with audio actually need.',
    imageAlt: 'Features of the MP3 converter',
    items: [
      ['Your files stay with you', 'Uploads are converted on your own device and never reach our servers. Only links you paste are fetched by our server, and those files are deleted within 30 minutes.'],
      ['No upload, no queue', 'Conversion starts the moment you add a file. Speed depends on your device, not on your internet connection.'],
      ['Four quality levels', 'Choose 128, 192, 256 or 320 kbps, plus Mono for speech. The format pages explain which to pick for each file type.'],
      ['Batch conversion', 'Add a whole folder. Files are converted one after another, and Download all saves them in one go.'],
      ['30+ formats', 'Audio such as WAV, M4A, FLAC, OGG, OPUS, WMA and AMR, and video such as MP4, MOV, MKV, WEBM and AVI.'],
      ['Free, no account', 'No sign-up, no email, no watermark and no daily cap.'],
    ],
  },

  uses: {
    eyebrow: 'Real-life uses',
    h2: 'What people use it for',
    items: [
      ['Study on the go', 'Turn a recorded lecture or online class into an MP3 for the commute, and listen at 128 kbps mono to save space.'],
      ['Publish podcasts', 'Export the final episode as MP3, the format every podcast host and app accepts.'],
      ['Share voice notes', 'Convert iPhone M4A memos or WhatsApp OPUS notes so anyone can open them. Or [turn the recording into text](/transcribe-audio-to-text).'],
      ['Build a music library', 'Make portable MP3 copies of your own WAV or FLAC albums for the phone and the car.'],
      ['Revive an old MP3 player', 'Convert WMA, FLAC, M4A or OGG files that an older player or car stereo refuses into standard MP3s.'],
      ['Make ringtones and clips', 'Convert the song, then keep just the chorus with the [MP3 Cutter](/mp3-cutter).'],
    ],
  },

  privacy: {
    eyebrow: 'Safety & privacy',
    h2: 'Is this MP3 converter safe?',
    text:
      'Yes, and you can check it yourself. When you add a file, your browser reads it into memory, decodes the sound and encodes the MP3 locally. Open your browser’s network tools while converting and you will see that the file is never sent anywhere. The FFmpeg engine (about 32 MB) is downloaded once, only for formats the browser cannot read itself.',
    list: [
      'Uploaded files never leave your device. Files from pasted links are deleted from our server within 30 minutes.',
      'No software or extension to install, so no bundled adware.',
      'No account, so there is no personal data to leak.',
      'Closing the tab clears every converted file from memory.',
    ],
    callout:
      '**Please convert responsibly.** Use the tool for your own recordings, files you bought or files you have permission to use. Copying protected music or films without permission may break copyright law.',
  },

  faqTitle: 'Frequently asked questions',
  faqs: [
    { q: 'Is this MP3 converter really free?', a: 'Yes. There is no price, no sign-up and no limit on the number of files. Because your own device does the work, we have no server costs for uploads to pass on to you.' },
    { q: 'Are my files uploaded to your server?', a: 'No. Uploaded files are converted inside your browser. Only when you paste a link does our server fetch that file for you, and it deletes the result within 30 minutes.' },
    { q: 'How long does a conversion take?', a: 'Usually seconds. In our tests a 4-minute WAV song took about 20 seconds and a 10-minute 720p video about 45 seconds on an ordinary computer. The first rare-format file can take longer while the FFmpeg engine loads once.' },
    { q: 'Can I convert a video to MP3?', a: 'Yes. Add an MP4, MOV, MKV, WEBM or another video and only the sound track is saved as MP3. A 189 MB, 10-minute video became a 14 MB MP3 in our test.' },
    { q: 'Which bitrate should I choose?', a: '128 kbps with Mono for speech, 192 kbps for everyday music and 320 kbps for music you want to keep. Never choose a bitrate higher than the source to “improve” it; it only makes the file bigger.' },
    { q: 'Will converting to MP3 lower the quality?', a: 'A little, because MP3 is lossy. From a WAV or FLAC source at 256 or 320 kbps, most people cannot hear a difference on normal speakers or earbuds.' },
    { q: 'Is there a file size limit?', a: 'Each file can be up to 500 MB. Very long files need free memory, so if one fails on a phone, try it on a computer.' },
    { q: 'Why did my file fail to convert?', a: 'Usually the file is damaged, has no sound track, or is copy-protected (DRM), such as purchased films or Apple Music downloads. Check that the file plays in another app first.' },
    { q: 'Is it legal to convert files to MP3?', a: 'Converting your own files, or files you have permission to use, is generally fine for personal use. Do not use the tool to copy music, films or other content you do not have rights to.' },
  ],

  author: {
    title: 'Written by the MP3 Converter team',
    text: 'We build simple, privacy-first audio tools. The speeds and file sizes on this page come from our own tests, and we update this guide whenever the converter changes. [Learn more about us](/about).',
  },

  cta: {
    h2: 'Ready to convert?',
    text: 'Free, private and done in seconds. Scroll up, drop in your file and download your MP3.',
    button: 'Convert to MP3 Now',
  },

  jsonLd: {
    appDescription: 'Free online MP3 converter that turns audio and video files into MP3 inside your browser, with bitrates from 128 to 320 kbps.',
    operatingSystem: 'Any (runs in a web browser)',
    features: [
      'Convert WAV, M4A, AAC, FLAC, OGG and OPUS to MP3',
      'Extract MP3 audio from MP4, MOV, WEBM and MKV video',
      'Record your voice and save it as MP3',
      '128, 192, 256 and 320 kbps output',
      'Batch conversion',
      'No upload: files stay on your device',
    ],
  },
};
