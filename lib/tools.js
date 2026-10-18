import { REVERSE_CONTENT } from './reverse-content';
// Content and settings for every tool page (rendered by app/[slug]/page.js).

const videoFormats = 'MP4, MOV, MKV, WEBM, AVI, WMV, FLV, 3GP, M4V';

const BASE_TOOLS = [

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
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'YouTube to MP3 – Free & Fast YT to MP3 Converter',
    metaTitle: 'YouTube to MP3 – Free & Fast YT to MP3 Converter',
    metaDescription:
      'Convert YouTube to MP3 free and fast. Paste any YT link to download videos, Shorts and YouTube Music as MP3 at up to 320 kbps. Safe, no app and no sign-up.',
    h1: 'YouTube to MP3 Converter',
    lead: 'Our free YouTube to MP3 converter lets you paste a link and download any video as MP3 audio in a few taps. It works online on iPhone, Android and computer, with quality up to 320 kbps, mono for speech and an option to keep only the part you need.',
    intro: {
      h2: 'A free online YouTube to MP3 converter with real options',
      paras: [
        'A YouTube to MP3 converter takes the sound from a video and saves it as an MP3 audio file that plays almost anywhere. People use it to hear lectures on the bus, keep a workout mix on an old MP3 player, or save a podcast episode for a flight without Wi-Fi. However, most YT to MP3 sites stop at one button and one quality. As a result, you often get a bigger file than you need, or a two-hour livestream when you only wanted ten minutes of it.',
        'This tool focuses on audio alone, so it can offer the settings that actually matter for sound. You pick from seven bitrates, all the way up to 320 kbps, switch speech to mono, and cut a section by typing a start and end time. Best of all, it stays free: no account, no app to install and no watermark on your file.',
      ],
      image: { src: '/images/youtube-to-mp3-converter.svg', alt: 'YouTube to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-youtube-to-mp3.svg', alt: 'How to convert YouTube to MP3', width: 960, height: 300 },
    howCta: 'Convert YouTube to MP3 now',
    steps: [
      ['Copy the YouTube link', 'Tap Share under the video and choose Copy link, or copy the address from your browser bar. Regular videos, youtu.be links, YouTube Shorts and YouTube Music tracks all work.'],
      ['Paste it and choose the quality', 'Paste the link into the box above. 192 kbps suits most videos, 320 kbps is best for music, and 64 to 96 kbps keeps long talks small.'],
      ['Add extras if you want them', 'Turn on Mono for speech. Turn on Cut a part and enter times such as 1:20 to 4:05 to keep only that section.'],
      ['Convert and download the MP3', 'Tap Convert to MP3 and watch the circle fill up. When it reaches 100%, tap the round Download button to save the file.'],
    ],
    sections: [
      {
        h2: 'YouTube to MP3 at 320 kbps: which quality should you pick?',
        paras: [
          'Bitrate decides how much detail your MP3 keeps and how large the file becomes. Use this quick guide to match the setting to what you are saving.',
        ],
        list: [
          ['Music and live sessions', '256 or 320 kbps in stereo keeps every instrument clear. Pick 320 kbps for songs you plan to keep.'],
          ['Podcasts, interviews and lectures', '96 or 128 kbps in mono sounds just as clear and takes far less space than 320 kbps.'],
          ['Language lessons and audiobooks', '64 kbps mono makes very long recordings small enough to carry dozens on your phone.'],
          ['Ringtones and short clips', 'Use Cut a part to keep 20 to 30 seconds, then fine-tune it with our [MP3 Cutter](/mp3-cutter) if needed.'],
        ],
        image: { src: '/images/youtube-to-mp3-320-kbps.svg', alt: 'YouTube to MP3 320 kbps quality', width: 960, height: 330 },
      },
      {
        h2: 'Does a 320 kbps MP3 sound better than YouTube?',
        paras: [
          'YouTube usually streams audio at about 128 to 160 kbps in the Opus or AAC format. Converting at 192 kbps therefore keeps everything the original stream holds. Choosing 320 kbps adds a safety margin for music, which is why many listeners prefer it for their favourite songs. Still, no converter can add detail that YouTube never sent, so there is no need to go that high for speech. If you plan to edit the sound in a music or video app, our [YouTube to WAV](/youtube-to-wav) converter gives you an uncompressed file instead.',
        ],
      },
      {
        h2: 'Save YouTube audio on iPhone, Android or computer',
        paras: [
          'Whether you call it YouTube to MP3 or simply YT to MP3, the steps are the same on every device, because the converter runs online in your browser. On a computer, copy the link from the address bar and paste it here. On Android, tap Share under the video, choose Copy link, then paste it into this page in Chrome. The finished MP3 lands in your Downloads folder.',
          'On an iPhone or iPad, open this page in Safari and convert as usual. When you tap Download, Safari saves the MP3 to the Files app, inside the Downloads folder. From there, you can play it, share it or open it in a music app such as VLC. Since there is nothing to install, the tool works the same in Safari, Chrome, Edge and Firefox.',
        ],
        image: { src: '/images/youtube-to-mp3-on-iphone-and-android.svg', alt: 'YouTube to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the YouTube to MP3 converter',
      },
      {
        h2: 'YouTube Shorts, YouTube Music and playlists',
        paras: [
          'The converter handles more than standard videos. Paste a YouTube Shorts link to grab the song or voice-over from a short clip, which is handy when a trending sound gets stuck in your head. YouTube Music links (music.youtube.com) work too, so you can turn a YT Music track into an MP3 for offline listening. And when you want the picture as well as the sound, switch to our [YouTube to MP4](/youtube-to-mp4) downloader.',
          'Playlists work a little differently. To keep the service quick for everyone, the tool converts one video at a time. So, to save a YouTube playlist as MP3 files, open the playlist, copy the link of each video you want and convert them one by one. If you paste the link of a video that is playing inside a playlist, you get that single video as an MP3.',
        ],
      },
      {
        h2: 'Load your MP3 player, car stereo or phone',
        paras: [
          'MP3 is the one audio format that nearly every device understands. That makes this YouTube to MP3 converter an easy way to fill an older MP3 player, a car stereo that reads USB sticks, a smartwatch or a child’s audio player. Simply convert the videos, copy the MP3 files into the device’s music folder, and they play like any other track. Short on space? Run large files through our [MP3 Compressor](/mp3-compressor) to fit more songs on the device.',
        ],
      },
      {
        h2: 'Is this YouTube to MP3 converter safe?',
        paras: [
          'Safety is a fair question, because many download sites are packed with pop-up ads, fake download buttons and installers that bundle unwanted software. We built this converter to avoid all of that.',
        ],
        list: [
          ['Nothing to install', 'Everything happens on this page, so there is no app or browser extension that could carry adware.'],
          ['No account or email', 'You never share personal details to convert a video.'],
          ['No fake buttons', 'There is one Convert button and one Download button, and both do exactly what they say.'],
          ['Files are deleted automatically', 'Your MP3 is prepared on our server and removed within 30 minutes. Our privacy policy explains the details.'],
        ],
      },
      {
        h2: 'How to convert YouTube to MP3 legally',
        paras: [
          'Converting a video is legal in many situations, but it depends on who owns the content and on the laws where you live. YouTube’s terms only allow downloads where YouTube itself offers a download option, and much of its music is protected by copyright. [MP3 Converter](/) is an independent tool and is not affiliated with, endorsed by or sponsored by YouTube or Google. Generally, these uses are safe:',
        ],
        list: [
          ['Your own uploads', 'Videos you made and published yourself, such as a recorded talk or a band rehearsal.'],
          ['Creative Commons videos', 'In YouTube search, open Filters and choose Creative Commons, then follow the licence terms, such as giving credit.'],
          ['Public-domain content', 'Old speeches, classical recordings and other works that are free of copyright.'],
          ['Content with permission', 'Videos whose creator clearly allows downloads, for example free beats or royalty-free music.'],
        ],
      },
    ],
    faqs: [
      { q: 'Is this YouTube to MP3 converter really free?', a: 'Yes. You can convert and download YouTube videos to MP3 for free, with no sign-up, no software and no watermark on your files.' },
      { q: 'Can I download YouTube to MP3 at 320 kbps?', a: 'Yes. Choose 320 kbps before you tap Convert. It is the highest MP3 quality and a great choice for music, although 192 kbps already keeps everything YouTube streams.' },
      { q: 'Is it safe to use a YouTube to MP3 converter?', a: 'This one is. There is nothing to install, no account to create and no pop-up ads, and converted files are deleted from our server within 30 minutes. In general, avoid any converter that asks you to install software or allow notifications.' },
      { q: 'How do I convert YouTube to MP3 on iPhone?', a: 'Open this page in Safari, paste the video link and tap Convert to MP3. Then tap Download, and Safari saves the MP3 to the Files app in your Downloads folder.' },
      { q: 'Can I convert a YouTube playlist to MP3?', a: 'Not in one step. Convert the videos one at a time by pasting each video link. A link to a video inside a playlist converts just that video.' },
      { q: 'Does it work with YouTube Shorts and YouTube Music?', a: 'Yes. Paste a Shorts link, a youtu.be short link or a music.youtube.com link exactly as you copied it.' },
      { q: 'Can I convert only part of a YouTube video to MP3?', a: 'Yes. Turn on Cut a part, enter a start time such as 2:10 and an end time such as 5:45, then convert. Only that section becomes your MP3, which saves time and data.' },
      { q: 'Is YT to MP3 the same as YouTube to MP3?', a: 'Yes. “YT” is simply short for YouTube, so YT to MP3, YT MP3 converter and YouTube to MP3 all describe the same thing: turning a YouTube link into an MP3 audio file, which is exactly what this page does.' },
      { q: 'Is it legal to convert YouTube videos to MP3?', a: 'It depends on the video and your country. Converting your own uploads, Creative Commons or public-domain videos, or content you have permission to save is generally fine. Downloading copyrighted music without permission may break the law and YouTube’s terms.' },
      { q: 'Why do I see “temporarily blocking downloads”?', a: 'YouTube sometimes limits requests for a short while. Wait a minute or two and try again.' },
      { q: 'Do I need YouTube to MP4 instead?', a: 'If you want the picture as well as the sound, use our YouTube to MP4 tool. This page always produces audio-only MP3 files.' },
    ],
    related: ['youtube-to-mp4', 'youtube-to-wav', 'mp3-cutter', 'mp4-to-mp3'],
  },

  // ------------------------------------------------------------------ YouTube to MP4
  {
    slug: 'youtube-to-mp4',
    nav: 'YouTube to MP4 Downloader',
    kind: 'link',
    tool: {
      heading: 'Paste a YouTube link to save it as MP4.',
      formats: 'Videos and Shorts · 240p to 1080p Full HD · MP4 with sound · no watermark',
      linkFormats: ['mp4'],
      sites: 'youtube',
      placeholder: 'Paste a YouTube link or URL, e.g. https://youtu.be/…',
    },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'YouTube to MP4 – Free HD YouTube Video Downloader (1080p)',
    metaTitle: 'YouTube to MP4 – Free HD YouTube Video Downloader (1080p)',
    metaDescription:
      'Download YouTube videos as MP4 in HD up to 1080p. Paste any YouTube link and save the video with sound on iPhone, Android or Mac. Free, safe and no watermark.',
    h1: 'YouTube to MP4 Converter & Video Downloader',
    lead: 'Our free YouTube to MP4 converter turns any YouTube link into an MP4 video with sound. Choose HD quality up to 1080p, then save the file on your iPhone, Android phone, Mac or Windows PC without an app, an account or a watermark.',
    intro: {
      h2: 'A free online YouTube video downloader that keeps it simple',
      paras: [
        'An internet connection is not always there when you need it. You might be on a flight, in a classroom with weak Wi-Fi, or in a meeting room where your own video has to play without buffering. In each case, an MP4 copy of the YouTube video solves the problem, because it plays offline in any video player.',
        'This downloader works only with YouTube links and only creates MP4 files, so every option on the page is about video. It picks the H.264 format whenever YouTube offers it, since H.264 plays on practically every phone, TV, laptop and editing app. Then it joins the picture and sound into one tidy file, ready to download in a few taps.',
      ],
      image: { src: '/images/youtube-to-mp4-downloader.svg', alt: 'YouTube to MP4 downloader', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-download-youtube-video-to-mp4.svg', alt: 'How to download a YouTube video to MP4', width: 960, height: 300 },
    howCta: 'Download a YouTube video to MP4',
    steps: [
      ['Copy the YouTube URL', 'Tap Share under the video and choose Copy link, or copy the address from your browser bar. Shorts links and youtu.be links work too.'],
      ['Paste the link', 'Paste the URL into the box at the top of this page.'],
      ['Choose a resolution', 'Pick 720p HD for a good balance, 1080p Full HD for large screens, or 240p to 360p to save data.'],
      ['Convert and download', 'Tap Convert to MP4 and watch the circle fill up. When it reaches 100%, tap the round Download button to save the MP4.'],
    ],
    sections: [
      {
        h2: 'YouTube to MP4 in HD: from 240p to 1080p',
        paras: [
          'Resolution decides how sharp the video looks and how much space it takes. A 1080p file looks crisp on a TV, while a 360p copy of the same video can be ten times smaller. Use this guide to choose before you download.',
        ],
        list: [
          ['240p and 360p', 'Tiny files for slow connections, phones with little storage, or talks where the picture matters less.'],
          ['480p', 'Clear enough for faces and on-screen text on a phone or tablet.'],
          ['720p HD', 'Sharp on laptops and most monitors while keeping files reasonable.'],
          ['1080p Full HD', 'Best for TVs, projectors and video editing. Files are roughly twice the size of 720p.'],
        ],
        image: { src: '/images/youtube-to-mp4-1080p-hd.svg', alt: 'YouTube to MP4 in 1080p HD', width: 960, height: 340 },
      },
      {
        h2: 'Why a 1080p option may be missing',
        paras: [
          'A download can never be sharper than the original upload. So, if a creator uploaded in 720p, choosing 1080p gives you the best version that exists, which is 720p. Older videos and some Shorts may only be available in lower resolutions.',
        ],
      },
      {
        h2: 'Download YouTube videos on iPhone, Mac, Android and Windows',
        paras: [
          'Because this YT video downloader runs online in your browser, there is nothing to install on any device. On Windows or a Mac, copy the link from the address bar, paste it here and download. The MP4 lands in your Downloads folder and opens in QuickTime, VLC or the Windows Media Player.',
          'On an iPhone or iPad, open this page in Safari and convert as usual. Safari saves the MP4 to the Files app, inside Downloads. To move it to your Photos, open the file, tap Share and choose Save Video. On Android, Chrome saves the MP4 to Downloads, and it then appears in your Gallery or Photos app.',
        ],
        image: { src: '/images/youtube-video-downloader-iphone-mac.svg', alt: 'YouTube video downloader for iPhone and Mac', width: 960, height: 340 },
        cta: 'Try the YouTube to MP4 downloader',
      },
      {
        h2: 'Save YouTube Shorts as MP4',
        paras: [
          'Shorts work just like regular videos. Copy the link from the Share button of a Short, paste it above and convert. You get a vertical MP4 that keeps the original frame, so it looks right when you play it back on your phone. Note that a Short is usually available only in the resolution its creator uploaded.',
        ],
      },
      {
        h2: 'What makes a good YouTube video downloader?',
        paras: [
          'Plenty of sites promise to be the best YouTube video downloader, yet many hide the real button between ads or push you to install an app. Here is what we think matters, and how this tool measures up.',
        ],
        list: [
          ['Free, with no watermark', 'Your MP4 is a clean copy of the video, with no logo stamped on the picture and no time limit.'],
          ['Real HD quality', 'Choose up to 1080p Full HD, with picture and sound joined in one file.'],
          ['Works on any device', 'Phone, tablet or computer, with no app or browser extension to install.'],
          ['Plays in any MP4 player', 'H.264 video plays on iPhone, Android, Mac, Windows, smart TVs and video editors.'],
        ],
      },
      {
        h2: 'Is this YouTube downloader safe?',
        paras: [
          'Yes. Many download sites carry pop-up ads, fake download buttons or installers bundled with unwanted software. This one has none of that: one Convert button, one Download button, no sign-up and no extension. The video is prepared on our server and deleted automatically within 30 minutes.',
        ],
      },
      {
        h2: 'Download responsibly',
        paras: [
          'Save videos you made yourself, videos that are clearly licensed for re-use, such as Creative Commons, or videos you have permission to keep. YouTube’s terms do not allow other downloads, and copyright law may apply where you live. [MP3 Converter](/) is an independent tool and is not affiliated with, endorsed by or sponsored by YouTube or Google.',
        ],
      },
      {
        h2: 'Need audio only, or a video from another site?',
        paras: [
          'If you only want the sound, our [YouTube to MP3](/youtube-to-mp3) converter saves it as audio at up to 320 kbps. Already downloaded the MP4? Then you can pull the soundtrack out with our [MP4 to MP3](/mp4-to-mp3) converter. And for videos hosted on other websites, try the [Online Video Downloader](/online-video-downloader).',
        ],
      },
    ],
    faqs: [
      { q: 'Is this YouTube to MP4 converter free?', a: 'Yes. You can download YouTube videos to MP4 for free, with no sign-up, no app and no watermark on the video.' },
      { q: 'Can I download YouTube videos in 1080p?', a: 'Yes. Choose 1080p Full HD before you tap Convert. If the video was uploaded in a lower resolution, you get the best quality available.' },
      { q: 'Does the MP4 include sound?', a: 'Yes. YouTube stores picture and sound separately at higher qualities, and this tool joins them into one MP4 with audio.' },
      { q: 'How do I download a YouTube video on iPhone?', a: 'Open this page in Safari, paste the video link, choose a resolution and tap Convert to MP4. Then tap Download. The video is saved in the Files app, and you can move it to Photos with Share, then Save Video.' },
      { q: 'Does it work on a Mac?', a: 'Yes. It runs in Safari, Chrome or Firefox on macOS, with nothing to install. The MP4 is saved to your Downloads folder and plays in QuickTime.' },
      { q: 'Can I download YouTube Shorts as MP4?', a: 'Yes. Paste the Shorts link exactly as you copied it, and you will get a vertical MP4 with sound.' },
      { q: 'Is it safe to use?', a: 'Yes. There are no pop-ups, no software to install and no account. Files are deleted from our server within 30 minutes.' },
      { q: 'What does YT to MP4 mean?', a: '“YT” is a common short form of YouTube. YT to MP4, YT video downloader and YouTube to MP4 all mean saving a YouTube video as an MP4 file, which is what this tool does.' },
      { q: 'Can I download YouTube videos in 4K?', a: 'The highest option is 1080p Full HD. It keeps download times short and files small enough for phones.' },
      { q: 'Can I download private or members-only videos?', a: 'No. Only public videos can be downloaded.' },
    ],
    related: ['youtube-to-mp3', 'youtube-to-wav', 'mp4-to-mp3', 'online-video-downloader'],
  },

  // ------------------------------------------------------------------ YouTube to WAV
  {
    slug: 'youtube-to-wav',
    nav: 'YouTube to WAV Converter',
    kind: 'link',
    tool: {
      heading: 'Paste a YouTube link to convert it to WAV.',
      formats: 'Videos, Shorts and YouTube Music links · 44.1 or 48 kHz · mono or stereo · cut any part · up to 1 hour',
      linkFormats: ['wav'],
      sites: 'youtube',
      advanced: true,
      placeholder: 'Paste a YouTube link, e.g. https://www.youtube.com/watch?v=…',
    },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'YouTube to WAV – Free YT to WAV Converter & Downloader',
    metaTitle: 'YouTube to WAV – Free YT to WAV Converter & Downloader',
    metaDescription:
      'Convert YouTube to WAV for free. Paste any YT link and download lossless .wav audio at 44.1 or 48 kHz, ready for audio editors, DJ software and video projects.',
    h1: 'YouTube to WAV Converter',
    lead: 'Our free YouTube to WAV converter saves the sound of any YouTube video as an uncompressed .wav file. Paste a link, choose 44.1 or 48 kHz, and drop the audio straight into your editor, DAW or video timeline.',
    intro: {
      h2: 'A free YouTube WAV converter built for editing',
      paras: [
        'Most people convert YouTube videos to MP3 for listening. However, if you plan to edit, mix or sample the sound, WAV is the better choice. MP3 is a compressed format, so every time you edit and save it again, it loses a little more quality. WAV stores audio without compression, so you can cut, mix, add effects and export as often as you like without new losses.',
        'That is why editors, producers and DJs work with WAV. This YouTube to WAV downloader fetches the best audio track the video offers and saves it as a standard 16-bit PCM WAV file at the sample rate your project needs. In addition, you can switch to mono for voice work or cut out just the section you want, which keeps the file smaller.',
      ],
      image: { src: '/images/youtube-to-wav-converter.svg', alt: 'YouTube to WAV converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-youtube-to-wav.svg', alt: 'How to convert YouTube to WAV', width: 960, height: 300 },
    howCta: 'Convert YouTube to WAV now',
    steps: [
      ['Copy the YouTube link', 'Tap Share under the video and choose Copy link, or copy the address from your browser bar. Shorts and YouTube Music links work too.'],
      ['Paste it and pick a sample rate', '44.1 kHz matches music and CDs; 48 kHz matches video projects in Premiere Pro, Final Cut, DaVinci Resolve and CapCut.'],
      ['Add extras if needed', 'Turn on Mono for voice-overs, or Cut a part to keep only the section you need.'],
      ['Convert and download', 'Tap Convert to WAV and watch the circle fill up. When it reaches 100%, tap the round Download button to save the .wav file.'],
    ],
    sections: [
      {
        h2: 'WAV or MP3: which should you download?',
        paras: [
          'Both formats have a clear job. WAV is a working format: it keeps every sample exactly as received, so it suits editing, mixing and mastering. MP3 is a listening format: it removes sound you are unlikely to hear and shrinks the file by around 85%. So, if you only want to enjoy a track on your phone, our [YouTube to MP3](/youtube-to-mp3) converter is the faster choice.',
          'One honest note: converting to WAV cannot add detail that the YouTube stream never had. Instead, it makes sure nothing more is lost from this point on, which is exactly what you need before editing.',
        ],
        image: { src: '/images/youtube-to-wav-vs-mp3.svg', alt: 'YouTube to WAV vs MP3', width: 960, height: 330 },
      },
      {
        h2: '44.1 kHz or 48 kHz?',
        paras: [
          'The sample rate should match the project you are working on. Choosing the right one up front means your editor will not need to resample the audio later.',
        ],
        list: [
          ['44.1 kHz', 'The standard for music, CDs and most audio editors such as Audacity, GarageBand and FL Studio.'],
          ['48 kHz', 'The standard for video. Use it when the WAV goes into Premiere Pro, Final Cut, DaVinci Resolve or CapCut.'],
          ['Mono', 'Ideal for speech, voice-overs and interviews. It halves the file size.'],
        ],
      },
      {
        h2: 'YT to WAV for creators, DJs and producers',
        paras: [
          'A YT to WAV conversion is handy whenever audio needs more work. For example, you might clean up the voice track of your own upload, pull a royalty-free backing track into a mix, sample a Creative Commons recording, or prepare narration for subtitles and transcription. Because WAV is uncompressed, the file you import behaves just like a recording made on your own computer.',
          'DJs also like WAV, since programs such as rekordbox, Serato and Traktor load it instantly and without decoding. Meanwhile, video editors can line it up frame by frame against picture without any timing drift.',
        ],
        image: { src: '/images/youtube-wav-for-audio-editing.svg', alt: 'YouTube WAV audio ready for editing', width: 960, height: 340 },
        cta: 'Try the YouTube to WAV converter',
      },
      {
        h2: 'Use it on any device',
        paras: [
          'This YouTube converter to WAV runs online in your browser, so there is nothing to install on Windows, Mac, Android or iPhone. On a computer, the .wav file lands in your Downloads folder. On an iPhone or iPad, Safari saves it to the Files app, where apps such as GarageBand can open it. On Android, Chrome saves it to Downloads.',
        ],
      },
      {
        h2: 'How big will the WAV file be?',
        paras: [
          'Uncompressed audio is large. Stereo WAV at 44.1 kHz uses about 10 MB per minute, so a 5-minute song is roughly 50 MB, and mono halves that. For this reason, the tool converts videos of up to one hour. To keep files small, use Cut a part to save only the section you need. Later, you can trim the WAV further, or turn it into a smaller file with our [WAV to MP3](/wav-to-mp3) converter.',
        ],
      },
      {
        h2: 'Is this YouTube to WAV downloader free and safe?',
        paras: [
          'Yes, on both counts. There is no sign-up, no software to install, no pop-up ads and no watermark or audio tag added to your file. The WAV is prepared on our server and deleted automatically within 30 minutes.',
        ],
      },
      {
        h2: 'Use it responsibly',
        paras: [
          'Only convert videos you own, Creative Commons or public-domain content, or audio you have permission to use. YouTube’s terms do not allow other downloads, and copyright law may apply where you live. [MP3 Converter](/) is an independent tool and is not affiliated with, endorsed by or sponsored by YouTube or Google.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this YouTube to WAV converter free?', a: 'Yes. You can convert and download YouTube audio as WAV for free, with no sign-up, no software and no watermark.' },
      { q: 'What is YT to WAV?', a: '“YT” is short for YouTube. YT to WAV, YT WAV converter and YouTube to WAV all mean saving the audio of a YouTube video as an uncompressed WAV file, which is what this tool does.' },
      { q: 'Is WAV better quality than MP3?', a: 'WAV is lossless, so it keeps the audio exactly as it was received without adding compression. It cannot add detail beyond what YouTube streamed, but it is the best format for editing because it never loses more quality.' },
      { q: 'What kind of WAV file do I get?', a: 'A standard 16-bit PCM .wav file at 44.1 or 48 kHz, in stereo or mono. It opens in every audio editor, DAW, DJ app and video editor.' },
      { q: 'Which sample rate should I choose?', a: 'Choose 44.1 kHz for music and audio projects, and 48 kHz if you will use the WAV in a video editor.' },
      { q: 'Can I convert only part of a YouTube video to WAV?', a: 'Yes. Turn on Cut a part and enter a start and end time, such as 0:45 to 2:10. Only that section is saved as WAV.' },
      { q: 'Does it work with YouTube Shorts and YouTube Music?', a: 'Yes. Paste a Shorts link, a youtu.be link or a music.youtube.com link exactly as you copied it.' },
      { q: 'Is there a length limit?', a: 'Yes, up to one hour per video, because WAV files are about 10 MB per minute.' },
    ],
    related: ['youtube-to-mp3', 'youtube-to-mp4', 'wav-to-mp3', 'mp3-cutter'],
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
      placeholder: 'Paste a video link or URL, e.g. https://archive.org/details/…',
    },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'Online Video Downloader – Free MP4 Downloads from Any Link',
    metaTitle: 'Online Video Downloader – Free MP4 Downloads from Any Link',
    metaDescription:
      'Free online video downloader: paste a link to save videos from Internet Archive, Vimeo, Wikimedia and direct URLs as MP4 in up to 1080p. No app or sign-up.',
    h1: 'Online Video Downloader',
    lead: 'Our free Online Video Downloader saves videos from around the web as MP4 files. Paste a link from a site that allows downloads, choose a quality up to 1080p, and get a file that plays on any phone, tablet or computer.',
    intro: {
      h2: 'One free video downloader for the open web',
      paras: [
        'Plenty of video online is meant to be shared and saved: public-domain films on Internet Archive, Creative Commons clips, NASA footage, open courses, and creators on Vimeo who switch on the download option. However, each site has its own player and its own menus, which makes saving a copy harder than it should be.',
        'This online video downloader removes that hassle. Paste the page link or a direct file URL, and the tool finds the video, picks the best matching quality and hands you a clean MP4 with sound. There is no software to install, no account and no watermark. It is built for sites that welcome downloads, while YouTube and TikTok have their own dedicated pages.',
      ],
      image: { src: '/images/online-video-downloader.svg', alt: 'Online video downloader', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-download-video-from-link.svg', alt: 'How to download a video from a link', width: 960, height: 300 },
    howCta: 'Download a video from a link',
    steps: [
      ['Find a downloadable video', 'Look for a public-domain, Creative Commons or “download allowed” label, or a direct link ending in .mp4, .webm or .mov.'],
      ['Copy and paste the link', 'Copy the page address or the direct file URL and paste it into the box at the top of this page.'],
      ['Choose a resolution', '720p is a sensible default. Smaller sizes save data, while 1080p suits large screens.'],
      ['Convert and download', 'Tap Convert to MP4 and watch the circle fill up. When it reaches 100%, tap the round Download button.'],
    ],
    sections: [
      {
        h2: 'Where to find free videos to download',
        paras: [
          'The web is full of video you are allowed to keep. These sources work well with the downloader, and most of them let you reuse what you save.',
        ],
        list: [
          ['Internet Archive', 'Classic films, old TV shows, lectures and news footage in the public domain.'],
          ['Wikimedia Commons', 'Freely licensed clips that are used across Wikipedia.'],
          ['NASA and public agencies', 'Space footage and government video that is usually free to reuse.'],
          ['Vimeo', 'Videos whose creators have enabled the download button.'],
          ['Open courses', 'University lectures and tutorials published under open licences.'],
          ['Direct file links', 'Any public link that ends in .mp4, .webm, .mov or .mkv.'],
        ],
        image: { src: '/images/where-to-find-free-videos.svg', alt: 'Where to find free videos to download', width: 960, height: 330 },
        cta: 'Paste a video link now',
      },
      {
        h2: 'Download video from a URL in the quality you need',
        paras: [
          'You choose the resolution before you download, so the file fits your screen and your storage. As a rule of thumb, 360p suits slow connections, 480p looks clear on a phone, 720p HD is sharp on laptops, and 1080p Full HD is best for TVs and editing. Keep in mind that a download can never be sharper than the original, so if a site only offers 480p, that is the best version available.',
        ],
      },
      {
        h2: 'Save videos on iPhone, Android, Mac and Windows',
        paras: [
          'Because this video downloader works online, it runs in any modern browser. On Windows or a Mac, the MP4 lands in your Downloads folder and plays in VLC, QuickTime or the Windows Media Player. On Android, Chrome saves it to Downloads, and it then shows up in your Gallery.',
          'On an iPhone or iPad, open this page in Safari. The video is saved to the Files app, and from there you can tap Share, then Save Video, to move it into Photos.',
        ],
        image: { src: '/images/online-video-downloader-any-device.svg', alt: 'Online video downloader on any device', width: 960, height: 340 },
      },
      {
        h2: 'Links this tool does not handle',
        paras: [
          'To keep each tool simple and reliable, some links go to a dedicated page instead.',
        ],
        list: [
          ['YouTube', 'Use our [YouTube to MP4](/youtube-to-mp4) downloader for video, or [YouTube to MP3](/youtube-to-mp3) for audio.'],
          ['TikTok', 'A dedicated [TikTok to MP3](/tiktok-to-mp3) tool is coming soon.'],
          ['Paid or private content', 'Videos behind a login, paywall or copy protection (such as Netflix or Disney+) cannot be downloaded.'],
        ],
      },
      {
        h2: 'Is this online video downloader safe?',
        paras: [
          'Yes. Many free video downloaders hide the real button between pop-up ads or ask you to install an extension. This one keeps it simple: one Convert button, one Download button, no sign-up and nothing to install. Your MP4 is prepared on our server and deleted automatically within 30 minutes.',
        ],
      },
      {
        h2: 'Check the licence before you reuse',
        paras: [
          '“Free to watch” does not always mean “free to reuse”. Before you publish a downloaded video elsewhere, check its licence. Public-domain works can be reused freely, while Creative Commons licences may ask you to credit the creator or avoid commercial use. [MP3 Converter](/) is an independent tool, so please download only videos you have the right to save.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this online video downloader free?', a: 'Yes. You can download videos as MP4 for free, with no sign-up, no software and no watermark.' },
      { q: 'Which websites can I download videos from?', a: 'Sites that offer videos for free download, such as Internet Archive, Wikimedia Commons, NASA, Vimeo videos with downloads enabled, and any direct link to a video file.' },
      { q: 'Can I download a video from a direct URL?', a: 'Yes. Paste any public link that ends in .mp4, .webm, .mov or .mkv, and the tool saves it as an MP4.' },
      { q: 'What quality can I download?', a: 'From 240p up to 1080p Full HD, depending on the quality the website offers.' },
      { q: 'Does it work on iPhone?', a: 'Yes. Open this page in Safari, paste the link and download. The MP4 is saved to the Files app, and you can move it to Photos with Share, then Save Video.' },
      { q: 'Why does it not accept YouTube links?', a: 'YouTube has its own dedicated tools on this site: YouTube to MP4 for video and YouTube to MP3 for audio.' },
      { q: 'Can I get just the audio from a video link?', a: 'Yes. Use MP4 to MP3, which accepts both uploaded files and video links.' },
      { q: 'How long are files kept?', a: 'Finished files are stored only so you can download them, and they are deleted automatically within 30 minutes.' },
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
    seoTitle: 'MP4 to MP3 Converter | Extract Audio from Video Free',
    metaTitle: 'MP4 to MP3 Converter | Extract Audio from Video Free',
    metaDescription:
      'Turn any MP4 into a clean MP3 file in one click. Fast and free — upload, convert and download with no account needed.',
    h1: 'MP4 to MP3 Converter',
    lead: 'Our free MP4 to MP3 converter lets you change any MP4 video into MP3 audio online in a few seconds. Upload a file from your phone or computer, or paste a link to an MP4 that is online, then pick a quality up to 320 kbps and download a clean audio file that plays everywhere.',
    intro: {
      h2: 'A free online video to audio converter for MP4 files',
      paras: [
        'MP4 is the default video format for phones, screen recorders, Zoom and Teams recordings and most editing apps. Very often, however, you only need what you can hear: the talk from a webinar, the soundtrack of a holiday clip or the narration of a tutorial. An MP3 is far smaller than the video, so it fits in an email, plays in any music app and keeps playing with your phone screen off. In short, turning a video into an audio file saves space and makes the sound easy to take anywhere.',
        'This page gives you two ways in. With Upload, the conversion happens entirely inside your browser, so private videos never leave your device. With Paste Link, our server fetches an MP4 that is already online, for example a direct .mp4 address or a video on Internet Archive, and hands you the MP3. Either way, you can convert MP4 to MP3 free, with no account and no watermark.',
      ],
      image: { src: '/images/mp4-to-mp3-converter.svg', alt: 'MP4 to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-mp4-to-mp3.svg', alt: 'How to convert MP4 to MP3', width: 960, height: 300 },
    howCta: 'Convert MP4 to MP3 now',
    steps: [
      ['Choose Upload or Paste Link', 'Upload is selected by default and works with videos stored on your device. Tap Paste Link instead when the MP4 lives online.'],
      ['Set the MP3 quality', 'For uploads, pick 128 to 320 kbps and turn on Mono for speech before you add the file, because the settings lock in at that moment. The Paste Link tab offers 64 to 320 kbps, with 192 kbps preselected.'],
      ['Add the MP4 or paste the link', 'Tap Choose MP4 Files or drag several videos onto the box, and conversion starts by itself. For a link, paste the address and tap Convert to MP3.'],
      ['Download your MP3', 'Play the result on the page, then tap Download. Converted several files? Use Download all to save them in one go.'],
    ],
    sections: [
      {
        h2: 'MP4 vs MP3: file size and the best bitrate',
        paras: [
          'A minute of 720p MP4 video takes about 20 MB, mostly because of the picture. The MP3 keeps only the sound, so the same minute shrinks to roughly 1 MB at 128 kbps and 2.4 MB at 320 kbps. In other words, an hour-long recording drops from over a gigabyte to about 58 MB at 128 kbps.',
          'Most MP4 files store their sound as AAC at about 128 to 256 kbps. So 192 kbps keeps nearly everything in everyday videos, while going far above the source only makes the file bigger. Use this quick guide:',
        ],
        list: [
          ['Music videos and concerts', '256 or 320 kbps in stereo keeps instruments and vocals crisp.'],
          ['Lectures, webinars and meetings', '128 kbps with Mono turned on gives clear speech in a small file.'],
          ['Phone clips and vlogs', '192 kbps is a safe middle ground for speech mixed with background music.'],
          ['Long talks from a link', 'The Paste Link tab also offers 64 and 96 kbps when size matters more than detail.'],
        ],
        image: { src: '/images/mp4-to-mp3-vs-mp3-size.svg', alt: 'MP4 vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Upload or Paste Link: which option fits?',
        list: [
          ['Upload, the most private choice', 'Phone recordings, screen captures and meeting exports are read and encoded on your own device. Each file can be up to 500 MB.'],
          ['Paste Link, for videos already online', 'Skip downloading a huge MP4 first. Direct .mp4 links and free video sites such as Internet Archive or Vimeo (where downloads are enabled) work. Live streams and videos longer than about three hours are not supported.'],
          ['Batch conversion', 'Select several MP4 files at once. They convert one after another, so your phone or laptop stays responsive.'],
          ['YouTube and TikTok links', 'These have their own pages. Use the [YouTube to MP3](/youtube-to-mp3) converter for YouTube, while TikTok support is coming soon.'],
        ],
      },
      {
        h2: 'Convert MP4 to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'Because the converter runs in the browser, there is no app to install on any device. On an iPhone or iPad, open this page in Safari and tap Choose MP4 Files. iOS then lets you pick from Photo Library or Choose File, so videos in Photos and in the Files app both work. After you tap Download, the MP3 appears in Files, inside the Downloads folder.',
          'On Android, Chrome opens your gallery or file manager, and finished files land in Downloads. Meanwhile, on a Mac or Windows PC, you can simply drag MP4 files from Finder or File Explorer onto the box. Safari, Chrome, Edge and Firefox all work. For very large videos, a computer is usually faster, since it has more memory than a phone.',
        ],
        image: { src: '/images/mp4-to-mp3-on-phone-and-computer.svg', alt: 'MP4 to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the MP4 to MP3 converter',
      },
      {
        h2: 'Is this MP4 to MP3 converter safe and private?',
        paras: [
          'Your videos are personal, so privacy matters here. When you upload, [MP3 Converter](/) reads the MP4 inside your browser with Web Audio, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. As a result, the file is never sent to a server at all.',
        ],
        list: [
          ['No upload to a server', 'Uploaded videos stay on your device from start to finish.'],
          ['Links are cleaned up', 'Paste Link files are processed on our server and deleted within 30 minutes.'],
          ['Nothing to install', 'There is no app, extension or download manager that could carry adware.'],
          ['No account and no watermark', 'You never share an email address, and the MP3 contains only your audio.'],
        ],
      },
      {
        h2: 'Does MP4 to MP3 lose quality? Quick answers',
        paras: [
          'MP3 is a lossy format, so the conversion is not lossless. However, the sound inside most MP4 files is already compressed AAC. Converting it at 192 kbps or higher therefore keeps any difference very hard to hear. Your original video is never changed; you simply get a new MP3 file next to it.',
          'People also ask whether the MP3 keeps the picture. It does not, because MP3 is audio only. If a video has 5.1 surround sound, the tool mixes all channels down to stereo, so dialogue from the centre speaker is kept. And if a file has no sound track at all, such as a silent screen recording, you see a clear message instead of an empty MP3.',
        ],
      },
      {
        h2: 'Popular reasons to turn a video into MP3',
        list: [
          ['Meeting and class recordings', 'Turn a Zoom or Teams MP4 into an MP3 you can replay on a walk or a commute.'],
          ['Song ideas and rehearsals', 'Save a band practice filmed on a phone as an MP3 to share with the group.'],
          ['Ringtones and short clips', 'Convert first, then keep the best 30 seconds with our [MP3 Cutter](/mp3-cutter).'],
          ['Other video formats', 'Got MOV, MKV or AVI files too? The [video to MP3](/video-to-mp3) converter handles them all.'],
        ],
      },
      {
        h2: 'Why use an online MP4 to MP3 converter?',
        paras: [
          'Desktop programs such as VLC or Audacity can save the sound of a video, but you have to install them and dig through export menus first. An online converter, by contrast, opens in a browser tab and is ready straight away. That makes it the quickest way to change MP4 to MP3 on a work laptop, a school computer or a phone with little free space.',
          'Not every free convert website works the same way, though. Many upload your whole video to their servers, cap the file size or ask you to sign up before you can download. This one reads uploaded MP4 files on your own device, accepts files up to 500 MB and lets you download without an account. In addition, it handles several videos in one go, so turning a folder of clips into MP3 files takes only a few taps.',
        ],
      },
      {
        h2: 'Converting linked videos responsibly',
        paras: [
          'Only convert videos you made yourself, videos in the public domain or under a Creative Commons licence, or content you have permission to use. Many films, music videos and shows are protected by copyright, and some websites forbid downloads in their terms. Copy-protected (DRM) videos from streaming services cannot be read by this tool at all.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I convert MP4 to MP3 for free?', a: 'Open this page, pick a quality, tap Choose MP4 Files and select your video. The MP3 is ready in seconds and costs nothing, with no sign-up and no watermark.' },
      { q: 'Can I convert an MP4 link to MP3?', a: 'Yes. Switch to the Paste Link tab, paste a direct .mp4 address or the page that hosts the video, choose a bitrate and tap Convert to MP3. YouTube links belong in our YouTube to MP3 tool instead.' },
      { q: 'Can I convert MP4 to MP3 at 320 kbps?', a: 'Yes. Choose 320 kbps before you add the file. It is the best MP3 quality, although 192 kbps already matches the sound in most MP4 videos.' },
      { q: 'How do I convert MP4 to MP3 on iPhone?', a: 'Open this page in Safari, tap Choose MP4 Files and pick the video from Photo Library or Files. When it finishes, tap Download and find the MP3 in the Files app under Downloads.' },
      { q: 'Are my uploaded videos sent to your server?', a: 'No. Uploaded files are converted inside your browser and never leave your device. Only the Paste Link option uses our server, and those files are deleted within 30 minutes.' },
      { q: 'Can I convert several MP4 files at once?', a: 'Yes. Select or drag in several videos together. They convert one by one, and a Download all button appears when two or more are ready.' },
      { q: 'Is there a file size limit?', a: 'Each uploaded file can be up to 500 MB. Linked videos can be up to about three hours long, and live streams are not supported.' },
      { q: 'Why did my MP4 fail to convert?', a: 'Usually the video has no sound track, is damaged, or is copy protected (DRM). Try playing it in another app first to check that it has sound.' },
      { q: 'Can I change other videos to MP3 here?', a: 'Yes, for most common formats. The uploader is tuned for MP4, M4V and MOV, and it can usually open MKV, WEBM and AVI as well. For the widest format support, use our Video to MP3 converter.' },
      { q: 'Is an online video to audio converter as good as desktop software?', a: 'For extracting audio, yes. This page uses FFmpeg and the LAME encoder, the same open-source tools many desktop apps rely on, and it runs on your own device with nothing to install.' },
      { q: 'Can I paste a TikTok link here?', a: 'Not yet. TikTok to MP3 is coming soon. Meanwhile, if you saved a TikTok video to your device, you can upload that file here.' },
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
    seoTitle: 'TikTok to MP3: Download TikTok Audio & Sounds Free',
    metaTitle: 'TikTok to MP3: Download TikTok Audio & Sounds Free',
    metaDescription:
      'Save any TikTok song, sound or voiceover as a high-quality MP3. Paste the link, convert and download free — no account needed.',
    h1: 'TikTok to MP3 Converter',
    lead: 'Our TikTok to MP3 converter is coming soon: you will paste a TikTok link and save just the sound as an MP3 file. We are still testing it, so the box above is not active yet. Meanwhile, if the video is already on your device, you can turn it into an MP3 today with our [MP4 to MP3](/mp4-to-mp3) tool.',
    intro: {
      h2: 'A TikTok sound downloader for MP3 files (launching soon)',
      paras: [
        'A lot of today’s catchy audio starts on TikTok: remixes, voice-overs, comedy bits, cooking narrations and original songs from new artists. Inside the app, you can add a sound to your Favorites, yet you cannot easily take it elsewhere as a normal audio file. That is the gap this tool will fill.',
        'Once it launches, this TikTok audio downloader will let you paste a video link, choose an MP3 quality up to 320 kbps and download the audio. As a result, you can listen offline, reuse your own sounds in an editor or keep a backup of the voice-overs you recorded. Until then, we would rather tell you plainly that it is not ready than show a button that does not work.',
      ],
      image: { src: '/images/tiktok-to-mp3-converter.svg', alt: 'TikTok to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-tiktok-to-mp3.svg', alt: 'How to convert TikTok to MP3', width: 960, height: 300 },
    howCta: 'See the TikTok to MP3 tool',
    steps: [
      ['Copy the TikTok link', 'In the TikTok app, tap Share on the video and choose Copy link. On a computer, copy the address from the browser bar instead.'],
      ['Paste it into the box', 'Once the tool is live, you will paste the link above. Right now, the box is shown as a preview only.'],
      ['Choose the MP3 quality', 'You will be able to pick a bitrate up to 320 kbps, so short sounds stay crisp.'],
      ['Download the sound', 'Then save the MP3 to your phone or computer, ready for any music or editing app.'],
    ],
    sections: [
      {
        h2: 'What the TikTok to MP3 converter will do',
        list: [
          ['Save your own sounds', 'Keep a copy of the original audio and voice-overs you posted.'],
          ['Edit outside TikTok', 'Bring a sound into CapCut, Audacity or another editor as an MP3.'],
          ['Listen offline', 'Play saved audio in a music app, in the car or on a smartwatch.'],
          ['Fill an MP3 player', 'Copy your TikTok MP3 files to an MP3 player, a car stereo or a kids’ audio player, since MP3 plays almost everywhere.'],
          ['Trim the hook', 'Pair it with our [MP3 Cutter](/mp3-cutter) to keep just the chorus or a ringtone-length clip.'],
        ],
      },
      {
        h2: 'Convert a saved TikTok video to MP3 today',
        paras: [
          'You do not have to wait if the video is already on your device. TikTok shows a Save video option in the Share menu when the creator allows downloads, and you can always save your own posts. The result is a video file in your Photos app or gallery.',
          'After that, open the MP4 to MP3 tool, tap Choose MP4 Files and pick the saved clip. It converts inside your browser, so the file stays private. For screen recordings and other formats, the [video to MP3](/video-to-mp3) converter works just as well.',
        ],
      },
      {
        h2: 'Which MP3 quality suits a TikTok sound?',
        paras: [
          'TikTok sounds are usually short, often under a minute, so file size is rarely a problem. A one-minute clip at 320 kbps takes about 2.4 MB, and at 128 kbps about 1 MB. However, the audio inside a TikTok video is already compressed, so a higher bitrate cannot add detail the original never had.',
        ],
        list: [
          ['Music and remixes', '256 or 320 kbps keeps beats and vocals clear.'],
          ['Voice-overs and comedy bits', '128 kbps is plenty for speech.'],
          ['Ringtones', '192 kbps is a good balance for a 30-second clip.'],
        ],
        image: { src: '/images/tiktok-to-mp3-vs-mp3-size.svg', alt: 'TikTok sound to MP3 quality options', width: 960, height: 330 },
      },
      {
        h2: 'TikTok to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'Like every tool on this site, TikTok to MP3 will run in the browser, so you will not need an extra app. On an iPhone, you will copy the link in TikTok, paste it here in Safari and find the MP3 in the Files app under Downloads. On Android, Chrome will save the file to your Downloads folder.',
          'On a Mac or Windows PC, the steps will be the same: copy the address from tiktok.com and paste it into the box. In the meantime, the upload tools on this site already work on all of these devices today.',
        ],
        image: { src: '/images/tiktok-to-mp3-on-phone-and-computer.svg', alt: 'TikTok to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Check the TikTok to MP3 status',
      },
      {
        h2: 'Will it be safe? How we handle your files',
        paras: [
          'Link tools on [MP3 Converter](/) fetch the video on our server, convert the audio and delete the file within 30 minutes. We plan for TikTok to MP3 to follow the same rule, with no account, no app and no pop-up ads. By contrast, when you upload a saved video to one of our file converters, nothing leaves your device at all, because the conversion runs in your browser.',
        ],
      },
      {
        h2: 'Questions people ask about TikTok audio',
        paras: [
          'Can you download a TikTok sound without the video? Once this tool launches, yes: it is built to return only the audio as an MP3. Until then, saving the video and converting it is the simplest route.',
          'Some people type Tik Tok, others just TT, yet they all want the same thing: a quick way to convert TikTok to MP3. That is exactly what this page is for, and the link-based TikTok MP3 downloader will appear here first.',
          'Another common question is whether a TikTok sound can be reused in your own videos elsewhere. That depends on who owns it. Your original sounds are yours, but popular songs belong to artists and labels, so check the licence before you reuse them on YouTube or Instagram.',
        ],
      },
      {
        h2: 'Respect creators and their sounds',
        paras: [
          'Please only download audio you created yourself or have permission to use. Most trending sounds belong to their creators or to record labels, and TikTok’s terms limit how content may be reused. MP3 Converter is not affiliated with, endorsed by or sponsored by TikTok or ByteDance.',
        ],
      },
    ],
    faqs: [
      { q: 'When will TikTok to MP3 be available?', a: 'We are testing it now and will launch it on this page as soon as it works reliably. There is no fixed date yet, so bookmark the page and check back.' },
      { q: 'Does the TikTok to MP3 converter work today?', a: 'Not yet. The box on this page is a preview, and it cannot convert links until the tool launches.' },
      { q: 'Can I convert a TikTok video I already downloaded?', a: 'Yes, today. Open our MP4 to MP3 converter, choose the saved video and download the MP3. It runs in your browser and keeps the file on your device.' },
      { q: 'What MP3 quality will it offer?', a: 'The plan is MP3 up to 320 kbps. For short TikTok sounds, 128 to 192 kbps already sounds clear.' },
      { q: 'Will it work on iPhone and Android?', a: 'Yes. Like all our tools, it will run in the browser on phones, tablets and computers, with no app to install.' },
      { q: 'Will I need an account?', a: 'No. None of our tools ask you to sign up, and TikTok to MP3 will be free as well.' },
      { q: 'Will a TikTok MP3 download include the watermark?', a: 'No. An MP3 file is audio only, so there is no picture and no on-screen watermark, just the sound itself.' },
      { q: 'Will a TikTok MP3 play on any MP3 player?', a: 'Yes. MP3 is the most widely supported audio format, so the files will play on phones, computers, car stereos and classic MP3 players.' },
      { q: 'Can I paste a TikTok link into the MP4 to MP3 tool?', a: 'No. Its Paste Link tab does not accept TikTok links yet and points you back to this page. Save the video to your device first and use the Upload tab instead.' },
      { q: 'Is it legal to download TikTok sounds?', a: 'It depends on who owns the sound and on the law where you live. Saving your own sounds is fine, while downloading copyrighted music without permission may break the law and TikTok’s terms.' },
    ],
    related: ['mp4-to-mp3', 'youtube-to-mp3', 'mp3-cutter', 'voice-to-mp3'],
  },

  // ------------------------------------------------------------------ Video
  {
    slug: 'video-to-mp3',
    nav: 'Video to MP3 Converter',
    kind: 'convert',
    tool: { heading: 'Upload a video file to extract the audio as MP3.', formats: videoFormats, buttonLabel: 'Choose Videos', showRecord: false },
    seoTitle: 'Video to MP3 Converter – Turn Any Video into Audio Free',
    metaTitle: 'Video to MP3 Converter – Turn Any Video into Audio Free',
    metaDescription:
      'Got a video but only need the sound? Convert MP4, MOV, AVI, MKV and more to MP3 in seconds — free, online, no sign-up needed.',
    h1: 'Video to MP3 Converter',
    lead: 'Our free video to MP3 converter extracts the sound from almost any video file and saves it as an MP3 at up to 320 kbps. Drop in MP4, MOV, MKV, WEBM, AVI or WMV files, even several at once, and download the audio without installing anything.',
    hub: {
      h2: 'Convert a specific video format to MP3',
      intro: 'Prefer a page for your exact format? These converters work the same way and add tips for each type of file.',
      items: [
        { slug: 'mp4-to-mp3', text: 'Extract the sound from MP4 videos from phones, cameras and downloads.' },
        { slug: 'mov-to-mp3', text: 'Get MP3 audio from iPhone and Mac MOV videos.' },
        { slug: 'webm-to-mp3', text: 'Convert WEBM videos and screen recordings from the web to MP3.' },
        { slug: 'mkv-to-mp3', text: 'Pull the audio track out of MKV movies and recordings.' },
      ],
    },
    intro: {
      h2: 'Extract audio from any video, right in your browser',
      paras: [
        'Videos come from many places: a phone camera, OBS, a Zoom call, a GoPro or an old camcorder. Each one may use a different container and codec. So instead of hunting for a separate tool for every format, you can drop all of them here and get the same result: a plain MP3 that every device understands.',
        'The converter first tries your browser’s own decoder, which is very fast. If the browser cannot read the file, it loads FFmpeg compiled to WebAssembly and extracts the sound locally instead. Finally, the LAME encoder writes the MP3. Your video never leaves your device, and the original file stays untouched.',
      ],
      image: { src: '/images/video-to-mp3-converter.svg', alt: 'Video to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-video-to-mp3.svg', alt: 'How to convert video to MP3', width: 960, height: 300 },
    howCta: 'Extract audio from video now',
    steps: [
      ['Pick the MP3 quality', 'Choose 128, 192, 256 or 320 kbps, and switch on Mono for talks. Set these first, because each file uses the settings active when you add it.'],
      ['Add your videos', 'Tap Choose Videos or drag files onto the box. You can mix MP4, MOV, MKV and other formats in one batch.'],
      ['Wait for the audio to be extracted', 'Each file shows its own progress bar. Rarer formats load the FFmpeg decoder the first time, which takes a few extra seconds.'],
      ['Download the MP3 files', 'Preview each track on the page, then tap Download, or use Download all for the whole batch.'],
    ],
    sections: [
      {
        h2: 'Supported video formats',
        paras: [
          'Thanks to the two decoders, the tool reads a wide range of files. If a video has a sound track, it can usually pull it out:',
        ],
        list: [
          ['MP4, M4V and MOV', 'Phones, GoPro cameras, QuickTime and most editing apps.'],
          ['MKV and WEBM', 'OBS recordings, screen captures and web video. See also our [MKV to MP3](/mkv-to-mp3) page.'],
          ['AVI, WMV and FLV', 'Older cameras, Windows Movie Maker projects and archived web clips.'],
          ['3GP, MPEG and TS', 'Early mobile phones, DVD-era files and camcorder or TV recordings.'],
        ],
      },
      {
        h2: 'Video vs MP3 file size: how much space you save',
        paras: [
          'Most of a video file is picture data. One minute of 1080p video often takes around 60 MB, and 720p about 20 MB. The MP3 keeps only the sound, so the same minute needs roughly 1.4 MB at 192 kbps and 1 MB at 128 kbps.',
          'As a result, a one-hour 1080p lecture of several gigabytes becomes an MP3 of under 90 MB at 192 kbps. That is small enough to send through most file-sharing apps or keep on a phone with little free space.',
        ],
        image: { src: '/images/video-to-mp3-vs-mp3-size.svg', alt: 'Video vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Which bitrate should you choose for video audio?',
        list: [
          ['320 kbps', 'Concert footage, music videos and anything with rich sound you want to keep.'],
          ['192 kbps', 'The default, and a safe pick for vlogs, films and mixed content.'],
          ['128 kbps with Mono', 'Lectures, meetings and interviews. Mono puts every bit into one clear voice channel.'],
          ['Even smaller files', 'Run the finished MP3 through our [MP3 Compressor](/mp3-compressor), which goes down to 32 kbps for speech.'],
        ],
      },
      {
        h2: 'Video to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'On an iPhone, open this page in Safari and tap Choose Videos. You can pick clips straight from Photo Library or from the Files app, and the MP3 saves to Files in the Downloads folder. On Android, Chrome offers your gallery and file manager, and the result goes to Downloads.',
          'Desktop users can drag videos from Finder on a Mac or File Explorer on Windows straight onto the box. Every modern browser works, including Safari, Chrome, Edge and Firefox. Since long 4K videos use a lot of memory while they are read, a computer handles them more smoothly than a phone.',
        ],
        image: { src: '/images/video-to-mp3-on-phone-and-computer.svg', alt: 'Video to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the video to MP3 converter',
      },
      {
        h2: 'Private by design: is it safe to extract audio online?',
        paras: [
          'Many online converters upload your video to a remote server, which is slow for large files and risky for private footage. [MP3 Converter](/) works differently. The whole job runs inside your browser tab, so your video is never uploaded, stored or seen by anyone else.',
        ],
        list: [
          ['No upload', 'Files stay on your device from start to finish.'],
          ['No sign-up or watermark', 'You get just your audio, free, every time.'],
          ['Nothing to install', 'No desktop software or browser extension is needed.'],
          ['Original untouched', 'The tool creates a new MP3 and never edits your video.'],
        ],
      },
      {
        h2: 'Common questions before you convert a video',
        paras: [
          'Is video to MP3 lossless? No, because MP3 is a compressed format. However, the sound in most videos is already compressed AAC or Opus, so 192 kbps or more keeps the difference hard to hear. If you need an uncompressed file for editing, keep the original video as well.',
          'What about surround sound? If a film has a 5.1 track, the converter mixes every channel down to stereo, so dialogue from the centre speaker is not lost. And if you only need one scene, convert the full video first and then trim it with our [MP3 Cutter](/mp3-cutter).',
        ],
      },
      {
        h2: 'Why a video might not convert',
        list: [
          ['No sound track', 'Silent screen recordings and some GIF-style clips have no audio, so there is nothing to extract.'],
          ['Copy protection', 'Movies and shows from streaming services use DRM, which no honest browser tool can read.'],
          ['Over 500 MB', 'Trim or split very large videos first, or export a shorter version.'],
          ['Damaged file', 'A recording that stopped mid-way may be unreadable. Try opening it in VLC to check.'],
        ],
      },
      {
        h2: 'Use extracted audio responsibly',
        paras: [
          'Extracting audio from your own videos is always fine. For films, music videos or clips made by others, make sure you have permission, or that the content is in the public domain or under a Creative Commons licence, before you share the MP3.',
        ],
      },
    ],
    faqs: [
      { q: 'Which video formats can I convert to MP3?', a: 'MP4, MOV, MKV, WEBM, AVI, WMV, FLV, 3GP, M4V, MPEG, TS and most other common formats. If a video has a sound track, the tool can usually extract it.' },
      { q: 'Is this video to MP3 converter free?', a: 'Yes. It is completely free, with no sign-up, no watermark and no cap on how many videos you convert.' },
      { q: 'Can I extract audio from video at 320 kbps?', a: 'Yes. Pick 320 kbps before adding your videos. It is the highest MP3 quality and works well for music and concerts.' },
      { q: 'Are my videos uploaded to a server?', a: 'No. The audio is extracted inside your browser, so your videos never leave your device.' },
      { q: 'Can I convert several videos at once?', a: 'Yes. Select or drag in a batch, even with mixed formats. They convert one after another, and Download all saves every MP3 together.' },
      { q: 'How do I extract audio from a video on iPhone?', a: 'Open this page in Safari, tap Choose Videos and pick a clip from Photo Library or Files. When it is done, tap Download and the MP3 is saved to Files in the Downloads folder.' },
      { q: 'Why did my video fail to convert?', a: 'The video may have no sound track, be damaged, or be copy protected (DRM) like films from streaming services. Files over 500 MB are also rejected.' },
      { q: 'Can I extract audio from a YouTube link?', a: 'This page converts video files on your device. For YouTube links, use our YouTube to MP3 converter, which also lets you cut a section.' },
      { q: 'Does converting change my original video?', a: 'No. Your video stays exactly as it was. The tool creates a separate MP3 file.' },
    ],
    related: ['mp4-to-mp3', 'mkv-to-mp3', 'webm-to-mp3', 'mov-to-mp3'],
  },

  // ------------------------------------------------------------------ WAV
  {
    slug: 'wav-to-mp3',
    nav: 'WAV to MP3 Converter',
    kind: 'convert',
    tool: { heading: 'Upload WAV files to convert to MP3.', formats: 'WAV, WAVE, AIFF', buttonLabel: 'Choose WAV Files', defaultBitrate: 320, showRecord: false },
    seoTitle: 'WAV to MP3 Converter – Free, Fast & High Quality',
    metaTitle: 'WAV to MP3 Converter – Free, Fast & High Quality',
    metaDescription:
      'Convert WAV files to MP3 online in seconds. Keep great sound quality at a fraction of the size — free, no sign-up, no software.',
    h1: 'WAV to MP3 & MP3 to WAV Converter',
    lead: 'Our free WAV to MP3 converter shrinks large WAV recordings into small MP3 files that still sound great. It starts at 320 kbps, handles whole batches at once and runs right in your browser, so your audio never leaves your computer or phone. Need the opposite? Switch to MP3 → WAV to turn MP3 files into uncompressed WAV for editing, CDs or DJ software.',
    intro: {
      h2: 'Why convert WAV to MP3, or MP3 to WAV?',
      paras: [
        'WAV stores sound without any compression. CD-quality WAV (16-bit, 44.1 kHz stereo) runs at about 1,411 kbps, which works out to roughly 10 MB for every minute. That is ideal for recording and editing. However, it is far too heavy for email, messaging apps or a phone that is short on space.',
        'An MP3 at 320 kbps needs about 2.4 MB per minute, and at 192 kbps only 1.4 MB. So converting WAV to MP3 usually cuts the size by 75 to 90 percent, while most listeners hear no difference on everyday speakers and headphones. The tool also accepts AIFF, the uncompressed format many Mac apps use. Meanwhile, the same page works as an MP3 converter to WAV whenever an app or device insists on WAV files.',
      ],
      image: { src: '/images/wav-to-mp3-converter.svg', alt: 'WAV to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-wav-to-mp3.svg', alt: 'How to convert WAV to MP3', width: 960, height: 300 },
    howCta: 'Convert WAV to MP3 now',
    steps: [
      ['Pick a direction and quality', 'Leave WAV → MP3 selected to shrink files, or tap MP3 → WAV to go the other way. For MP3 output the page starts at 320 kbps; change it before you add files if you want something smaller.'],
      ['Add your files', 'Tap the button or drag a batch onto the box. Any .wav file works, whether it comes from Audacity, GarageBand, Logic Pro or a field recorder.'],
      ['Let it convert', 'Files are encoded one after another inside your browser, each with its own progress bar.'],
      ['Download the MP3s', 'Each MP3 keeps the original file name. Tap Download, or Download all when you converted several.'],
    ],
    sections: [
      {
        h2: 'WAV vs MP3 file size at a glance',
        paras: [
          'Here is what one minute of stereo audio takes in each format. As you can see, even the best MP3 setting is about four times smaller than the WAV.',
          'In practice, a 4-minute song drops from about 40 MB to under 10 MB at 320 kbps. Likewise, a 30-minute interview recorded as WAV shrinks from roughly 300 MB to about 29 MB at 128 kbps.',
        ],
        image: { src: '/images/wav-to-mp3-vs-mp3-size.svg', alt: 'WAV vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Which bitrate is right for your WAV?',
        list: [
          ['320 kbps', 'Finished songs, mixes and masters you want to share at the best MP3 quality.'],
          ['256 kbps', 'Nearly the same sound in a slightly smaller file, good for playlists.'],
          ['192 kbps', 'Demos and rough mixes you send to bandmates or clients.'],
          ['128 kbps with Mono', 'Voice recordings, interviews and dictation from a field recorder such as a Zoom H1n.'],
        ],
      },
      {
        h2: 'Is WAV to MP3 lossless?',
        paras: [
          'No. WAV is lossless, while MP3 is a lossy format that removes sounds most people cannot hear. At 256 or 320 kbps, the difference is very hard to notice on most speakers. Still, every MP3 conversion throws a little detail away, so it is a one-way trip.',
          'For that reason, treat the WAV as your master and the MP3 as the copy you share. If you need to edit, remaster or make another format later, start again from the WAV. And if you also keep lossless FLAC files, our [FLAC to MP3](/flac-to-mp3) converter works exactly the same way.',
        ],
      },
      {
        h2: 'Converting 24-bit, 32-bit and 48 kHz WAV files',
        paras: [
          'Recordings from a DAW or a video camera are often 24-bit or 32-bit float at 48 kHz or higher. The converter reads these too: your browser decodes most of them, and FFmpeg in WebAssembly steps in for the rest. Every MP3 is then created at 44.1 kHz, the standard rate for MP3 music.',
          'Multichannel WAV files, such as 5.1 film mixes, are mixed down to stereo, so no channel is simply dropped. Meanwhile, a 500 MB limit per file applies, which equals roughly 50 minutes of CD-quality stereo WAV.',
        ],
      },
      {
        h2: 'WAV to MP3 on Mac, Windows, iPhone and Android',
        paras: [
          'On a Mac or Windows PC, drag WAV files from Finder or File Explorer onto the box, and the MP3 files land in your Downloads folder. This is the quickest route for exports from GarageBand, Logic Pro, Audacity or any other audio editor.',
          'On an iPhone, open this page in Safari, tap Choose WAV Files and pick recordings from the Files app; most recorder apps can share a WAV to Files first. On Android, Chrome opens your file manager, and finished files go to Downloads. In both cases, there is nothing to install.',
        ],
        image: { src: '/images/wav-to-mp3-on-phone-and-computer.svg', alt: 'WAV to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the WAV to MP3 converter',
      },
      {
        h2: 'Safe, private WAV conversion',
        paras: [
          'Unreleased songs and private interviews deserve care. That is why [MP3 Converter](/) encodes your WAV files inside the browser with the LAME MP3 encoder, and nothing is uploaded to a server. As a bonus, conversion is quick even for big files, because there is no upload to wait for.',
        ],
        list: [
          ['Nothing leaves your device', 'Your recordings are read and encoded locally.'],
          ['Free with no catch', 'There is no sign-up, no watermark and no daily cap.'],
          ['No software', 'It works in Safari, Chrome, Edge and Firefox.'],
        ],
      },
      {
        h2: 'When musicians and podcasters convert WAV to MP3',
        list: [
          ['Sharing demos', 'Send a mix to bandmates by email or chat without hitting attachment limits.'],
          ['Podcast episodes', 'MP3 plays in every podcast app, so convert the final WAV export before you publish.'],
          ['Sample previews', 'Make lightweight preview versions of WAV samples and loops.'],
          ['Combining takes', 'Join several MP3 files into one track with our [Audio Joiner](/audio-joiner).'],
        ],
      },
    ],
    faqs: [
      { q: 'Does converting WAV to MP3 lose quality?', a: 'Yes, a little, because MP3 is lossy. At 256 or 320 kbps the difference is very hard to hear for most people on most speakers.' },
      { q: 'What is the best bitrate for WAV to MP3?', a: '320 kbps for music, which is why the page starts there. For speech, 128 kbps with Mono turned on is plenty.' },
      { q: 'How much smaller is an MP3 than a WAV?', a: 'About 4 times smaller at 320 kbps and about 10 times smaller at 128 kbps. One minute of CD-quality WAV is roughly 10 MB.' },
      { q: 'Can I convert 24-bit or 32-bit WAV files?', a: 'Yes. High-resolution WAV files are supported. The MP3 is created at 44.1 kHz, the standard rate for MP3 music.' },
      { q: 'How many WAV files can I convert at once?', a: 'There is no fixed limit. Files are processed one after another to keep your device responsive.' },
      { q: 'Is there a size limit?', a: 'Each file can be up to 500 MB, which is roughly 50 minutes of CD-quality stereo WAV.' },
      { q: 'Are my WAV files uploaded?', a: 'No. Everything happens inside your browser, so your recordings never leave your device.' },
      { q: 'Can I convert MP3 to WAV on this page?', a: 'Yes. Tap the MP3 → WAV tab above the converter, choose 44.1 or 48 kHz and add your MP3 files. Each one is saved as a 16-bit PCM WAV file.' },
      { q: 'Can I convert AIFF files here too?', a: 'Yes. AIFF works the same way as WAV, since both are uncompressed formats.' },
      { q: 'Can I convert WAV to MP3 on iPhone?', a: 'Yes. Save the WAV to the Files app, open this page in Safari, tap Choose WAV Files and pick it. The MP3 is saved to Files in the Downloads folder.' },
    ],
    related: ['flac-to-mp3', 'mp3-compressor', 'audio-joiner', 'm4a-to-mp3'],
  },

  // ------------------------------------------------------------------ M4A
  {
    slug: 'm4a-to-mp3',
    nav: 'M4A to MP3 Converter',
    kind: 'convert',
    tool: { heading: 'Upload M4A files to convert to MP3.', formats: 'M4A, AAC, M4B, ALAC', buttonLabel: 'Choose M4A Files', showRecord: false },
    seoTitle: 'M4A to MP3 Converter – Make Apple Audio Play Anywhere',
    metaTitle: 'M4A to MP3 Converter – Make Apple Audio Play Anywhere',
    metaDescription:
      'Free your music from Apple formats. Convert M4A files from iTunes, GarageBand or Voice Memos to MP3 that works everywhere.',
    h1: 'M4A to MP3 Converter',
    lead: 'Our free M4A to MP3 converter turns iPhone voice memos, iTunes tracks and other M4A files into MP3s that open on any device. Pick a quality up to 320 kbps, convert a whole batch at once and download the results, all inside your browser.',
    intro: {
      h2: 'What is an M4A file, and why convert it?',
      paras: [
        'M4A is audio stored in an MPEG-4 container. Apple uses it for Voice Memos, GarageBand exports and music bought from the iTunes Store. Inside, the sound is usually AAC, or sometimes Apple Lossless (ALAC). The format sounds good and stays small.',
        'Still, some websites, older car stereos, MP3 players and upload forms refuse M4A files. Converting M4A to MP3 removes that problem in seconds. Because the work happens in your browser, private recordings such as meeting notes or lectures stay on your device.',
      ],
      image: { src: '/images/m4a-to-mp3-converter.svg', alt: 'M4A to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-m4a-to-mp3.svg', alt: 'How to convert M4A to MP3', width: 960, height: 300 },
    howCta: 'Convert M4A to MP3 now',
    steps: [
      ['Choose the quality first', '128 kbps with Mono is ideal for voice memos, while 192 to 256 kbps suits music. The settings apply to the files you add next.'],
      ['Select your M4A files', 'Tap Choose M4A Files or drag them in. On iPhone, save the memo to Files first, then pick it here.'],
      ['Watch it convert', 'A progress bar shows each file as it is read and encoded to MP3.'],
      ['Download and share', 'Preview the MP3, tap Download, then send it by email or WhatsApp or upload it wherever MP3 is required.'],
    ],
    sections: [
      {
        h2: 'How to convert iPhone Voice Memos to MP3',
        paras: [
          'Voice Memos saves every recording as an M4A file. To convert one, open the Voice Memos app, tap the memo, tap the More button (three dots), choose Share and then Save to Files. Next, open this page in Safari, tap Choose M4A Files and pick the memo. The MP3 appears in the Files app under Downloads.',
          'On a Mac, drag the memo from the Voice Memos app to your desktop, then drop the M4A file onto the box on this page. The MP3 lands in your Downloads folder a few seconds later.',
        ],
      },
      {
        h2: 'M4A vs MP3: size and quality compared',
        paras: [
          'AAC inside M4A is a little more efficient than MP3, so a 256 kbps M4A from the iTunes Store takes about 1.9 MB per minute. Converting it to MP3 at 320 kbps makes the file slightly larger, at around 2.4 MB, but keeps the sound as close to the original as MP3 allows.',
          'For voice memos the picture is different. They hold speech only, so 128 kbps with Mono is clear and needs about 1 MB per minute. If you have raw .aac files rather than M4A, our [AAC to MP3](/aac-to-mp3) converter handles them too.',
        ],
        image: { src: '/images/m4a-to-mp3-vs-mp3-size.svg', alt: 'M4A vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Best MP3 settings for each kind of M4A',
        list: [
          ['Voice Memos and lectures', '128 kbps with Mono switched on.'],
          ['iTunes Store purchases', '256 or 320 kbps in stereo to keep the music crisp.'],
          ['Apple Lossless (ALAC) files', '320 kbps, the best MP3 quality, since the source is lossless. See also our [ALAC to MP3](/alac-to-mp3) page.'],
          ['M4B audiobooks', 'Use our [M4B to MP3](/m4b-to-mp3) tool, which offers low bitrates made for long books.'],
        ],
      },
      {
        h2: 'M4A to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'This converter runs online in any modern browser, so there is nothing to install. iPhone users open it in Safari and pick files from the Files app, and finished MP3s go to Files, inside Downloads. On Android, many recorder apps, including Samsung Voice Recorder, save M4A files, and Chrome stores the MP3s in Downloads.',
          'On Windows, the Sound Recorder app saves M4A by default, so this is a quick way to make those recordings play in older software. Mac users, meanwhile, can drag files straight from Finder onto the box.',
        ],
        image: { src: '/images/m4a-to-mp3-on-phone-and-computer.svg', alt: 'M4A to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the M4A to MP3 converter',
      },
      {
        h2: 'Private and safe: your memos stay on your device',
        paras: [
          'Voice memos often hold personal notes, interviews or meetings. For that reason, [MP3 Converter](/) never uploads them. Your browser decodes the M4A, and the LAME encoder writes the MP3 locally, so nothing is sent to a server or stored anywhere else.',
        ],
        list: [
          ['No account needed', 'Convert without an email address or password.'],
          ['No watermark', 'The MP3 holds only your audio.'],
          ['No app to install', 'Everything runs on this page in Safari, Chrome, Edge or Firefox.'],
        ],
      },
      {
        h2: 'Is M4A better than MP3?',
        paras: [
          'At the same bitrate, AAC in an M4A usually sounds a little better than MP3. However, at 192 kbps and above, both sound excellent, and MP3 plays on far more devices, from car stereos to smart speakers. So the answer depends on where the file has to play.',
          'Converting M4A to MP3 is not lossless, since both formats are lossy. To keep the loss tiny, choose a bitrate at or above the source. Converting the other way is rarely needed, because Apple devices play MP3 without any trouble.',
        ],
      },
      {
        h2: 'A note on protected iTunes and Apple Music files',
        paras: [
          'Songs bought from iTunes before 2009 may use the M4P format with copy protection (DRM), and Apple Music downloads are protected too. No honest browser tool can convert those files. However, music bought from the iTunes Store since then, and your own recordings, convert normally.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I convert an iPhone voice memo to MP3?', a: 'In Voice Memos, tap the memo, tap the More button, choose Share and then Save to Files. Open this page in Safari, tap Choose M4A Files, pick the memo and tap Download when it is ready.' },
      { q: 'Is this M4A to MP3 converter free?', a: 'Yes. It is free with no sign-up, no watermark and no cap on the number of files.' },
      { q: 'Can I convert M4A to MP3 at 320 kbps?', a: 'Yes. Choose 320 kbps before adding files. It is the best choice for music and for Apple Lossless sources.' },
      { q: 'Does converting M4A to MP3 lose quality?', a: 'A little, because MP3 is lossy. At 192 kbps or higher, most people cannot hear a difference from a typical AAC source.' },
      { q: 'Can I convert Apple Lossless (ALAC) M4A?', a: 'Yes. Lossless M4A files convert just like normal ones. Choose 320 kbps to keep as much quality as possible.' },
      { q: 'Can I convert M4B audiobooks?', a: 'Yes, as long as they are not copy protected. Our M4B to MP3 page is the better choice, since it offers bitrates as low as 32 kbps for long books.' },
      { q: 'Can I convert many M4A files at once?', a: 'Yes. Select several files together. They convert one by one, and Download all saves them in one go.' },
      { q: 'Are my files uploaded anywhere?', a: 'No. Conversion happens inside your browser, so your M4A files never leave your device.' },
      { q: 'Why won’t my M4A file convert?', a: 'It is most likely copy protected, such as an old M4P iTunes purchase or an Apple Music download, or the file is damaged.' },
    ],
    related: ['aac-to-mp3', 'voice-to-mp3', 'mp4-to-mp3', 'mp3-compressor'],
  },

  // ------------------------------------------------------------------ Voice
  {
    slug: 'voice-to-mp3',
    nav: 'Voice Recorder to MP3',
    kind: 'convert',
    tool: { initialMode: 'record', defaultBitrate: 128, defaultMono: true },
    seoTitle: 'Voice to MP3 – Free Online Voice Recorder to MP3',
    metaTitle: 'Voice to MP3 – Free Online Voice Recorder to MP3',
    metaDescription:
      'Record voice to MP3 online for free. No app and no sign-up: use any mic on iPhone, Android, Mac or PC, then download your MP3. The audio stays on your device.',
    h1: 'Online Voice Recorder to MP3',
    lead: 'Our free voice to MP3 recorder captures your voice with any microphone and saves it as an MP3 in one click. There is no app to install and no account to create, and the recording never leaves your device.',
    intro: {
      h2: 'Record your voice and save it as MP3, right in the browser',
      paras: [
        'Sometimes you just need a quick recording: a voice message, a podcast intro, a song idea, pronunciation practice or a spoken note for a colleague. This online voice recorder does that without any download. Press Start Recording, allow the microphone and talk, while a timer shows how long you have been going.',
        'When you press Stop & Convert, the LAME encoder on this page turns the audio into an MP3 within seconds. It is set to 128 kbps mono by default, which suits speech perfectly. You can listen back before you download, and each file is named with the date and time, so recordings never overwrite each other.',
      ],
      image: { src: '/images/voice-to-mp3-converter.svg', alt: 'Online voice recorder to MP3', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-voice-to-mp3.svg', alt: 'How to record your voice as MP3', width: 960, height: 300 },
    howCta: 'Start recording your voice',
    steps: [
      ['Press Start Recording', 'The Record tab is open by default. Your browser asks for microphone access the first time, so tap Allow.'],
      ['Speak, sing or play', 'A red dot and a timer show that recording is live. Keep the mic close and the room quiet for clear sound.'],
      ['Press Stop & Convert', 'The recording turns into an MP3 automatically. To change the quality, pick a bitrate or switch off Mono before you press Stop.'],
      ['Listen and download', 'Play the MP3 on the page, then tap Download to save it or share it right away.'],
    ],
    sections: [
      {
        h2: 'MP3 bitrate and file size for voice recordings',
        paras: [
          'MP3 size depends on bitrate and length, not on what you say. At the default 128 kbps, every minute takes about 1 MB, so a 10-minute talk is roughly 10 MB. At 320 kbps, the highest setting, the same minute needs about 2.4 MB, which is more than speech ever needs.',
          'Mono does not shrink the file at the same bitrate. Instead, it spends all those bits on a single channel, which keeps a voice clean. For even smaller files, record at 128 kbps and then run the MP3 through our [MP3 Compressor](/mp3-compressor), which offers lower bitrates made for speech.',
        ],
        image: { src: '/images/voice-to-mp3-vs-mp3-size.svg', alt: 'MP3 bitrate for voice recordings', width: 960, height: 330 },
      },
      {
        h2: 'Tips for a clearer recording',
        list: [
          ['Pick a quiet room', 'Soft furniture and curtains reduce echo far better than any software filter.'],
          ['Stay close to the mic', 'About a hand’s width away from a headset or laptop mic works well.'],
          ['Let the browser help', 'The recorder asks your browser for echo cancellation and noise suppression, which tames fan hum and room echo.'],
          ['Do a test first', 'Record five seconds, play it back, and adjust your distance or volume before the real take.'],
        ],
      },
      {
        h2: 'Record voice to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'On an iPhone or iPad, open this page in Safari, tap Start Recording and allow the microphone. When you download, the MP3 goes to the Files app in the Downloads folder, ready to share in Messages, WhatsApp or Mail. On Android, Chrome asks for mic access in the same way, and the file lands in Downloads.',
          'On a Mac or Windows PC, you can use the built-in microphone, a USB mic or a headset. If the browser picks the wrong one, change the input in your system sound settings or in the browser’s site settings, then reload the page. Chrome, Edge, Firefox and Safari all support recording.',
        ],
        image: { src: '/images/voice-to-mp3-on-phone-and-computer.svg', alt: 'Online voice recorder on phone and computer', width: 960, height: 340 },
        cta: 'Try the online voice recorder',
      },
      {
        h2: 'Is this online voice recorder private?',
        paras: [
          'Yes. The microphone stream goes straight from your device into this page, where [MP3 Converter](/) encodes it locally. Nothing is uploaded, so no server ever hears or stores your voice. In addition, the microphone is released as soon as you press Stop.',
        ],
        list: [
          ['No sign-up', 'Record and download without an email address or password.'],
          ['No app', 'Everything runs in the browser you already have.'],
          ['You stay in control', 'You can revoke microphone permission at any time in your browser settings.'],
        ],
      },
      {
        h2: 'What people record with a voice to MP3 tool',
        list: [
          ['Voice messages', 'Record a note and attach the MP3 to an email or chat.'],
          ['Podcast intros and voice-overs', 'Capture a quick take, then cut it to length with our [MP3 Cutter](/mp3-cutter).'],
          ['Song ideas', 'Hum a melody or sing a verse before you forget it.'],
          ['Language practice', 'Record yourself reading aloud and compare it with a native speaker.'],
          ['Spoken homework', 'Many teachers accept oral tasks as an MP3 file.'],
        ],
      },
      {
        h2: 'Already recorded? Convert voice notes to MP3',
        paras: [
          'Switch to the Upload tab to convert recordings you already have. For example, iPhone Voice Memos are M4A files, which our [M4A to MP3](/m4a-to-mp3) converter also handles, and WhatsApp voice notes are OPUS files. Drop them here and they become MP3s with the same quality settings.',
          'Need to stitch several takes together? Record each part, download the MP3s and merge them with the Audio Joiner. This is often easier than trying to get a long recording perfect in one go.',
        ],
      },
      {
        h2: 'Common questions about recording voice online',
        paras: [
          'How long can you record? There is no fixed limit. However, the audio is held in memory until you stop, so for sessions over an hour a computer is more reliable than a phone.',
          'Can you record system audio or a call? No. The recorder only uses your microphone. To save the sound of a video file, use one of our video converters instead.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this voice recorder free?', a: 'Yes. Record and download as many MP3s as you like, with no sign-up and no watermark.' },
      { q: 'Is there a time limit for recording?', a: 'There is no fixed limit. For very long sessions (over an hour), a computer is more reliable than a phone because it has more free memory.' },
      { q: 'Why does my browser ask for microphone access?', a: 'Browsers always ask before a website can use the microphone. The audio is only used on this page to create your MP3 and is never sent anywhere.' },
      { q: 'Does it work on iPhone?', a: 'Yes. Use Safari on a recent version of iOS. Tap Start Recording, allow the microphone and tap Stop & Convert when you finish. The MP3 is saved to the Files app.' },
      { q: 'What MP3 quality does the recorder use?', a: '128 kbps mono by default, which is ideal for speech. You can choose 192, 256 or 320 kbps, or switch to stereo, before pressing Stop.' },
      { q: 'Can I trim the start and end of my recording?', a: 'Yes. Download the MP3, then open the MP3 Cutter to remove silence or mistakes at the start and end.' },
      { q: 'Why is my recording silent or very quiet?', a: 'The browser may be using the wrong microphone, or the mic is muted in your system settings. Check the input device, allow access for this site and try a short test.' },
      { q: 'Is my voice uploaded to a server?', a: 'No. The recording and the MP3 conversion both happen inside your browser, so your audio never leaves your device.' },
      { q: 'Can I record on a computer without an app?', a: 'Yes. Open this page in Chrome, Edge, Firefox or Safari on Windows or Mac and use the built-in microphone or a USB mic.' },
    ],
    related: ['mp3-cutter', 'transcribe-audio-to-text', 'm4a-to-mp3', 'podcast-to-mp3'],
  },

  // ------------------------------------------------------------------ FLAC
  {
    slug: 'flac-to-mp3',
    nav: 'FLAC to MP3',
    kind: 'convert',
    tool: { heading: 'Upload FLAC files to convert to MP3.', formats: 'FLAC, ALAC, WAV', buttonLabel: 'Choose FLAC Files', defaultBitrate: 320, showRecord: false },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'Convert FLAC to MP3 or MP3 to FLAC in One Click',
    metaTitle: 'Convert FLAC to MP3 or MP3 to FLAC in One Click',
    metaDescription:
      'Upload, pick your format, download. A simple way to switch between FLAC and MP3 on Windows, Mac, iPhone or Android. Free.',
    h1: 'FLAC to MP3 & MP3 to FLAC Converter',
    lead: 'Our free FLAC to MP3 converter turns lossless FLAC tracks into 320 kbps MP3 files that play in any car, phone or music app. Add one song or a whole album, and everything converts right in your browser, so your music never leaves your device. Need the opposite? One tap switches the tool to MP3 to FLAC.',
    intro: {
      h2: 'A free online FLAC converter for everyday listening',
      paras: [
        'FLAC (Free Lossless Audio Codec) keeps every detail of the original recording, which is why music fans rip CDs and buy hi-res downloads in it. The catch is size and support. A CD-quality album in FLAC usually takes 200 to 400 MB, and many car stereos, older MP3 players and the Apple Music app on Mac and Windows will not play it at all. As a result, a FLAC library is great at home but awkward on the road.',
        'Converting FLAC to MP3 solves both problems. You get a copy that is roughly half to a quarter of the size and plays almost anywhere, while your FLAC files stay safe as your lossless archive. In addition, because FLAC is a perfect source, the MP3 you create here is as good as an MP3 can be. And if an app or upload form insists on FLAC, the same page also converts MP3 to FLAC.',
      ],
      image: { src: '/images/flac-to-mp3-converter.svg', alt: 'FLAC to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-flac-to-mp3.svg', alt: 'How to convert FLAC to MP3', width: 960, height: 300 },
    howCta: 'Convert FLAC to MP3 now',
    steps: [
      ['Pick the direction', 'Keep the FLAC → MP3 tab selected above the box. Tap MP3 → FLAC only when you need the reverse conversion.'],
      ['Check the MP3 quality', 'The page starts at 320 kbps, the best match for a lossless source. Change the quality or turn on Mono before you add files, because each file keeps the settings it was added with.'],
      ['Add your FLAC files', 'Tap Choose FLAC Files or drag the tracks onto the box. You can select a whole album at once, and the tracks convert one after another.'],
      ['Download your MP3s', 'Listen in the small player if you like, then tap Download next to a track. When two or more are ready, Download all saves the whole batch.'],
    ],
    sections: [
      {
        h2: 'FLAC vs MP3: file size and sound quality',
        paras: [
          'The biggest difference between the two formats is how much space they need. FLAC compresses audio without throwing anything away, so it lands at about half the size of a WAV file. MP3, by contrast, removes sounds that most people cannot hear and shrinks the file much further.',
        ],
        list: [
          ['FLAC (CD quality)', 'Lossless, about 5 to 6 MB per minute, so a four-minute song is often 20 to 30 MB.'],
          ['MP3 320 kbps', 'About 2.4 MB per minute, or roughly 10 MB per song. Very hard to tell apart from FLAC on normal gear.'],
          ['MP3 192 kbps', 'About 1.4 MB per minute. Still very good, and great for phones that are short on storage.'],
          ['MP3 128 kbps', 'About 1 MB per minute. Fine for background music, but you may hear a little less sparkle in cymbals.'],
        ],
        image: { src: '/images/flac-to-mp3-vs-mp3-size.svg', alt: 'FLAC vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Is FLAC to MP3 conversion lossless?',
        paras: [
          'No, and it is worth knowing why. MP3 is a lossy format, so some data is always removed when you convert FLAC to MP3. However, at 320 kbps the removed parts are sounds that are very hard to hear. In blind listening tests, most people cannot pick the MP3 from the FLAC on everyday headphones, phone speakers or a car system.',
          'For that reason, treat the MP3 as your listening copy and the FLAC as your master. If you ever need AAC, OGG or a lower bitrate later, convert again from the FLAC rather than from the MP3. That way, each new copy starts from a perfect source instead of stacking one round of loss on top of another.',
        ],
      },
      {
        h2: 'Hi-res FLAC, ALAC and whole albums',
        paras: [
          'The converter reads standard 16-bit FLAC as well as hi-res 24-bit files at 96 or 192 kHz. Every MP3 it creates uses 44.1 kHz, the CD sample rate that MP3 players and car stereos expect. So a hi-res album comes out as a normal, widely compatible MP3 set.',
          'Apple Lossless files (ALAC, usually ending in .m4a) and WAV files work here too, although our [ALAC to MP3](/alac-to-mp3) and [WAV to MP3](/wav-to-mp3) pages explain those formats in more detail. Meanwhile, batch conversion has no file count limit. Each file can be up to 500 MB, which covers even long hi-res live recordings.',
        ],
      },
      {
        h2: 'Song titles, tags and cover art',
        paras: [
          'The converter focuses on the sound itself. Song titles, artist names and cover art stored inside the FLAC are not copied into the new MP3, and each file keeps its original file name with an .mp3 ending. So, if your FLAC files are named like “01 - Artist - Title.flac”, your MP3s will be easy to sort.',
          'To add tags afterwards, use a free tag editor. Mp3tag (Windows and Mac) and MusicBrainz Picard (Windows, Mac and Linux) can fill in titles and album art in a few clicks, often by looking up the album online.',
        ],
      },
      {
        h2: 'Convert FLAC to MP3 on iPhone, Android, Mac or Windows',
        paras: [
          'There is no app to install, because the converter runs in your web browser. On a Windows PC or a Mac, open this page in Chrome, Edge, Firefox or Safari, select your FLAC files and the MP3s land in your Downloads folder. That makes it a simple way to convert FLAC to MP3 without software such as foobar2000 or Audacity.',
          'On Android, tap Choose FLAC Files and pick the tracks from your Music or Download folder; the MP3s are saved to Downloads. On an iPhone or iPad, open the page in Safari and pick the FLAC files from the Files app. Each MP3 then appears in Files, inside the Downloads folder, ready to play or share. Very large albums convert faster on a computer, because phones have less memory and power.',
        ],
        image: { src: '/images/flac-to-mp3-on-phone-and-computer.svg', alt: 'FLAC to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the FLAC to MP3 converter',
      },
      {
        h2: 'Why people convert FLAC files to MP3',
        paras: [
          'FLAC is ideal for a home archive. Day to day, though, an MP3 copy is simply easier to live with. These are the most common reasons people make one:',
        ],
        list: [
          ['Car stereos and USB sticks', 'Many head units only read MP3 from a USB stick. Copy the converted album into a folder and it plays like any other track.'],
          ['Apple Music and iTunes', 'The Music app on Mac and iTunes on Windows do not import FLAC. MP3 files go straight into your library.'],
          ['Phones with little storage', 'A 320 kbps MP3 album takes far less room than the FLAC version, so you can carry much more music offline. For even smaller files, run them through our [MP3 Compressor](/mp3-compressor).'],
          ['Sharing a song', 'An MP3 is small enough to send in a chat or email, and the person you send it to can open it on any device.'],
        ],
      },
      {
        h2: 'Is this FLAC to MP3 converter safe?',
        paras: [
          'Yes. Your music is converted inside your own browser with the Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. As a result, your FLAC files are never uploaded to a server, and nobody else can see what you convert.',
          'Beyond that, [MP3 Converter](/) is free, needs no account or email and adds no watermark or jingle to your files. There are no installers, browser extensions or pop-up download buttons to worry about. Finally, the finished MP3s only exist on your device until you save them, and they disappear from the page when you close the tab.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this FLAC to MP3 converter free?', a: 'Yes. You can convert as many FLAC files to MP3 as you like for free, with no sign-up, no watermark and no software to install.' },
      { q: 'Is 320 kbps MP3 as good as FLAC?', a: 'Technically no, because MP3 removes some data. In practice, however, most people cannot hear a difference between a 320 kbps MP3 and FLAC on normal headphones, phone speakers or car systems.' },
      { q: 'Can I convert hi-res 24-bit FLAC to MP3?', a: 'Yes. The tool reads hi-res FLAC, such as 24-bit at 96 or 192 kHz, and creates a standard 44.1 kHz MP3 that plays on any device.' },
      { q: 'Can I batch convert a whole FLAC album?', a: 'Yes. Select all the tracks at once. They convert one after another, and Download all saves every MP3 when the batch is done. Each file can be up to 500 MB.' },
      { q: 'Are my FLAC files uploaded to a server?', a: 'No. The conversion happens entirely in your browser, so your music stays on your phone or computer the whole time.' },
      { q: 'Will the MP3 keep the song title and album art?', a: 'No. Only the audio is converted. You can add titles, artist names and cover art afterwards with a free tag editor such as Mp3tag or MusicBrainz Picard.' },
      { q: 'How do I convert FLAC to MP3 on iPhone?', a: 'Open this page in Safari, tap Choose FLAC Files and pick the tracks from the Files app. When they are done, tap Download and the MP3s are saved to Files in the Downloads folder.' },
      { q: 'Should I delete my FLAC files after converting?', a: 'We suggest you keep them. FLAC is your lossless master, so you can always create a new MP3, AAC or other copy from it later without extra quality loss.' },
      { q: 'Which bitrate should I choose for FLAC to MP3?', a: '320 kbps gives the best sound and is the default here. Choose 256 or 192 kbps if you want smaller files for a phone, and 128 kbps only for background listening.' },
    ],
    related: ['wav-to-mp3', 'aac-to-mp3', 'ogg-to-mp3', 'mp3-compressor'],
  },

  // ------------------------------------------------------------------ AAC
  {
    slug: 'aac-to-mp3',
    nav: 'AAC to MP3',
    kind: 'convert',
    tool: { heading: 'Upload AAC files to convert to MP3.', formats: 'AAC, M4A, ADTS', buttonLabel: 'Choose AAC Files', showRecord: false },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'AAC to MP3 in One Click – No Software, No Sign-Up',
    metaTitle: 'AAC to MP3 in One Click – No Software, No Sign-Up',
    metaDescription:
      'Drop in your AAC file, press convert, download your MP3. Works on Windows, Mac, Android and iPhone — completely free to use.',
    h1: 'AAC to MP3 & MP3 to AAC Converter',
    lead: 'Our free AAC to MP3 converter turns .aac and .m4a audio into MP3 files that play on every car stereo, media player and app. Pick a bitrate up to 320 kbps, add one file or a whole folder, and the conversion runs privately in your browser. It also works the other way, from MP3 to AAC.',
    intro: {
      h2: 'Why convert AAC audio to MP3?',
      paras: [
        'AAC (Advanced Audio Coding) was designed as the successor to MP3, and it sounds great at modest bitrates. That is why Apple uses it for iTunes Store music, YouTube uses it for much of its audio, and many voice recorders, radio streams and Android apps save to it. You will usually see it as an .m4a file, or as a raw .aac file from recorders and streams.',
        'However, “newer” does not always mean “supported”. Plenty of car stereos, older MP3 players, website upload forms and audio editors still expect MP3. Converting AAC to MP3 gives you one file type that simply works everywhere. Meanwhile, if you want smaller files for an iPhone or Apple Music library, the MP3 to AAC tab does the reverse.',
      ],
      image: { src: '/images/aac-to-mp3-converter.svg', alt: 'AAC to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-aac-to-mp3.svg', alt: 'How to convert AAC to MP3', width: 960, height: 300 },
    howCta: 'Convert AAC to MP3 now',
    steps: [
      ['Choose the direction', 'Leave the AAC → MP3 tab selected. If you want to go the other way, tap MP3 → AAC instead.'],
      ['Set the MP3 quality', '192 kbps is the default and suits most AAC files. Pick 256 or 320 kbps for high-quality music, and set this before adding files, since each file keeps the settings it was added with.'],
      ['Add your AAC or M4A files', 'Tap Choose AAC Files or drag files onto the box. Add as many as you like; they convert one after another.'],
      ['Save the MP3 files', 'Preview a file in the little player, then tap Download. With two or more finished, use Download all to grab them in one go.'],
    ],
    sections: [
      {
        h2: 'Which MP3 bitrate matches your AAC file?',
        paras: [
          'AAC is a little more efficient than MP3. In other words, an AAC file needs fewer kilobits per second to sound just as good. So when you convert AAC to MP3, choose an MP3 bitrate at or a step above the source to keep the sound close to the original.',
        ],
        list: [
          ['AAC at 96 to 128 kbps', 'Choose 192 kbps MP3. This covers most YouTube audio, voice recordings and podcasts.'],
          ['AAC at 256 kbps', 'Choose 256 or 320 kbps MP3. iTunes Store purchases (iTunes Plus) use this bitrate.'],
          ['Speech and voice memos', '128 kbps with Mono turned on keeps a single voice clear and the file small.'],
          ['Not sure about the source?', 'Pick 192 kbps. It is a safe middle ground for both music and speech.'],
        ],
        image: { src: '/images/aac-to-mp3-vs-mp3-size.svg', alt: 'AAC vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'AAC, M4A and .aac files explained',
        paras: [
          'People often mix these names up, and that is understandable. AAC is the codec, which means the method used to compress the sound. M4A is a container, a kind of wrapper, that usually holds AAC audio along with tags such as the song title. A plain .aac file (also called ADTS) is AAC audio with no wrapper at all, typical for recorders, radio streams and some phone apps.',
          'This page accepts all three. In addition, M4A files can also hold Apple Lossless audio, and those convert here as well. If most of your files end in .m4a, our [M4A to MP3](/m4a-to-mp3) page covers that format in more depth.',
        ],
      },
      {
        h2: 'Does converting AAC to MP3 lose quality?',
        paras: [
          'Strictly speaking, a little. Both AAC and MP3 are lossy formats, so the converter decodes your AAC to full audio first and then encodes a brand-new MP3. That second encoding removes a small amount of detail. In practice, though, choosing a bitrate at or above the source keeps the difference too small for most people to hear.',
          'What no converter can do is add detail that the AAC file never had. A 128 kbps AAC will not sound like a studio master at 320 kbps; it will simply sound like itself, in MP3 form. For that reason, there is no benefit in going far above the source bitrate except for peace of mind.',
        ],
      },
      {
        h2: 'Protected iTunes and Apple Music files',
        paras: [
          'Some AAC files are locked with DRM (digital rights management). Songs downloaded through an Apple Music subscription and old iTunes purchases from before 2009, which often end in .m4p, fall into this group. Browsers cannot read protected audio, so these files show an error instead of converting.',
          'By contrast, iTunes Plus purchases, your own CD rips and recordings you made yourself are not protected, so they convert normally. If a file refuses to convert, play it in another app first to check that it is not damaged or locked.',
        ],
      },
      {
        h2: 'AAC to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'Because the converter runs in your browser, you do not need iTunes, VLC or any other software. On Windows or a Mac, open this page in Chrome, Edge, Firefox or Safari and add your files; each MP3 goes to your Downloads folder.',
          'On an Android phone, tap Choose AAC Files in Chrome and select the file from Recordings, Music or Download. On an iPhone or iPad, use Safari and pick the audio from the Files app, for example a Voice Memo you saved there. After you tap Download, Safari puts the MP3 in Files, inside the Downloads folder.',
        ],
        image: { src: '/images/aac-to-mp3-on-phone-and-computer.svg', alt: 'AAC to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the AAC to MP3 converter',
      },
      {
        h2: 'Everyday uses for AAC to MP3',
        list: [
          ['Car stereos and USB sticks', 'Older head units often skip .m4a and .aac files but play MP3 without a problem.'],
          ['Audio editors and apps', 'Some editing tools, game engines and voice apps only import MP3.'],
          ['Upload forms', 'Podcast hosts, school portals and ticket systems frequently accept MP3 only.'],
          ['Ringtones and clips', 'Convert first, then trim the best part with our [MP3 Cutter](/mp3-cutter).'],
        ],
      },
      {
        h2: 'Is this AAC converter private and safe?',
        paras: [
          'Yes. This AAC to MP3 converter processes your files on your own device using the browser’s Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. Nothing is uploaded, so private recordings and personal music stay with you.',
          'On top of that, [MP3 Converter](/) is free to use with no sign-up, no limits on the number of files and no watermark. There are no apps or browser extensions to install, and no misleading download buttons. Each file can be up to 500 MB.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this AAC to MP3 converter free?', a: 'Yes. It is completely free, with no account, no watermark and no limit on how many files you convert.' },
      { q: 'What is the difference between AAC and M4A?', a: 'AAC is the audio codec. M4A is a file container that usually holds AAC audio plus tags. Both convert to MP3 the same way on this page.' },
      { q: 'Which bitrate should I use to convert AAC to MP3?', a: 'Use 192 kbps for AAC files up to 128 kbps, and 256 or 320 kbps for 256 kbps AAC music such as iTunes Plus purchases.' },
      { q: 'Can I batch convert AAC to MP3?', a: 'Yes. Select or drop as many files as you like. They convert one after another, and Download all saves the finished MP3s together.' },
      { q: 'Why does my M4P file not convert?', a: 'Files ending in .m4p and Apple Music downloads are protected with DRM. Browsers cannot read protected audio, so they cannot be converted here.' },
      { q: 'Are my AAC files uploaded?', a: 'No. Everything happens inside your browser on your own device, so your audio never reaches our server.' },
      { q: 'Can I convert AAC to MP3 on Android?', a: 'Yes. Open this page in Chrome, tap Choose AAC Files, pick the file from your storage and tap Download when it is ready. The MP3 is saved in your Downloads folder.' },
      { q: 'Will the MP3 keep the song title and cover art?', a: 'No. Only the sound is converted, and the MP3 keeps the original file name. You can add tags afterwards with a free editor such as Mp3tag.' },
    ],
    related: ['m4a-to-mp3', 'mp4-to-mp3', 'ogg-to-mp3', 'flac-to-mp3'],
  },

  // ------------------------------------------------------------------ OGG
  {
    slug: 'ogg-to-mp3',
    nav: 'OGG to MP3',
    kind: 'convert',
    tool: { heading: 'Upload OGG files to convert to MP3.', formats: 'OGG, OGA, Vorbis, OPUS', buttonLabel: 'Choose OGG Files', showRecord: false },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'Convert OGG to MP3 at Up to 320kbps – Free & Fast',
    metaTitle: 'Convert OGG to MP3 at Up to 320kbps – Free & Fast',
    metaDescription:
      'Choose your MP3 bitrate and convert OGG Vorbis or Opus audio in seconds. Clean output, no account, no software needed.',
    h1: 'OGG to MP3 & MP3 to OGG Converter',
    lead: 'Our free OGG to MP3 converter turns OGG Vorbis and OGG Opus audio into MP3 files that play on iPhone, Windows, car stereos and every media player. Add as many files as you like and pick up to 320 kbps; the conversion runs privately in your browser. You can also flip it to MP3 to OGG.',
    intro: {
      h2: 'What is an OGG file, and why convert it?',
      paras: [
        'OGG is an open, royalty-free container from the Xiph.Org Foundation. Inside, it usually holds Vorbis audio, and sometimes Opus. Because it costs nothing to use, you meet it in many places: game sound folders, Wikimedia Commons recordings, Linux apps, Audacity exports, Telegram and Discord voice messages, and audio recorded in Firefox.',
        'The trouble is that OGG support is patchy outside the browser. Apple Music and iTunes do not import it, older iPhones will not play it, and many car stereos and portable players skip it. So converting OGG to MP3 is the quickest way to get a file that works for everyone. On the other hand, when a game engine or open-source project wants OGG, the MP3 to OGG tab handles that too.',
      ],
      image: { src: '/images/ogg-to-mp3-converter.svg', alt: 'OGG to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-ogg-to-mp3.svg', alt: 'How to convert OGG to MP3', width: 960, height: 300 },
    howCta: 'Convert OGG to MP3 now',
    steps: [
      ['Select OGG → MP3', 'This tab is already active when the page opens. Tap MP3 → OGG only if you want the opposite conversion.'],
      ['Pick the MP3 quality', '192 kbps is the default and suits most OGG music. Turn on Mono for voice messages. Choose your settings before adding files, because each file keeps the settings it was added with.'],
      ['Add the OGG files', 'Tap Choose OGG Files or drop .ogg and .oga files onto the box. Several files convert one after another.'],
      ['Download the MP3s', 'Check the result in the built-in player, then tap Download. Once two or more files are done, Download all saves them together.'],
    ],
    sections: [
      {
        h2: 'OGG vs MP3: size, quality and support',
        paras: [
          'At the same bitrate, OGG Vorbis and MP3 files are the same size, because bitrate decides size. Vorbis tends to sound slightly better at low bitrates, while above about 192 kbps most listeners cannot tell the two apart. The real difference is support: MP3 plays on practically everything, OGG does not.',
        ],
        list: [
          ['OGG Vorbis 128 kbps', 'About 1 MB per minute. Common for game music and web audio.'],
          ['OGG Vorbis 192 kbps', 'About 1.4 MB per minute. Very good quality for music.'],
          ['MP3 192 kbps', 'About 1.4 MB per minute and the best default when converting OGG music.'],
          ['MP3 320 kbps', 'About 2.4 MB per minute. Worth it only if the OGG itself is high quality.'],
        ],
        image: { src: '/images/ogg-to-mp3-vs-mp3-size.svg', alt: 'OGG vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Will OGG to MP3 conversion lose quality?',
        paras: [
          'A tiny amount, yes. Vorbis and MP3 are both lossy, so the tool first decodes the OGG to plain audio and then encodes a fresh MP3. As long as you choose an MP3 bitrate at or a little above the original, that extra loss is very hard to hear.',
          'Keep in mind that MP3 cannot add back detail the OGG never had. So a low-quality 64 kbps OGG will not improve at 320 kbps; it will just take more space. For most files, 192 kbps is the sweet spot.',
        ],
      },
      {
        h2: 'Game sounds, Telegram voice messages and other OGG sources',
        list: [
          ['Game music and sound effects', 'Many games and engines, including Minecraft resource packs and Godot projects, store sounds as .ogg. Convert the files you have the right to use, and extract them from game archives first.'],
          ['Telegram and Discord voice messages', 'Saved voice messages usually end in .ogg and contain Opus speech. Our [OPUS to MP3](/opus-to-mp3) page has extra tips for voice notes.'],
          ['Wikimedia Commons audio', 'Pronunciations, speeches and historic recordings are often published as OGG. Check each file’s licence before reusing it.'],
          ['Browser and Linux recordings', 'Firefox, Audacity and many Linux tools record or export OGG. Recordings that end in .webm instead convert on our [WEBM to MP3](/webm-to-mp3) page.'],
        ],
      },
      {
        h2: 'OGG to MP3 on iPhone, Android, Mac or Windows',
        paras: [
          'You do not need VLC, Audacity or any other software to convert OGG to MP3. The tool runs in Chrome, Edge, Firefox and Safari, so it works the same on a Windows PC, a Mac or a Chromebook. Finished MP3s are saved to your Downloads folder.',
          'On Android, open the page in Chrome, tap Choose OGG Files and pick the file from Downloads or Telegram’s folder. On an iPhone or iPad, use Safari and choose the OGG from the Files app. If Safari cannot read the file on its own, the built-in FFmpeg decoder loads automatically the first time and handles it. The MP3 then appears in Files under Downloads.',
        ],
        image: { src: '/images/ogg-to-mp3-on-phone-and-computer.svg', alt: 'OGG to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the OGG to MP3 converter',
      },
      {
        h2: 'Common questions about OGG files',
        paras: [
          'Is OGG better than MP3? For sound per kilobit, Vorbis is often slightly better. For compatibility, MP3 wins easily. That is why many people keep OGG for games and the web, and MP3 for listening.',
          'Can I convert OGG to MP3 without losing tags? Only the audio is converted here, so titles and artist names are not carried over. Each MP3 keeps the original file name, and you can add tags later with a free editor such as Mp3tag.',
          'Why will my OGG file not open at all? It may be damaged, empty or not really an audio file. Some games also pack sounds into their own archive formats, which need extracting before they become normal .ogg files.',
        ],
      },
      {
        h2: 'Private, free and safe OGG conversion',
        paras: [
          'This OGG to MP3 converter works right inside your browser with the Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. As a result, nothing is uploaded, and your voice messages and recordings never leave your device.',
          'In addition, [MP3 Converter](/) is free, needs no account and adds no watermark. There is nothing to install and no limit on how many files you convert, while each single file can be up to 500 MB.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this OGG to MP3 converter free?', a: 'Yes. Convert as many OGG files as you want for free, with no sign-up, no watermark and no software to install.' },
      { q: 'Why will my iPhone not play OGG files?', a: 'Older versions of iOS and the Apple Music app do not support OGG. Converting the file to MP3 is the simplest fix, and it works directly in Safari.' },
      { q: 'Does it support OGG Opus as well as Vorbis?', a: 'Yes. Both Vorbis and Opus audio inside an OGG file convert to MP3, and .oga files work too.' },
      { q: 'What bitrate should I choose for OGG to MP3?', a: '192 kbps suits most OGG music. Choose 256 or 320 kbps for high-quality sources, and 128 kbps with Mono for voice messages.' },
      { q: 'Can I batch convert OGG to MP3?', a: 'Yes. Select or drop several files at once. They convert one after another, and Download all saves every finished MP3.' },
      { q: 'Are my OGG files uploaded to a server?', a: 'No. The conversion runs entirely in your browser, so your files stay on your device.' },
      { q: 'Can I convert game sound files?', a: 'Yes, if they are standard OGG files and you have the right to use them. Sounds packed inside game archives must be extracted first.' },
      { q: 'Can I convert a Telegram voice message to MP3?', a: 'Yes. Save the voice message to your device, which gives you an .ogg file, then add it here. Turn on Mono for the clearest result.' },
    ],
    related: ['opus-to-mp3', 'webm-to-mp3', 'flac-to-mp3', 'aac-to-mp3'],
  },

  // ------------------------------------------------------------------ OPUS
  {
    slug: 'opus-to-mp3',
    nav: 'OPUS to MP3',
    kind: 'convert',
    tool: { heading: 'Upload OPUS voice notes to convert to MP3.', formats: 'OPUS, OGG, WEBM', buttonLabel: 'Choose OPUS Files', defaultBitrate: 128, defaultMono: true, showRecord: false },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'OPUS to MP3 in Seconds – Upload, Convert, Download',
    metaTitle: 'OPUS to MP3 in Seconds – Upload, Convert, Download',
    metaDescription:
      'A simple Opus to MP3 converter that works on any phone or computer. No installs, no sign-up and no cost — just fast results.',
    h1: 'OPUS to MP3 & MP3 to OPUS Converter',
    lead: 'Our free OPUS to MP3 converter turns WhatsApp, Telegram and Discord voice notes into MP3 files that open on any computer, phone or email app. Add one message or dozens, and they convert privately in your browser, which matters for personal conversations. Need tiny files instead? Switch to MP3 to OPUS.',
    intro: {
      h2: 'Why voice notes arrive as .opus files',
      paras: [
        'Opus is a modern, open audio codec built for voice calls and live streaming. It keeps speech clear at very low bitrates, so messaging apps love it: WhatsApp voice notes are .opus files, while Telegram and Discord voice messages are Opus audio saved as .ogg. Browsers also use Opus for calls and recordings.',
        'The problem starts when you take a voice note out of the app. Many computers, media players, email apps and office tools will not open an .opus file. Converting OPUS to MP3 fixes that, because MP3 plays nearly everywhere. Since voice notes are speech, this page starts at 128 kbps with Mono switched on, which keeps one voice clear and the file small.',
      ],
      image: { src: '/images/opus-to-mp3-converter.svg', alt: 'OPUS to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-opus-to-mp3.svg', alt: 'How to convert OPUS to MP3', width: 960, height: 300 },
    howCta: 'Convert OPUS to MP3 now',
    steps: [
      ['Keep OPUS → MP3 selected', 'The page opens in this direction. Tap MP3 → OPUS only when you want to make Opus files from MP3.'],
      ['Check quality and Mono', '128 kbps with Mono on is ideal for voice notes. For music or stereo recordings, turn Mono off and choose 192 kbps or more before adding files.'],
      ['Add your voice notes', 'Tap Choose OPUS Files and select one or many .opus, .ogg or .webm files. They convert one after another.'],
      ['Download the MP3s', 'Play each MP3 in the small player to check it, then tap Download. Use Download all when several notes are finished.'],
    ],
    sections: [
      {
        h2: 'How to get the OPUS file out of WhatsApp and Telegram',
        paras: [
          'Before you can convert OPUS to MP3, you need the voice note as a file on your device. Here is where to find it in the most common apps:',
        ],
        list: [
          ['WhatsApp on Android', 'Open the Files app and go to Android › media › com.whatsapp › WhatsApp › Media › WhatsApp Voice Notes. Notes sit in dated subfolders.'],
          ['WhatsApp on iPhone', 'Long-press the voice note, tap Forward, then tap the Share icon and choose Save to Files.'],
          ['Telegram on a computer', 'Right-click the voice message in Telegram Desktop and choose Save As. You get an .ogg file with Opus audio.'],
          ['Discord', 'Voice messages are .ogg files with Opus audio, so once you have saved one to your device it converts the same way.'],
        ],
      },
      {
        h2: 'OPUS vs MP3: why the MP3 is bigger',
        paras: [
          'Opus is one of the most efficient audio codecs ever made. Voice notes are usually encoded at very low bitrates, often 32 kbps or less, so a one-minute message is typically a few hundred kilobytes. MP3 needs more bits for the same clarity. As a result, the converted MP3 is usually larger than the original note.',
          'Still, the numbers stay small. A 128 kbps mono MP3 takes about 1 MB per minute, so even a ten-minute voice note is only around 10 MB. And if you need it smaller for an email limit, our [MP3 Compressor](/mp3-compressor) can bring speech down to 64 or even 32 kbps.',
        ],
        image: { src: '/images/opus-to-mp3-vs-mp3-size.svg', alt: 'OPUS vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Reasons to save voice notes as MP3',
        list: [
          ['Keep precious messages', 'Save a message from a parent, partner or friend in a format that will still open years from now.'],
          ['Share outside the app', 'Send the MP3 by email or upload it to a work tool or form that rejects .opus files.'],
          ['Transcribe or edit', 'Most transcription services and audio editors import MP3 without extra plugins.'],
          ['Combine several notes', 'Turn a long chat of voice messages into one file with our [Audio Joiner](/audio-joiner).'],
        ],
      },
      {
        h2: 'OPUS to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'You can convert OPUS to MP3 without installing an app. On a Windows PC or Mac, open this page in Chrome, Edge, Firefox or Safari, add the .opus files and collect the MP3s from your Downloads folder.',
          'On an Android phone, use Chrome and pick the voice note straight from the WhatsApp Voice Notes folder described above. On an iPhone or iPad, first save the note to Files, then open this page in Safari and choose it from there. When you tap Download, the MP3 is saved to Files in the Downloads folder, ready to share. If the browser cannot read the format by itself, the built-in FFmpeg decoder loads once and takes over.',
        ],
        image: { src: '/images/opus-to-mp3-on-phone-and-computer.svg', alt: 'OPUS to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the OPUS to MP3 converter',
      },
      {
        h2: 'Questions people ask about OPUS files',
        paras: [
          'What opens an .opus file? VLC, Chrome and Firefox can play it, but many default players, email previews and office apps cannot. That is the main reason people convert OPUS to MP3.',
          'Is Opus the same as OGG? Not exactly. Opus is the codec, while OGG is a container that can hold Opus or Vorbis. A .opus file is simply Opus audio inside an OGG container, which is why both convert here.',
          'Does converting improve a bad recording? No. The MP3 sounds like the original note. Background noise or a quiet voice stays the same, although the file becomes much easier to use.',
        ],
      },
      {
        h2: 'Your voice notes stay private',
        paras: [
          'Voice messages are personal, so privacy matters here more than anywhere. This OPUS to MP3 converter works entirely in your browser, using the Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. Your notes are never uploaded, stored or listened to by anyone.',
          'What is more, [MP3 Converter](/) is free, asks for no account or email and adds no watermark. There is nothing to install, and the converted files vanish from the page as soon as you close the tab.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this OPUS to MP3 converter free?', a: 'Yes. You can convert as many OPUS files as you like for free, with no sign-up, no watermark and no app.' },
      { q: 'How do I convert a WhatsApp voice note to MP3?', a: 'Save the voice note to your device first, then tap Choose OPUS Files on this page, select it and tap Download when the MP3 is ready.' },
      { q: 'Where are WhatsApp voice notes stored on Android?', a: 'On recent Android versions, look in Android, media, com.whatsapp, WhatsApp, Media, WhatsApp Voice Notes. The notes are sorted into dated subfolders.' },
      { q: 'How do I save a WhatsApp voice note on iPhone?', a: 'Long-press the voice note, tap Forward, then tap the Share icon and choose Save to Files. After that, pick it from Files on this page in Safari.' },
      { q: 'Will the MP3 be larger than the OPUS file?', a: 'Usually yes, because Opus is extremely efficient. A 128 kbps mono MP3 is still small, at about 1 MB per minute.' },
      { q: 'Are my voice notes uploaded anywhere?', a: 'No. Everything happens in your browser on your own device, which keeps private conversations private.' },
      { q: 'Can I batch convert OPUS to MP3?', a: 'Yes. Select several files together. They convert one after another, and Download all saves every MP3 when they are done.' },
      { q: 'Should I turn Mono off?', a: 'Only for music or stereo recordings. Voice notes are almost always a single voice, so keeping Mono on gives a clean result.' },
    ],
    related: ['ogg-to-mp3', 'voice-to-mp3', 'm4a-to-mp3', 'audio-joiner'],
  },

  // ------------------------------------------------------------------ WEBM
  {
    slug: 'webm-to-mp3',
    nav: 'WEBM to MP3',
    kind: 'convert',
    tool: { heading: 'Upload WEBM files to convert to MP3.', formats: 'WEBM, MKV, OGG', buttonLabel: 'Choose WEBM Files', showRecord: false },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'WEBM to MP3 Converter – Free Online Converter',
    metaTitle: 'WEBM to MP3 Converter – Free Online Converter',
    metaDescription:
      'Convert WEBM videos and audio to MP3 online for free. Pick a quality up to 320 kbps and download in seconds — no sign-up, no software.',
    h1: 'WEBM to MP3 & MP3 to WEBM Converter',
    lead: 'Our free WEBM to MP3 converter pulls the sound out of WEBM videos and audio files and saves it as a regular MP3. It is ideal for screen recordings, browser-recorded meetings and web clips, and it runs privately in your browser with no upload. Building a website? It also converts MP3 to WEBM.',
    intro: {
      h2: 'What is a WEBM file?',
      paras: [
        'WEBM is an open media format created for the web. It usually holds VP8, VP9 or AV1 video with Opus or Vorbis sound, and every modern browser plays it. Because of that, browser-based screen recorders, online voice recorders and many web meeting tools save their recordings as WEBM. You may also end up with a .webm file after saving a clip from a website.',
        'Outside the browser, however, WEBM is less welcome. Many phones, car stereos, podcast hosts and audio editors cannot open it. So when you only need the narration of a tutorial or the soundtrack of a clip, converting WEBM to MP3 gives you a much smaller file that plays anywhere. And if a web project needs light audio-only WEBM files, the MP3 to WEBM tab creates them.',
      ],
      image: { src: '/images/webm-to-mp3-converter.svg', alt: 'WEBM to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-webm-to-mp3.svg', alt: 'How to convert WEBM to MP3', width: 960, height: 300 },
    howCta: 'Convert WEBM to MP3 now',
    steps: [
      ['Open the WEBM → MP3 tab', 'It is selected when the page loads. Tap MP3 → WEBM only if you want to create WEBM audio instead.'],
      ['Choose the MP3 quality', '192 kbps is the default. For narration and meetings, 128 kbps with Mono is plenty; for music, pick 256 or 320 kbps. Set this before adding files.'],
      ['Add the WEBM file', 'Tap Choose WEBM Files or drag the recording onto the box. Video and audio-only WEBM files both work, and several files convert in turn.'],
      ['Download the MP3', 'Listen in the built-in player, then tap Download. With more than one file finished, Download all saves the whole set.'],
    ],
    sections: [
      {
        h2: 'WEBM video vs MP3 audio: how much space you save',
        paras: [
          'Video is by far the heaviest part of a WEBM file. A 720p recording often takes around 15 MB per minute, while the same minute as an MP3 is only 1 to 1.5 MB. As a result, an hour-long screen recording can shrink from close to a gigabyte to well under 100 MB once you keep only the sound.',
        ],
        list: [
          ['WEBM video (720p)', 'Roughly 15 MB per minute, depending on the content and the recorder.'],
          ['MP3 192 kbps', 'About 1.4 MB per minute. A good default for most recordings.'],
          ['MP3 128 kbps', 'About 1 MB per minute. Perfect for talks, lessons and meetings.'],
        ],
        image: { src: '/images/webm-to-mp3-vs-mp3-size.svg', alt: 'WEBM vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Typical uses for WEBM to MP3',
        list: [
          ['Screen recording narration', 'Turn a recorded tutorial or demo into an audio lesson people can hear on the go.'],
          ['Browser-recorded meetings', 'Extract the conversation to share it, archive it or send it to a transcription service.'],
          ['Voice recordings from web apps', 'Online recorders often save audio-only WEBM files, and these convert exactly the same way.'],
          ['Clips for editing', 'Convert first, then keep just the best part with our [MP3 Cutter](/mp3-cutter).'],
        ],
      },
      {
        h2: 'What happens to the video track?',
        paras: [
          'The converter reads only the audio inside your WEBM. The picture is ignored, so you get a clean MP3 with the full sound and nothing else. If the original audio is surround sound, it is mixed down to stereo, and every MP3 is saved at 44.1 kHz for the widest support.',
          'Want to keep the picture as well? Then you do not need conversion at all; most browsers already play WEBM. For other video formats, our [Video to MP3](/video-to-mp3) page accepts MP4, AVI, WMV and more, while [MKV to MP3](/mkv-to-mp3) covers Matroska files, the format WEBM is based on.',
        ],
      },
      {
        h2: 'WEBM to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'The tool runs in Chrome, Edge, Firefox and Safari, so you can convert WEBM to MP3 without installing software on Windows, macOS, Linux or a Chromebook. The finished MP3 is saved in your Downloads folder.',
          'On Android, open the page in Chrome, tap Choose WEBM Files and pick the recording from Downloads or Movies. On an iPhone or iPad, open the page in Safari and choose the file from the Files app. If the browser cannot read the WEBM directly, the built-in FFmpeg decoder loads the first time and extracts the sound anyway. Long recordings convert faster on a computer than on a phone.',
        ],
        image: { src: '/images/webm-to-mp3-on-phone-and-computer.svg', alt: 'WEBM to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the WEBM to MP3 converter',
      },
      {
        h2: 'Troubleshooting WEBM files',
        paras: [
          'If you see “We could not find any sound in this file”, the recording probably has no audio track. This often happens when a screen recorder was not allowed to capture the microphone or tab audio. Play the original WEBM to check whether you can hear anything.',
          'Files over 500 MB are refused, so split very long recordings first or record in shorter parts. Damaged files, for example from a recording that was cut off when the browser closed, may also fail to convert.',
        ],
      },
      {
        h2: 'Safe and private WEBM conversion',
        paras: [
          'Screen recordings and meetings often contain private information. That is why this WEBM to MP3 converter does all its work inside your browser, using the Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. Your files are never uploaded to a server.',
          'Beyond privacy, [MP3 Converter](/) is free, needs no sign-up and adds no watermark. There are no apps or extensions to install, and there is no limit on how many files you convert.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this WEBM to MP3 converter free?', a: 'Yes. It is completely free, with no sign-up, no limits on the number of files and no watermark.' },
      { q: 'Can I convert audio-only WEBM files?', a: 'Yes. WEBM files with or without video both convert to MP3 in the same way.' },
      { q: 'Why is my MP3 silent or why does the WEBM not convert?', a: 'The recording may not contain any audio. Play the original WEBM to check, and make sure the recorder was allowed to capture sound next time.' },
      { q: 'How do I convert a screen recording to MP3?', a: 'Tap Choose WEBM Files, select the recording, wait for the conversion to finish and tap Download. Only the sound is kept.' },
      { q: 'Is there a file size limit?', a: 'Yes. Each file can be up to 500 MB. Split longer recordings into parts before converting.' },
      { q: 'Are my WEBM files uploaded?', a: 'No. The conversion runs entirely in your browser, so your recordings stay on your device.' },
      { q: 'Which bitrate should I pick for WEBM to MP3?', a: '128 kbps with Mono suits speech and meetings. Choose 192 kbps for general use and 256 or 320 kbps for music.' },
      { q: 'Can I convert WEBM to MP3 on iPhone?', a: 'Yes. Open this page in Safari, choose the WEBM from the Files app and tap Download when it is ready. The MP3 is saved in Files under Downloads.' },
    ],
    related: ['video-to-mp3', 'mkv-to-mp3', 'opus-to-mp3', 'mp3-cutter'],
  },

  // ------------------------------------------------------------------ MOV
  {
    slug: 'mov-to-mp3',
    nav: 'MOV to MP3',
    kind: 'convert',
    tool: { heading: 'Upload MOV videos to convert to MP3.', formats: 'MOV, QT, MP4', buttonLabel: 'Choose MOV Files', showRecord: false },
    // seoTitle is used as the full <title> as written (no " | MP3 Converter" suffix).
    seoTitle: 'Convert MOV to MP3 Online – Free & Fast Converter',
    metaTitle: 'Convert MOV to MP3 Online – Free & Fast Converter',
    metaDescription:
      'Convert MOV videos to MP3 audio online for free. Get high-quality MP3 files quickly with our simple and reliable converter.',
    h1: 'MOV to MP3 & MP3 to MOV Converter',
    lead: 'Our free MOV to MP3 converter pulls the sound out of iPhone, Mac and QuickTime videos and saves it as an MP3 you can play anywhere. Pick a quality up to 320 kbps, add one clip or several, and the work happens privately in your browser. It also turns MP3 into a MOV video when an app needs one.',
    intro: {
      h2: 'Why turn a MOV video into MP3?',
      paras: [
        'MOV is Apple’s QuickTime video format. iPhones and iPads save camera videos as .mov files, and Mac screen recordings made with Shift-Command-5 or QuickTime Player are MOV too. Many cameras and editing apps also export to it. These files are big: a single minute of 1080p iPhone video takes about 60 MB, and 4K takes far more.',
        'Very often, though, you only care about what you can hear: a speech at a wedding, a song from a concert, a lecture or an interview. Converting MOV to MP3 keeps that sound and drops the heavy picture, so a 60 MB minute becomes about 1.5 MB. Meanwhile, if you need to upload audio somewhere that only accepts video, the MP3 to MOV tab does the opposite.',
      ],
      image: { src: '/images/mov-to-mp3-converter.svg', alt: 'MOV to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-mov-to-mp3.svg', alt: 'How to convert MOV to MP3', width: 960, height: 300 },
    howCta: 'Convert MOV to MP3 now',
    steps: [
      ['Stay on MOV → MP3', 'This direction is selected when the page opens. Tap MP3 → MOV only to make a video from an MP3.'],
      ['Pick the MP3 quality', '192 kbps is the default and suits most videos. Use 256 or 320 kbps for concerts and music, or 128 kbps with Mono for speeches. Choose before adding files.'],
      ['Choose your MOV videos', 'Tap Choose MOV Files. On iPhone, pick the clip from Photo Library or Files; on a computer, select or drag in one or more files.'],
      ['Download the MP3', 'Check the sound in the small player, then tap Download. When several clips are done, Download all saves every MP3.'],
    ],
    sections: [
      {
        h2: 'MOV vs MP3: how much smaller is the audio?',
        paras: [
          'Almost all of a MOV file’s size is video. The audio track inside an iPhone video is usually AAC, which takes up only a small slice of the file. So once you keep just the sound, the savings are dramatic.',
        ],
        list: [
          ['MOV video, iPhone 1080p', 'About 60 MB per minute, and roughly three times that in 4K.'],
          ['MP3 320 kbps', 'About 2.4 MB per minute. The best choice for live music.'],
          ['MP3 192 kbps', 'About 1.4 MB per minute. Clear and compact for everyday clips.'],
          ['MP3 128 kbps', 'About 1 MB per minute. Plenty for talks and interviews.'],
        ],
        image: { src: '/images/mov-to-mp3-vs-mp3-size.svg', alt: 'MOV vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Convert iPhone videos to MP3 right on your phone',
        paras: [
          'You do not need a computer or an app from the App Store. Open this page in Safari on your iPhone or iPad and tap Choose MOV Files. iOS then offers Photo Library, Take Photo or Video, or Choose File, so you can grab a video from Photos or from the Files app.',
          'When the MP3 is ready, tap Download. Safari saves it in the Files app, inside the Downloads folder, where you can play it, rename it or share it by AirDrop, Messages or email. To keep only a short part, for example the toast at a wedding, trim the finished file with our [MP3 Cutter](/mp3-cutter).',
        ],
      },
      {
        h2: 'MOV to MP3 on Android, Mac and Windows',
        paras: [
          'Received an iPhone video on another device? No problem. On Android, open this page in Chrome, tap Choose MOV Files and pick the clip from Downloads or your gallery; the MP3 goes to Downloads. On a Mac, you can convert MOV to MP3 in Safari, Chrome or Firefox without opening iMovie or QuickTime.',
          'On Windows, the converter works in Edge, Chrome and Firefox, even if Windows itself struggles with some Apple video codecs. That is because only the audio track is read, and when the browser cannot decode it, the built-in FFmpeg decoder takes over automatically.',
        ],
        image: { src: '/images/mov-to-mp3-on-phone-and-computer.svg', alt: 'MOV to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the MOV to MP3 converter',
      },
      {
        h2: 'Large 4K clips and the 500 MB limit',
        paras: [
          'Each file can be up to 500 MB. With iPhone videos, that is about eight minutes of 1080p footage, or roughly three minutes of 4K. For longer recordings, shorten the video in the Photos app first, or record at 1080p when you know you only need the sound.',
          'Because the video is processed on your own device, a newer phone or a computer converts big clips faster. If a large file seems slow, keep the tab open and let it finish; the progress bar shows how far it has got.',
        ],
      },
      {
        h2: 'Popular reasons to convert MOV files',
        list: [
          ['Speeches and toasts', 'Keep a wedding speech or a graduation address as audio for relatives who just want to listen.'],
          ['Concerts and rehearsals', 'Save a live song from your phone video and play it in any music app.'],
          ['Lectures and interviews', 'Make a small audio file for transcription, note-taking or a podcast edit.'],
          ['Mac screen recordings', 'Turn a recorded call or tutorial into audio you can listen to on the go.'],
        ],
      },
      {
        h2: 'Does MOV to MP3 conversion reduce quality?',
        paras: [
          'The sound inside a MOV is already compressed, usually as AAC, and MP3 is lossy too. So converting adds a small amount of loss. In practice, 192 kbps keeps everyday clips sounding just like the original, and 256 or 320 kbps is a safe choice for music.',
          'Also note that every MP3 is saved at 44.1 kHz in stereo or mono. If a video has surround sound, it is mixed down to stereo so no voices are lost. For MP4 files with the same content, our [MP4 to MP3](/mp4-to-mp3) page works the same way.',
        ],
      },
      {
        h2: 'Private and safe: your videos stay on your device',
        paras: [
          'Family videos are personal. This MOV to MP3 converter therefore works entirely inside your browser, using the Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. Your videos are never uploaded, so nobody else can see them.',
          'In addition, [MP3 Converter](/) is free, needs no account and adds no watermark. There is nothing to install and no limit on how many clips you convert.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this MOV to MP3 converter free?', a: 'Yes. Convert as many MOV videos to MP3 as you like for free, with no sign-up, no watermark and no app.' },
      { q: 'How do I convert an iPhone video to MP3?', a: 'Open this page in Safari, tap Choose MOV Files, pick the video from Photo Library or Files and tap Download when the MP3 is ready. It is saved in Files under Downloads.' },
      { q: 'Can I convert MOV to MP3 on Windows?', a: 'Yes. The converter works in Edge, Chrome and Firefox on Windows, as well as on Mac, Linux, Android and iOS.' },
      { q: 'What if my MOV uses an Apple codec my browser cannot read?', a: 'The tool automatically switches to its built-in FFmpeg decoder, so the audio can still be extracted.' },
      { q: 'Is there a size limit for MOV files?', a: 'Yes, 500 MB per file. That is roughly eight minutes of 1080p iPhone video. Trim longer videos in the Photos app first.' },
      { q: 'Are my videos uploaded to a server?', a: 'No. Everything happens inside your browser, so your videos never leave your phone or computer.' },
      { q: 'Can I batch convert MOV to MP3?', a: 'Yes. Select several videos at once. They convert one after another, and Download all saves the finished MP3s together.' },
      { q: 'Can I keep only part of the video’s audio?', a: 'Convert the whole video first, then open the MP3 in our MP3 Cutter and keep just the section you want.' },
    ],
    related: ['mp4-to-mp3', 'video-to-mp3', 'm4a-to-mp3', 'mp3-cutter'],
  },

  // ------------------------------------------------------------------ MKV
  {
    slug: 'mkv-to-mp3',
    nav: 'MKV to MP3',
    kind: 'convert',
    tool: { heading: 'Upload MKV videos to convert to MP3.', formats: 'MKV, MKA, WEBM', buttonLabel: 'Choose MKV Files', showRecord: false },
    seoTitle: 'MKV to MP3 Converter Online – Free Audio Converter',
    metaTitle: 'MKV to MP3 Converter Online – Free Audio Converter',
    metaDescription:
      'Convert MKV files to MP3 in seconds. Use our free online MKV to MP3 converter to extract audio from your videos easily.',
    h1: 'MKV to MP3 & MP3 to MKV Converter',
    lead: 'Our free MKV to MP3 converter pulls the soundtrack out of any Matroska video and saves it as an MP3 at up to 320 kbps, right in your browser. Need the opposite? Switch to MP3 to MKV and wrap an audio file in a simple MKV video.',
    intro: {
      h2: 'Extract audio from MKV files without installing software',
      paras: [
        'MKV, short for Matroska Video, is an open container format. Think of it as a box that holds video, several audio tracks, subtitles and chapter points in a single file. Movie rips, anime releases, screen recordings and OBS Studio captures often use it. However, most phones, car stereos and music apps cannot open an .mkv file, and very often you only want the sound anyway.',
        'This online MKV to MP3 converter handles that in one step. It reads the audio track, skips the picture and subtitles, and encodes a standard MP3 with the LAME encoder. Inside an MKV you may find AAC, AC3 (Dolby Digital), E-AC3, DTS, FLAC, Opus or Vorbis audio. Your browser decodes the common ones itself, and for the rest the page loads a built-in FFmpeg decoder. As a result, you can convert MKV to MP3 for free, without VLC tricks or command-line tools.',
      ],
      image: { src: '/images/mkv-to-mp3-converter.svg', alt: 'MKV to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-mkv-to-mp3.svg', alt: 'How to convert MKV to MP3', width: 960, height: 300 },
    howCta: 'Convert MKV to MP3 now',
    steps: [
      ['Keep the MKV → MP3 tab', 'The converter opens in MKV → MP3 mode. Tap MP3 → MKV only when you want to go the other way.'],
      ['Choose the MP3 quality', 'Pick 128, 192, 256 or 320 kbps in the MP3 Quality menu and switch on Mono for speech if you like. Set this first, because each file uses the settings that were active when you added it.'],
      ['Add your MKV files', 'Tap Choose MKV Files or drag videos onto the box. Conversion starts straight away, and several files are processed one after another.'],
      ['Download the MP3', 'Press play to check the result, then tap Download. Once two or more files are ready, Download all saves the whole batch.'],
    ],
    sections: [
      {
        h2: 'What happens to video, subtitles and extra tracks',
        paras: [
          'An MKV file carries much more than sound. Here is how the MKV to MP3 converter treats each part, so you know what to expect before you start.',
        ],
        list: [
          ['Video picture', 'Skipped completely. Only the audio goes into the MP3, which is why the file shrinks so much.'],
          ['Subtitles and chapters', 'Left out, because an MP3 file has no place to store them.'],
          ['Surround sound', '5.1 and 7.1 mixes are folded down to stereo, and the centre channel, where dialogue usually sits, is blended into left and right.'],
          ['Several audio tracks', 'One track is converted, usually the first or main mix. There is no track picker yet, so a second language or a separate OBS microphone track is not included.'],
        ],
      },
      {
        h2: 'MKV vs MP3 file size: how much space you save',
        paras: [
          'A single minute of 1080p MKV video often weighs around 40 MB, and almost all of that is picture. The same minute as a 320 kbps MP3 is about 2.4 MB, while 128 kbps brings it down to roughly 1 MB. So the full soundtrack of a two-hour film fits in about 115 MB at 128 kbps.',
          'Which bitrate should you choose? For a concert, music video or film score, pick 256 or 320 kbps. For gameplay commentary, a webinar or a lecture recorded in OBS, 128 kbps is plenty, and Mono keeps a single voice centred. Keep in mind that the file size depends on the bitrate alone. If you later need something smaller for email, our [MP3 Compressor](/mp3-compressor) goes down to 32 kbps.',
        ],
        image: { src: '/images/mkv-to-mp3-vs-mp3-size.svg', alt: 'MKV vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Popular reasons to convert MKV to MP3',
        list: [
          ['OBS and stream recordings', 'Save your commentary or a podcast you streamed as audio you can edit or publish.'],
          ['Concerts and music videos', 'Keep the live performance on your phone and listen without the screen on.'],
          ['Lectures and webinars', 'Turn a long class recording into audio for the commute or the gym. An MKV to MP3 conversion of a one-hour class at 128 kbps is only about 58 MB.'],
          ['Language practice', 'Listen to dialogue from your own film files again and again while you learn.'],
          ['Ringtones and clips', 'Convert first, then trim the best 30 seconds with our [MP3 Cutter](/mp3-cutter).'],
        ],
      },
      {
        h2: 'Convert MKV to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'This MKV to MP3 converter runs in the browser, so the steps are the same on every device. On Windows and Mac, use Chrome, Edge, Firefox or Safari, and the MP3 lands in your Downloads folder. On Android, Chrome saves it to Downloads, where any music player can find it.',
          'On an iPhone or iPad, open this page in Safari, pick the MKV from the Files app and convert as usual. When you tap Download, Safari stores the MP3 in Files › Downloads. Meanwhile, keep in mind that phones have less memory than computers, so a very large movie file converts more reliably on a laptop or desktop.',
        ],
        image: { src: '/images/mkv-to-mp3-on-phone-and-computer.svg', alt: 'MKV to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the MKV to MP3 converter',
      },
      {
        h2: 'Is MKV to MP3 lossless? Quick answers',
        paras: [
          'No, MKV to MP3 is not lossless. MP3 is a lossy format, so the encoder removes detail that most people cannot hear. At 256 or 320 kbps the result sounds the same as the original for nearly every listener. However, if the MKV holds lossless FLAC audio and you need a perfect copy for editing, keep the original file as your master.',
          'Can you convert MKV to MP3 without software? Yes. Everything happens on this page, with no app, plug-in or extension to install. In addition, the same tool reads WEBM and MKA files. For other video types, such as AVI or WMV, use our [Video to MP3](/video-to-mp3) converter, and for browser recordings try [WEBM to MP3](/webm-to-mp3).',
        ],
      },
      {
        h2: 'Private by design: your videos stay on your device',
        paras: [
          'Personal recordings, family videos and unreleased projects deserve privacy. That is why [MP3 Converter](/) decodes and encodes everything inside your own browser. Your MKV is never uploaded to a server, so nobody else can see, keep or share it.',
        ],
        list: [
          ['No account needed', 'You never type an email address or a password.'],
          ['No watermark', 'The MP3 contains only your audio, with nothing added at the start or end.'],
          ['Nothing to install', 'There is no download that could bundle adware or toolbars.'],
        ],
      },
      {
        h2: 'File size limit and first-run loading time',
        paras: [
          'For MKV to MP3 jobs, each file can be up to 500 MB. When your browser cannot read the audio codec on its own, for example AC3 or DTS, the page downloads its FFmpeg decoder, which is about 32 MB. This happens only once, and your browser then caches it, so later files start much faster.',
          'Because the whole file is processed in memory, very long or very large videos need a capable device. If a big MKV fails on a phone, try it on a computer instead.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this MKV to MP3 converter free?', a: 'Yes. It is completely free, with no sign-up, no watermark and no limit on how many files you convert.' },
      { q: 'How do I convert MKV to MP3 at 320 kbps?', a: 'Choose 320 kbps in the MP3 Quality menu before you add your MKV files. Every file you add afterwards is converted at that bitrate.' },
      { q: 'Can I convert MKV to MP3 without VLC or FFmpeg?', a: 'Yes. You do not need to install anything. The converter runs in your browser and uses its own built-in decoder when needed.' },
      { q: 'Can I choose which audio track is converted?', a: 'Not yet. The MKV to MP3 tool converts one audio track, usually the first or main mix. For most movie files and recordings this is the track you want.' },
      { q: 'What happens to 5.1 surround sound?', a: 'It is mixed down to stereo. The centre and surround channels are blended into left and right, so dialogue stays clear on headphones and phones.' },
      { q: 'Is there a file size limit for MKV files?', a: 'Yes. Each MKV can be up to 500 MB. Very large files convert most reliably on a computer.' },
      { q: 'Why does the first MKV take longer to start?', a: 'For codecs the browser cannot read, the page loads an FFmpeg decoder of about 32 MB once. After that it is cached and starts quickly.' },
      { q: 'Can I convert several MKV files at once?', a: 'Yes. Select or drop as many files as you like. They are converted one after another, and Download all saves the finished MP3s.' },
      { q: 'Are my MKV videos uploaded anywhere?', a: 'No. The conversion happens inside your browser, and your files never leave your device.' },
    ],
    related: ['video-to-mp3', 'webm-to-mp3', 'mp4-to-mp3', 'audio-joiner'],
  },

  // ------------------------------------------------------------------ Cutter
  {
    slug: 'mp3-cutter',
    nav: 'MP3 Cutter',
    kind: 'cut',
    seoTitle: 'MP3 Cutter – Cut & Trim Audio Online Free, No Upload',
    metaTitle: 'MP3 Cutter – Cut & Trim Audio Online Free, No Upload',
    metaDescription:
      'Free online MP3 cutter: trim songs, cut recordings and make ringtones with fade in and out. Runs in your browser, files stay on your device. Try it now.',
    h1: 'MP3 Cutter – Cut and Trim Audio Online',
    lead: 'Our free MP3 cutter lets you trim any song, voice memo or video sound to the exact part you need, right in your browser. Drag two handles on the waveform, press Preview, add a fade if you like and save a new MP3 at up to 320 kbps. Your file never leaves your device.',
    intro: {
      h2: 'A free online audio cutter that works without software',
      paras: [
        'An MP3 cutter does one job well: it keeps the part of a recording you want and throws away the rest. For example, you might want the 30-second chorus of a song for a ringtone, a clean start to a voice memo, or a music bed that fits a video exactly. Full audio editors such as Audacity can do this, of course. However, they take time to install and learn, and on a phone they are not an option at all.',
        'This online audio trimmer opens your file in the page and draws its waveform, so you can see the quiet gaps and loud parts at a glance. You can keep the selection or remove it, so cutting out a mistake in the middle is just as easy as trimming the ends. In addition, it reads far more than MP3: WAV, M4A, FLAC, OGG and the sound track of MP4, MOV or WEBM videos all load the same way. The result is always a standard MP3 that plays everywhere.',
      ],
      image: { src: '/images/mp3-cutter.svg', alt: 'MP3 cutter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-cut-mp3.svg', alt: 'How to cut an MP3', width: 960, height: 300 },
    howCta: 'Cut your MP3 now',
    steps: [
      ['Choose your audio or video file', 'Tap Choose File or drag a file onto the box. MP3, WAV, M4A, FLAC, OGG, MP4, MOV, WEBM and more work, up to 500 MB. The waveform appears in a few seconds.'],
      ['Select the part with the handles', 'Drag the two purple handles, or type exact Start and End times in seconds. Press Preview to hear the selection before you save it.'],
      ['Keep or remove the selection', 'Choose Keep selection to save only that part, or Remove selection to delete it and join the rest. Turn on Fade in or Fade out for smooth edges.'],
      ['Cut and download the MP3', 'Pick the MP3 quality and, if you want, Mono. Then press Cut & Save MP3, listen to the result on the page and tap Download.'],
    ],
    sections: [
      {
        h2: 'What can you do with an MP3 cutter?',
        paras: [
          'Most people open an MP3 cutter for one of a handful of everyday tasks. Here are the most common ones, plus the settings that work best for each.',
        ],
        list: [
          ['Make a ringtone or alarm sound', 'Keep 20 to 30 seconds of the chorus and turn on Fade out, so the ring ends softly instead of stopping mid-note.'],
          ['Clean up a voice recording', 'Trim the silence, the “is it recording?” moment and the fumbling at the end of a memo or interview.'],
          ['Remove a part from the middle', 'Select a cough, an ad break or a wrong take, then choose Remove selection. The parts before and after are joined for you.'],
          ['Fit music to a video', 'Cut the exact section that matches your clip length for a reel, a slideshow or a school presentation.'],
          ['Split a long file by hand', 'Save the first half, then load the file again and save the second half. It is a simple way to cut an MP3 into parts.'],
        ],
      },
      {
        h2: 'Trim audio precisely, down to a tenth of a second',
        paras: [
          'Dragging is quick in this MP3 cutter, but sometimes you need a cut that lands exactly on a beat or between two words. So the MP3 cutter gives you three ways to fine-tune the selection.',
        ],
        list: [
          ['Type the times', 'Enter the start and end in seconds, for example 62.5 and 92.5 for a 30-second clip. The time next to each box shows it as minutes and seconds.'],
          ['Use the arrow keys', 'Click a handle, then press the left or right arrow to move it by 0.1 seconds. Hold Shift to move it by a full second.'],
          ['Watch the waveform', 'Flat parts of the wave are silence. Cutting there sounds natural, while cutting through a loud peak can sound abrupt.'],
          ['Check the length on the button', 'The Cut & Save MP3 button always shows how long the finished file will be, so you can hit a 30-second limit exactly.'],
        ],
      },
      {
        h2: 'Fade in and fade out for smooth edges',
        paras: [
          'A hard cut in the middle of a song often leaves a small click or a sudden start. Turning on Fade in raises the volume gently at the start, and Fade out lowers it at the end. Each fade lasts up to three seconds, and on very short clips it uses a third of the clip, so it never swallows the whole selection.',
          'As a rule, use both fades for ringtones and music clips. For speech, on the other hand, you can usually leave them off, because a cut in a pause already sounds clean. Since Preview plays the fades too, you can hear the difference before you save anything.',
        ],
      },
      {
        h2: 'How big will your cut MP3 be?',
        paras: [
          'The size of an MP3 depends on its length and bitrate, so cutting a song down is also the easiest way to make it smaller. At the default 192 kbps, a full four-minute song takes about 5.8 MB, while a 30-second ringtone is only around 0.7 MB.',
          'You can choose 128, 192, 256 or 320 kbps. For music, 192 kbps is a safe standard and 320 kbps keeps the most detail. Meanwhile, Mono is a good fit for speech clips. Keep in mind that the cut part is re-encoded once, so a bitrate equal to or higher than the original keeps the quality. To shrink a file even further, run it through our [MP3 Compressor](/mp3-compressor), which goes down to 32 kbps.',
        ],
        image: { src: '/images/mp3-cutter-clip-size.svg', alt: 'Full song vs ringtone file size', width: 960, height: 330 },
      },
      {
        h2: 'Cut MP3 files on iPhone, Android, Mac or Windows',
        paras: [
          'Because the MP3 cutter runs in your browser, it works the same on a phone and a computer, with nothing to install. On Windows or a Mac, open the page in Chrome, Edge, Firefox or Safari and drag a file from your Music or Downloads folder onto the box. The finished clip lands in Downloads.',
          'On Android, tap Choose File and pick a song from your Music or Downloads folder. After you cut it, you can set it as a ringtone in Settings, then Sound, then Phone ringtone. On an iPhone, Safari saves the clip to the Files app in the Downloads folder. To use it as an iPhone ringtone, import it into GarageBand on the iPhone and export it as a ringtone from there.',
        ],
        image: { src: '/images/mp3-cutter-on-phone-and-computer.svg', alt: 'MP3 cutter on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the MP3 cutter',
      },
      {
        h2: 'Is this online MP3 cutter safe and private?',
        paras: [
          'Many online MP3 cutter sites upload your song to a server, cut it there and send it back. This one does not. Your file is decoded and encoded inside your own browser, with the Web Audio API, FFmpeg compiled to WebAssembly for rarer formats, and the LAME MP3 encoder. As a result, a private voice memo or an unreleased demo never leaves your device.',
          'There is also no sign-up, no watermark and no limit on how many files you cut. In short, [MP3 Converter](/) is free to use, and the only limit is the 500 MB file size, which covers hours of audio.',
        ],
      },
      {
        h2: 'Cut the sound from a video or a recording',
        paras: [
          'You can load a video straight into the MP3 cutter. It takes the sound track from an MP4, MOV, WEBM or MKV file, shows its waveform and saves your selection as MP3. That makes it handy for keeping one quote from a lecture or a song from a concert clip. If you want the whole sound track instead, our [Video to MP3](/video-to-mp3) converter handles many files at once.',
          'Likewise, if you recorded a talk in several parts, cut each one here and then merge them with the [Audio Joiner](/audio-joiner) to get one tidy MP3.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this MP3 cutter free?', a: 'Yes. You can cut and trim as many MP3 files as you like for free, with no account, no watermark and no software to install.' },
      { q: 'How do I make a ringtone with this MP3 cutter?', a: 'Load the song, select about 20 to 30 seconds, turn on Fade in and Fade out, then press Cut & Save MP3. Android can use the MP3 directly. On iPhone, import it into GarageBand and export it as a ringtone.' },
      { q: 'Can I remove a section from the middle of a song?', a: 'Yes. Select the unwanted part and choose Remove selection. The audio before and after it is joined into one MP3.' },
      { q: 'Does cutting an MP3 reduce the quality?', a: 'The part you keep is re-encoded once. Choose a bitrate equal to or higher than the original, such as 192 or 320 kbps, and the difference is very hard to hear.' },
      { q: 'Can I cut audio from a video file?', a: 'Yes. Load an MP4, MOV, WEBM or another video and the MP3 cutter works on its sound track. The result is always an MP3 audio file.' },
      { q: 'Are my files uploaded to a server?', a: 'No. The file is opened, cut and encoded inside your browser, so it never leaves your phone or computer.' },
      { q: 'How precise can the cut be?', a: 'You can type start and end times to a tenth of a second, or select a handle and move it with the arrow keys in 0.1 second steps. Hold Shift to move it by one second.' },
      { q: 'What is the largest file I can cut?', a: 'Files up to 500 MB work. Very long recordings need more memory, so a computer handles them more comfortably than an older phone.' },
      { q: 'Can I cut several MP3 files at once?', a: 'The MP3 cutter works on one file at a time so you can see and hear each cut. Choose another file when you are done with the first one.' },
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
    seoTitle: 'MP3 Compressor – Reduce MP3 File Size Online Free',
    metaTitle: 'MP3 Compressor – Reduce MP3 File Size Online Free',
    metaDescription:
      'Free MP3 compressor: reduce audio file size for email, WhatsApp and uploads. Pick 32 to 160 kbps or mono, batch files, no upload. Compress your MP3 now.',
    h1: 'MP3 Compressor – Reduce Audio File Size',
    lead: 'Our free MP3 compressor makes songs, podcasts and voice recordings smaller so they fit into email, chat apps and upload forms. Pick a lower bitrate in the MP3 compressor, switch speech to mono and see exactly how many percent you saved. Everything runs in your browser, so your files never leave your device.',
    intro: {
      h2: 'Compress MP3 files online without losing what matters',
      paras: [
        'An MP3 file is big for two reasons: it is long, or it was saved at a high bitrate. A four-minute song at 320 kbps takes about 9.6 MB, and an hour-long lecture at the same rate passes 140 MB. That is too large for most email attachments and slow to send over mobile data. However, most of those bits are not needed for casual listening, and for speech they are almost pure waste.',
        'This MP3 compressor re-encodes your file at a lower bitrate that you choose, from 32 to 160 kbps, and can mix stereo down to mono. After each file, it shows the old size, the new size and how much smaller the MP3 became. In addition, you can drop in several files at once, then grab them all with Download all. It also accepts WAV, M4A, FLAC and OGG, so it doubles as a way to turn a huge recording into a small MP3.',
      ],
      image: { src: '/images/mp3-compressor.svg', alt: 'MP3 compressor', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-compress-mp3.svg', alt: 'How to compress an MP3', width: 960, height: 300 },
    howCta: 'Compress your MP3 now',
    steps: [
      ['Pick the bitrate first', 'Below the box, choose the MP3 Quality. The default 96 kbps is a good balance; 64 kbps suits speech and 32 kbps gives the smallest files.'],
      ['Turn on Mono for speech', 'Switch on Mono for podcasts, lectures and voice notes. The whole bitrate then goes to one channel, so speech stays clear even at 64 or 96 kbps.'],
      ['Add your files', 'Tap Choose Files to Compress or drag files onto the box. MP3, WAV, M4A, FLAC, OGG and video files work, up to 500 MB each, and they compress one after another.'],
      ['Check the saving and download', 'Each finished file shows its new size and how many percent smaller it is. Listen on the page, then tap Download, or Download all for several files.'],
    ],
    sections: [
      {
        h2: 'MP3 bitrate guide: how small can you go?',
        paras: [
          'Bitrate is the amount of data used for each second of sound, so it controls file size directly. Halve the bitrate and the file becomes about half as big. The chart shows a four-minute song at different settings.',
        ],
        list: [
          ['32 kbps mono', 'The smallest option. Fine for long voice memos and dictation where only the words matter.'],
          ['64 kbps mono', 'Clear speech for podcasts, audiobooks, lectures and voice notes, at about a fifth of a 320 kbps file.'],
          ['96 kbps', 'A good middle ground for background music, language courses and casual listening on a phone speaker.'],
          ['128 kbps', 'Music still sounds full on headphones, while the file is less than half the size of 320 kbps.'],
          ['160 kbps', 'The highest option here, for music you care about but still want to slim down a little.'],
        ],
        image: { src: '/images/mp3-compressor-size-by-bitrate.svg', alt: 'MP3 file size by bitrate', width: 960, height: 330 },
      },
      {
        h2: 'Reduce MP3 size for email, WhatsApp and uploads',
        paras: [
          'Most people use an MP3 compressor to get under a limit. For example, Gmail and Outlook accept attachments of about 20 to 25 MB, and many school portals, job forms and website builders stop at 10 MB or less. A one-hour recording at 64 kbps mono comes to roughly 29 MB, while 32 kbps mono brings it near 15 MB.',
          'Here is a quick way to plan it before you open the MP3 compressor. One minute of MP3 at 64 kbps takes about 0.5 MB, and at 128 kbps about 1 MB. So multiply the length in minutes and compare it with your limit. If the file is still too big, trim silence and unused parts with our [MP3 Cutter](/mp3-cutter) first, since a shorter file is always smaller.',
        ],
      },
      {
        h2: 'Does compressing an MP3 lower the quality?',
        paras: [
          'Yes, a little. MP3 is a lossy format, so a lower bitrate removes sound details that the encoder thinks you will not notice. Speech handles this very well, because the voice sits in a narrow range. Music, by contrast, starts to sound thinner and slightly “swishy” below about 96 kbps, mostly in cymbals and reverb.',
          'Two tips help. First, compress from the best copy you have, such as the original WAV or a 320 kbps MP3, rather than an already small file. Second, never pick a bitrate higher than the original. A 64 kbps file saved at 128 kbps simply gets bigger without sounding any better, so the MP3 compressor only shows a saving when the new file is really smaller.',
        ],
      },
      {
        h2: 'Compress MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'The MP3 compressor runs in any modern browser, so there is no app to install on any device. On Windows or a Mac, drag several files from Downloads or Music onto the box, then save them all with Download all. On Android, tap Choose Files to Compress, pick recordings from the Recordings or Downloads folder in Chrome, and the smaller copies appear in Downloads.',
          'On an iPhone or iPad, open the page in Safari and choose files from the Files app. The compressed MP3 is saved to Files, in the Downloads folder, ready to attach to Mail or send in a chat. Since nothing is uploaded, it also works on slow mobile data once the page has loaded.',
        ],
        image: { src: '/images/mp3-compressor-on-phone-and-computer.svg', alt: 'MP3 compressor on phone and computer', width: 960, height: 340 },
        cta: 'Try the MP3 compressor',
      },
      {
        h2: 'Private compression that stays on your device',
        paras: [
          'Most online MP3 compressor sites upload your audio, shrink it on a server and send it back. That is slow for large files and risky for private recordings. Here, the compression happens in your browser instead, using the Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. As a result, your files are never sent anywhere.',
          'In addition, there is no sign-up, no watermark and no daily limit. The [MP3 Converter](/) tools are free, and the only rule is a 500 MB maximum per file.',
        ],
      },
      {
        h2: 'Common questions before you compress audio',
        list: [
          ['Is there a lossless MP3 compressor?', 'No. MP3 is always lossy, and zipping an MP3 barely saves space. Lowering the bitrate is the only real way to shrink it.'],
          ['Which is better, mono or a lower bitrate?', 'For speech, try mono first. It saves half the size and you will not hear a difference on one voice.'],
          ['Can I compress a WAV or M4A file?', 'Yes. Any supported audio or video file becomes a small MP3. For a dedicated page, see our [WAV to MP3](/wav-to-mp3) converter.'],
          ['What about a whole podcast episode?', 'Long talks shrink the most. Our [Podcast to MP3](/podcast-to-mp3) page explains the settings podcast hosts expect.'],
        ],
      },
    ],
    faqs: [
      { q: 'Is this MP3 compressor free?', a: 'Yes. You can compress as many MP3 and audio files as you like for free, with no sign-up and no watermark.' },
      { q: 'How much can I reduce an MP3 file size?', a: 'Going from 320 kbps to 64 kbps makes a file about 80 percent smaller. The exact saving depends on the original bitrate, and the tool shows it for every file.' },
      { q: 'Will compressing make my MP3 sound worse?', a: 'Lower bitrates remove some detail. Speech stays clear even at 64 kbps mono, while music starts to sound thinner below about 96 kbps.' },
      { q: 'Why did my compressed file get bigger?', a: 'The original already had a lower bitrate than the one you chose. Pick a lower bitrate than the original to make it smaller.' },
      { q: 'Can I compress several MP3 files at once?', a: 'Yes. Select or drop many files into the MP3 compressor together. They are compressed one after another, and Download all saves the finished files.' },
      { q: 'How do I make an MP3 small enough for email?', a: 'Most email services accept about 20 to 25 MB. Choose 64 kbps with Mono for speech, or 96 to 128 kbps for music, which brings most recordings well under that limit.' },
      { q: 'Are my files uploaded when I compress them?', a: 'No. The MP3 compressor reads, compresses and saves the files inside your browser, so they never leave your device.' },
      { q: 'Does it work on iPhone and Android?', a: 'Yes. Open the MP3 compressor in Safari, Chrome or another browser, choose your files and download the smaller MP3 files. There is no app to install.' },
    ],
    related: ['mp3-cutter', 'wav-to-mp3', 'podcast-to-mp3', 'audio-joiner'],
  },

  // ------------------------------------------------------------------ Joiner
  {
    slug: 'audio-joiner',
    nav: 'Audio Joiner',
    kind: 'join',
    seoTitle: 'Audio Joiner – Merge MP3 Files Online Free into One',
    metaTitle: 'Audio Joiner – Merge MP3 Files Online Free into One',
    metaDescription:
      'Free audio joiner: merge MP3, WAV, M4A and video sound into one MP3. Reorder tracks, add gaps, pick up to 320 kbps. No upload, no sign-up. Join files now.',
    h1: 'Audio Joiner – Merge MP3 Files into One',
    lead: 'Our free audio joiner merges two or more songs, recordings or voice notes into a single MP3, right in your browser. Put the tracks in order, add a short gap if you like, choose the quality and download one file. You can even mix formats, and nothing is uploaded.',
    intro: {
      h2: 'Merge MP3 and other audio files without software',
      paras: [
        'Sometimes one long file is simply easier than ten short ones. For example, a lecture recorded in three parts, a set of WhatsApp voice notes from the same trip, or a workout mix you want to play straight through on a phone or in the car. Joining them by hand in an audio editor means importing tracks, lining them up and exporting. However, an online audio joiner does the same in a few taps.',
        'This tool lets you merge MP3 files with WAV, M4A, FLAC, OGG and even the sound of an MP4 or MOV video. Each file is read in your browser and shown in a numbered list with its length. Then you set the order, pick a gap and press Join. The button even shows the total length before you start, so you know exactly what you will get: one MP3 called joined-audio.mp3.',
      ],
      image: { src: '/images/audio-joiner.svg', alt: 'Audio joiner', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-join-audio-files.svg', alt: 'How to join audio files', width: 960, height: 300 },
    howCta: 'Merge your audio files now',
    steps: [
      ['Add two or more files', 'Tap Choose Files or drag files onto the box. MP3, WAV, M4A, FLAC, OGG, MP4, MOV and more work, up to 500 MB per file. Use Add more files to bring in extra tracks at any time.'],
      ['Put the tracks in order', 'Each file gets a number. Use the up and down arrows next to a track to move it, and the cross to remove one you do not need.'],
      ['Choose a gap and quality', 'Set Gap between files to No gap for a seamless join, or 0.5 to 3 seconds for a pause. Then pick the MP3 quality and turn on Mono if you like.'],
      ['Join and download one MP3', 'Press Join, wait for the encoding to reach 100%, then listen to the result on the page and tap Download to save joined-audio.mp3.'],
    ],
    sections: [
      {
        h2: 'Ways to use an audio joiner',
        paras: [
          'Using an audio joiner sounds like a niche task, yet it comes up all the time. Here are the jobs people use it for most often.',
        ],
        list: [
          ['Lectures and meetings in parts', 'Phones often split long recordings. Join the pieces back into one file that is easy to share and replay.'],
          ['Voice note collections', 'Keep a series of messages, a bedtime story or a family interview together as one MP3.'],
          ['Practice and workout tracks', 'Line up backing tracks or exercises with a 2-second gap, so you have a breath between each one.'],
          ['Podcast intro and outro', 'Attach your intro music before the main recording and an outro after it, then publish one episode file.'],
          ['Party mixes and medleys', 'Join songs with No gap to play straight through on a speaker or car stereo that has no playlist support.'],
        ],
      },
      {
        h2: 'Gaps between tracks: no pause or a short break?',
        paras: [
          'The Gap between files setting adds silence between every pair of tracks. You can choose No gap, 0.5 second, 1 second, 2 seconds or 3 seconds. For music and recordings that were split in the middle of a sentence, No gap joins them seamlessly. For separate songs or lessons, on the other hand, a 1 or 2-second pause makes each start easy to hear.',
          'Note that the audio joiner places tracks back to back and does not crossfade or overlap them. If a track starts or ends too abruptly, trim it and add a fade in or fade out with our [MP3 Cutter](/mp3-cutter) first, then join the cleaned-up files here.',
        ],
      },
      {
        h2: 'How big is a merged MP3 file?',
        paras: [
          'The size of the joined file depends on its total length and the bitrate you pick, not on the size of the originals. At the default 192 kbps, a 9-minute file made from three tracks comes to about 13 MB, roughly the three files added together.',
          'You can choose 128, 192, 256 or 320 kbps. Use 192 or 320 kbps for music, and 128 kbps with Mono for speech to keep long joins small. Also, when you mix mono and stereo files, the mono parts play on both sides so the result sounds even. Need something smaller still? Our [MP3 Compressor](/mp3-compressor) can bring the finished file down to 64 or even 32 kbps.',
        ],
        image: { src: '/images/audio-joiner-file-size.svg', alt: 'Joined MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Merge MP3 files on iPhone, Android, Mac and Windows',
        paras: [
          'The audio joiner runs in your browser, so you can merge MP3 files on any device without an app. On Windows or a Mac, select several files in File Explorer or Finder and drag them onto the box together. The joined MP3 is saved to your Downloads folder.',
          'On Android, tap Choose Files and pick tracks from Music, Recordings or Downloads; Chrome saves the result in Downloads. On an iPhone or iPad, open the page in Safari, choose files from the Files app and tap Download when the join is done. The MP3 appears in Files, inside Downloads. For very long joins, a computer is more comfortable, since all the audio sits in memory while it is encoded.',
        ],
        image: { src: '/images/audio-joiner-on-phone-and-computer.svg', alt: 'Audio joiner on phone and computer', width: 960, height: 340 },
        cta: 'Try the audio joiner',
      },
      {
        h2: 'Is it safe to join audio files online?',
        paras: [
          'Many online joiners upload every track to a server before they merge them. That takes time and means a stranger’s computer holds your recordings. Here, by contrast, the audio joiner decodes and joins the files inside your browser with the Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. As a result, nothing is uploaded at all.',
          'There is also no account, no watermark and no cost. Like every tool on [MP3 Converter](/), the audio joiner is free, and the only limit is 500 MB per file.',
        ],
      },
      {
        h2: 'Join voice memos, video sound and mixed formats',
        paras: [
          'Because the audio joiner reads almost any format, you do not need to convert files first. A WhatsApp voice note in OGG or OPUS, an iPhone memo in M4A and a WAV from a recorder can all sit in the same list. Even a video works: the audio joiner takes its sound track and drops the picture.',
          'So if you record your voice in the browser first, use [Voice to MP3](/voice-to-mp3) and then join the takes here. Likewise, if you only need the sound of one video, [Video to MP3](/video-to-mp3) is the quicker route.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this audio joiner free?', a: 'Yes. You can merge MP3 and other audio files for free, with no sign-up, no watermark and no software to install.' },
      { q: 'How do I merge MP3 files into one?', a: 'Add two or more files, put them in order with the up and down arrows, choose a gap and quality, then press Join and download the single MP3.' },
      { q: 'Can I join files of different formats?', a: 'Yes. You can mix MP3, WAV, M4A, FLAC, OGG and even video files such as MP4 or MOV. The result is always one MP3.' },
      { q: 'Can I add a pause between tracks?', a: 'Yes. Choose a gap of 0.5, 1, 2 or 3 seconds, or No gap for a seamless join.' },
      { q: 'Does the audio joiner crossfade tracks?', a: 'No. Tracks are placed back to back, with or without a gap. To soften the edges, add a fade in or fade out to each track with the MP3 Cutter before joining.' },
      { q: 'How many files can I join?', a: 'There is no fixed number, but the total length matters because all the audio is held in memory. Several hours of audio works best on a computer.' },
      { q: 'Can I join a mono and a stereo file?', a: 'Yes. Mono parts are played on both sides, so the joined stereo file sounds even. Turn on Mono if you want a one-channel result instead.' },
      { q: 'Are my files uploaded to a server?', a: 'No. Every file is read and joined inside your browser, so your audio never leaves your device.' },
      { q: 'Will joining reduce the sound quality?', a: 'The joined file is encoded once as MP3. Choose 192 or 320 kbps for music and the result sounds the same as the originals to most listeners.' },
    ],
    related: ['mp3-cutter', 'mp3-compressor', 'voice-to-mp3', 'wav-to-mp3'],
  },

  // ------------------------------------------------------------------ WMA
  {
    slug: 'wma-to-mp3',
    nav: 'WMA to MP3',
    kind: 'convert',
    tool: { heading: 'Upload WMA files to convert to MP3.', formats: 'WMA, WMA Pro, WMA Lossless, ASF', buttonLabel: 'Choose WMA Files', showRecord: false },
    seoTitle: 'WMA to MP3 Online Converter – Convert WMA Audio',
    metaTitle: 'WMA to MP3 Online Converter – Convert WMA Audio',
    metaDescription:
      'Easily convert WMA audio files to MP3 online. Our free WMA to MP3 converter makes audio conversion quick and simple.',
    h1: 'WMA to MP3 & MP3 to WMA Converter',
    lead: 'Our free WMA to MP3 converter turns old Windows Media Audio files into MP3s that play on iPhone, Mac, Android and almost any speaker. Convert a whole album at once, right in your browser, or switch to MP3 to WMA when an older Windows program asks for it.',
    intro: {
      h2: 'Rescue your Windows Media Audio collection',
      paras: [
        'Microsoft launched Windows Media Audio in 1999 as its rival to MP3. For years, Windows Media Player saved every ripped CD as WMA by default. So if you copied your CDs on a Windows PC in the 2000s, there is a good chance your Music folder is still full of .wma files with names like “01 Track Title.wma”.',
        'The trouble starts when you leave Windows. iPhones, iPads and Macs cannot play WMA without extra apps, Apple Music and iTunes on a Mac will not import it, and many Android music players skip it too. A WMA to MP3 conversion fixes all of that at once. MP3 plays everywhere, from phones and smart TVs to old MP3 players, so your music stays usable for years to come.',
      ],
      image: { src: '/images/wma-to-mp3-converter.svg', alt: 'WMA to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-wma-to-mp3.svg', alt: 'How to convert WMA to MP3', width: 960, height: 300 },
    howCta: 'Convert WMA to MP3 now',
    steps: [
      ['Stay on WMA → MP3', 'This direction is selected when the page opens. The MP3 → WMA tab is only for going the other way.'],
      ['Set the MP3 quality', 'Choose 128, 192, 256 or 320 kbps. 192 kbps suits most old CD rips. Pick the setting before adding files, since each file keeps the quality chosen when it was added.'],
      ['Add the WMA files', 'Tap Choose WMA Files and select a whole album, or drag a batch of files onto the box. They convert automatically, one after another.'],
      ['Save your MP3s', 'Listen to a track in the built-in player, then tap Download, or use Download all to save every finished file with its original name.'],
    ],
    sections: [
      {
        h2: 'Which WMA versions can you convert?',
        paras: [
          'Windows Media Audio is not one single codec. Over the years Microsoft released four main types, and this WMA to MP3 tool reads all of them.',
        ],
        list: [
          ['WMA Standard', 'The everyday type used for CD rips and old music downloads. Usually 128 to 192 kbps.'],
          ['WMA Pro', 'A higher-quality version that can hold 5.1 surround. Surround files are mixed down to stereo.'],
          ['WMA Lossless', 'A perfect copy of the CD. Convert it at 320 kbps to keep as much detail as possible.'],
          ['WMA Voice', 'A speech codec from old dictation and voice recorder software. 128 kbps with Mono is more than enough.'],
        ],
      },
      {
        h2: 'WMA vs MP3 size and the right bitrate',
        paras: [
          'At the same bitrate, WMA and MP3 files are the same size, so a WMA to MP3 switch costs no extra space. A 192 kbps file of either type uses about 1.4 MB per minute, and 128 kbps uses roughly 1 MB. In other words, converting does not make your library bigger as long as you match the bitrate.',
          'To find the original bitrate on Windows, right-click a WMA file, choose Properties and open the Details tab. Then pick the same MP3 bitrate or the next step up. For example, a 128 kbps WMA converts well at 192 kbps, which avoids adding audible loss. However, going higher than that cannot add detail the WMA never had.',
        ],
        image: { src: '/images/wma-to-mp3-vs-mp3-size.svg', alt: 'WMA vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Play converted WMA files on iPhone, Android, Mac and Windows',
        paras: [
          'Because this WMA to MP3 converter works in the browser, the same page runs on every system. On Windows or Mac, the MP3s go to your Downloads folder. On a Mac you can then drag them into the Music app, which never accepted WMA in the first place. On Android, Chrome saves them to Downloads, where apps such as VLC or your phone’s music player pick them up.',
          'On an iPhone or iPad, open this page in Safari and select the WMA files from the Files app, for example from iCloud Drive or a USB stick. After you tap Download, the MP3s appear in Files › Downloads. From there you can play them or share them with other apps.',
        ],
        image: { src: '/images/wma-to-mp3-on-phone-and-computer.svg', alt: 'WMA to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the WMA to MP3 converter',
      },
      {
        h2: 'Protected WMA files that cannot be converted',
        paras: [
          'Some songs sold by online music stores in the 2000s came as WMA with copy protection, also called DRM. Those files only play on players that were authorised at the time, and no honest converter can open them. If a file shows an error saying it may be protected, that is usually the reason.',
          'Happily, CDs you ripped yourself with Windows Media Player are not protected, unless the old “Copy protect music” option was switched on. Those WMA files convert to MP3 without any problem.',
        ],
      },
      {
        h2: 'Tips for converting a whole WMA music library',
        list: [
          ['Work album by album', 'Select one album folder at a time for each WMA to MP3 batch. Files keep their names, so track numbers like “01” stay in order.'],
          ['Keep the WMA originals', 'Hold on to them until you have checked the new MP3s play correctly.'],
          ['Re-add song details', 'Artist, album and cover art are not copied into the MP3, so a free tag editor can fill them in again.'],
          ['Join short tracks', 'Turn a set of short recordings into one file with our [Audio Joiner](/audio-joiner).'],
        ],
      },
      {
        h2: 'Does WMA to MP3 lose quality? Common questions',
        paras: [
          'Both formats are lossy, so a WMA to MP3 conversion can change a tiny amount of detail. In practice, matching or slightly raising the bitrate makes the difference impossible to hear for nearly everyone. WMA Lossless is the exception: it starts as a perfect copy, so 320 kbps is the best match.',
          'Can you convert WMA to MP3 without Windows Media Player or iTunes? Yes. This page needs no software at all, and it works on a Mac or Chromebook just as well as on a PC. Have other formats in the same library? The [M4A to MP3](/m4a-to-mp3) and [FLAC to MP3](/flac-to-mp3) converters work the same way.',
        ],
      },
      {
        h2: 'Is it safe to convert WMA files here?',
        paras: [
          'Yes. [MP3 Converter](/) handles every WMA to MP3 job inside your browser, so your music is never uploaded to a server. There is no account to create, no email to share and no software that might bundle adware. In addition, the MP3 files contain only your audio, with no watermark or added sound.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this WMA to MP3 converter free?', a: 'Yes. It is free to use, with no sign-up, no watermark and no daily limit.' },
      { q: 'Can I batch convert WMA to MP3?', a: 'Yes. Select or drop many WMA files at once. They are converted one after another, and Download all saves the finished MP3s.' },
      { q: 'What bitrate should I choose for WMA to MP3?', a: 'Match the original or go one step higher. 192 kbps suits most WMA CD rips, and 320 kbps suits WMA Lossless files.' },
      { q: 'Can I play WMA files on an iPhone or Mac?', a: 'Not natively. Convert them to MP3 here, then play them in the Files app, the Music app or any other player.' },
      { q: 'Why does my WMA file fail to convert?', a: 'The most common reason is copy protection (DRM) on songs bought from old online stores. Damaged files can also fail. Unprotected CD rips convert normally.' },
      { q: 'Does it convert WMA Lossless and WMA Pro?', a: 'Yes. Standard, Pro, Lossless and Voice files are supported. Surround WMA Pro files are mixed down to stereo.' },
      { q: 'Will song titles and album art be copied?', a: 'The file name is kept, but tags such as artist, album and cover art are not copied. A free tag editor can add them back.' },
      { q: 'Is there a file size limit?', a: 'Each file can be up to 500 MB, which covers even long WMA Lossless recordings.' },
      { q: 'Are my WMA files uploaded?', a: 'No. The whole conversion runs in your browser, so your music stays on your device.' },
    ],
    related: ['m4a-to-mp3', 'flac-to-mp3', 'audio-joiner', 'mp3-compressor'],
  },

  // ------------------------------------------------------------------ AMR
  {
    slug: 'amr-to-mp3',
    nav: 'AMR to MP3',
    kind: 'convert',
    tool: { heading: 'Upload AMR recordings to convert to MP3.', formats: 'AMR, AMR-WB (.awb), 3GA, 3GP', buttonLabel: 'Choose AMR Files', defaultBitrate: 128, defaultMono: true, showRecord: false },
    seoTitle: 'Convert AMR to MP3 Online – Free & Fast',
    metaTitle: 'Convert AMR to MP3 Online – Free & Fast',
    metaDescription:
      'Convert AMR files to MP3 quickly and easily. Use our free online converter to create compatible MP3 audio files.',
    h1: 'AMR to MP3 & MP3 to AMR Converter',
    lead: 'Our free AMR to MP3 converter opens voice memos and call recordings from older phones and saves them as MP3 files that play on any computer, phone or messaging app. It runs in your browser, and you can also switch to MP3 to AMR for tiny voice files.',
    intro: {
      h2: 'Turn hard-to-open voice recordings into MP3',
      paras: [
        'AMR, short for Adaptive Multi-Rate, is a speech codec built for mobile phone calls. It squeezes a voice into very few bits, so a minute of speech can take less than 100 KB. That is why feature phones, older Android voice recorders and many call recorder apps saved their recordings as .amr, .awb or .3ga files.',
        'Small files are great, but compatibility is poor. Windows Media Player, the Mac Music app and most email previews refuse to play AMR, and many modern apps no longer support it. As a result, interviews, lectures and family voice notes end up locked away. An AMR to MP3 conversion solves that, because MP3 opens on practically every device made in the last twenty years.',
      ],
      image: { src: '/images/amr-to-mp3-converter.svg', alt: 'AMR to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-amr-to-mp3.svg', alt: 'How to convert AMR to MP3', width: 960, height: 300 },
    howCta: 'Convert AMR to MP3 now',
    steps: [
      ['Leave AMR → MP3 selected', 'The page opens in this direction. Choose MP3 → AMR only when you want to create AMR files.'],
      ['Keep the voice settings', 'The converter starts at 128 kbps with Mono switched on, which already suits phone-quality speech. Change them before adding files if you prefer.'],
      ['Add your recordings', 'Tap Choose AMR Files or drag .amr, .awb, .3ga or .3gp files onto the box. Each one converts automatically, one after another.'],
      ['Download the MP3s', 'Play a file in the preview to check it, then tap Download. With several files ready, Download all saves them in one go.'],
    ],
    sections: [
      {
        h2: 'Where AMR recordings usually come from',
        list: [
          ['Older Android voice recorders', 'Many built-in recorder apps saved .amr or .3ga files, especially on Samsung phones.'],
          ['Call recorder apps', 'AMR was a popular choice for call recordings because a long call stays very small.'],
          ['Feature phones', 'Classic Nokia, Sony Ericsson and similar phones recorded voice memos in AMR.'],
          ['Voicemail and MMS exports', 'Voice messages saved from carrier systems or old MMS backups are often AMR.'],
        ],
      },
      {
        h2: 'AMR-NB and AMR-WB: what is the difference?',
        paras: [
          'There are two main flavours of AMR, and this AMR to MP3 converter reads both. The difference is how much of the voice they capture.',
        ],
        list: [
          ['AMR-NB (.amr)', 'Narrowband at 8 kHz, with 4.75 to 12.2 kbps. It sounds like a classic phone call.'],
          ['AMR-WB (.awb)', 'Wideband at 16 kHz, with 6.6 to 23.85 kbps. Also known as HD Voice, it sounds clearer and more natural.'],
        ],
      },
      {
        h2: 'AMR vs MP3 file size explained',
        paras: [
          'AMR is extremely compact. At 12.2 kbps a minute of speech takes about 0.09 MB, and at 4.75 kbps only about 0.04 MB. An MP3 at 128 kbps, by contrast, uses roughly 1 MB per minute. So after an AMR to MP3 conversion, expect the new file to be around ten times larger than the original.',
          'That growth is the price of compatibility, not a sign of better sound. Still, if size matters, for example for email attachments, run the finished file through our [MP3 Compressor](/mp3-compressor). At 64 kbps mono a voice recording stays clear and takes about 0.5 MB per minute.',
        ],
        image: { src: '/images/amr-to-mp3-vs-mp3-size.svg', alt: 'AMR vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Convert AMR to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'First, get the recordings off your phone. On Android, connect the phone to a computer with a USB cable and look in folders such as Recordings, Sounds or Voice Recorder, or open the files straight from the Files app. On a computer, the converted MP3s then land in your Downloads folder on Windows and Mac alike.',
          'You can also convert directly on a phone. On Android, Chrome saves the MP3 to Downloads. On an iPhone, open this page in Safari, pick the AMR file from the Files app or iCloud Drive, and the MP3 appears in Files › Downloads after you tap Download. From there you can share it in WhatsApp, Mail or any other app.',
        ],
        image: { src: '/images/amr-to-mp3-on-phone-and-computer.svg', alt: 'AMR to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the AMR to MP3 converter',
      },
      {
        h2: 'Best MP3 settings for voice recordings',
        paras: [
          'AMR stores speech at 4.75 to 23.85 kbps, so for AMR to MP3 a high MP3 bitrate cannot add clarity that was never recorded. The default of 128 kbps with Mono on already keeps every detail of the original. Choosing 256 or 320 kbps only makes the file bigger, so there is no reason to raise it.',
          'Once your AMR to MP3 files are ready, a little tidying helps. For instance, cut long silences or the start of a call with our [MP3 Cutter](/mp3-cutter). And if you want to record a fresh voice memo straight to MP3, the [Voice to MP3](/voice-to-mp3) recorder does that in your browser.',
        ],
      },
      {
        h2: 'Why does the MP3 still sound like a phone call?',
        paras: [
          'An AMR to MP3 file keeps the original character. Narrowband AMR records only the frequencies a phone line needs, roughly the range of a voice on a call. The MP3 keeps that sound exactly as it is. However, no converter can recreate high frequencies that were thrown away when the recording was made, so the result will not sound like a studio microphone.',
          'Is AMR to MP3 lossless, then? Not strictly, since both formats are lossy. In practice, though, 128 kbps MP3 is far more detailed than any AMR mode, so you will not hear any extra loss.',
        ],
      },
      {
        h2: 'Private conversion for personal recordings',
        paras: [
          'Voice memos and calls are often very personal. With [MP3 Converter](/), the AMR to MP3 conversion happens entirely inside your browser, so your recordings are never uploaded to a server. There is no account, no email and nothing to install.',
          'Please note that recording laws differ between countries. If you convert calls you recorded, make sure you had the consent your local law requires before you share them.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this AMR to MP3 converter free?', a: 'Yes. You can convert as many AMR files as you like for free, with no sign-up and no watermark.' },
      { q: 'How do I open an AMR file on Windows or Mac?', a: 'Convert it to MP3 on this page. The MP3 then opens in Windows Media Player, the Music app, VLC or any web browser.' },
      { q: 'What MP3 bitrate is best for AMR recordings?', a: 'Keep the default 128 kbps with Mono on. AMR is speech-only, so higher bitrates only make the file bigger.' },
      { q: 'Why is the MP3 larger than the AMR file?', a: 'AMR is a very compact speech codec, while 128 kbps MP3 uses about 1 MB per minute. The MP3 is roughly ten times larger but plays everywhere.' },
      { q: 'Can I convert AWB, 3GA and 3GP files?', a: 'Yes. Wideband .awb files, Samsung .3ga voice recordings and .3gp files with AMR audio all convert the same way.' },
      { q: 'Can I convert AMR to MP3 on an iPhone?', a: 'Yes. Open this page in Safari, choose the AMR file from the Files app and tap Download when it is ready. The MP3 is saved in Files under Downloads.' },
      { q: 'Can I convert several voice recordings at once?', a: 'Yes. Select or drop many files together. They convert one by one, and Download all saves the finished MP3s.' },
      { q: 'Is it legal to convert call recordings?', a: 'Converting the file is fine, but recording and sharing calls is regulated in many countries. Make sure you have the consent your local law requires.' },
      { q: 'Are my AMR recordings uploaded?', a: 'No. Everything runs in your browser, so your recordings never leave your device.' },
    ],
    related: ['voice-to-mp3', 'm4a-to-mp3', 'mp3-cutter', 'opus-to-mp3'],
  },

  // ------------------------------------------------------------------ CAF
  {
    slug: 'caf-to-mp3',
    nav: 'CAF to MP3',
    kind: 'convert',
    tool: { heading: 'Upload CAF files to convert to MP3.', formats: 'CAF with ALAC, AAC, PCM or AMR audio', buttonLabel: 'Choose CAF Files', showRecord: false },
    seoTitle: 'Free CAF MP3 Converter Online – Fast Conversion',
    metaTitle: 'Free CAF MP3 Converter Online – Fast Conversion',
    metaDescription:
      'Convert CAF audio files into MP3 online for free. Get fast, simple, and convenient audio conversion without complicated software.',
    h1: 'CAF to MP3 & MP3 to CAF Converter',
    lead: 'Our free CAF to MP3 converter turns Apple Core Audio Format (.caf) files into MP3s that play on Windows, Android, the web and every music player. It works in your browser, and the MP3 to CAF direction is one tap away when you need files for Xcode or GarageBand.',
    intro: {
      h2: 'Open Apple Core Audio files anywhere',
      paras: [
        'CAF stands for Core Audio Format, a container Apple designed for macOS and iOS. It can hold many kinds of audio, such as uncompressed PCM, Apple Lossless (ALAC), AAC or AMR. Unlike WAV and AIFF, it has no 4 GB size limit, so it suits very long recordings. You will find CAF files in Apple Loops, Xcode projects, iPhone system sounds and the output of some recording apps.',
        'Outside the Apple world, however, almost nothing opens a .caf file. Windows Media Player, Android music apps and most websites show an error. A CAF to MP3 conversion fixes that in seconds. The converter reads the audio inside the container, whatever codec it uses, and saves a standard MP3 at the quality you choose.',
      ],
      image: { src: '/images/caf-to-mp3-converter.svg', alt: 'CAF to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-caf-to-mp3.svg', alt: 'How to convert CAF to MP3', width: 960, height: 300 },
    howCta: 'Convert CAF to MP3 now',
    steps: [
      ['Use the CAF → MP3 tab', 'It is selected when the page loads. Switch to MP3 → CAF only if you want to create CAF files.'],
      ['Pick a bitrate', 'Choose 320 kbps for music and sound design, or 128 kbps with Mono for voice. Do this before adding files, because each file keeps the settings active when it was added.'],
      ['Add your CAF files', 'Tap Choose CAF Files or drag one or many .caf files onto the box. The conversion starts automatically.'],
      ['Download the MP3', 'Check the result in the preview player, then tap Download, or Download all when several files are done.'],
    ],
    sections: [
      {
        h2: 'What is inside your CAF file?',
        paras: [
          'A CAF file is only a wrapper, so the best CAF to MP3 setting depends on the audio stored inside. On a Mac you can check it in Terminal with the command afinfo followed by the file name. Then use this guide:',
        ],
        list: [
          ['PCM (uncompressed)', 'Studio-quality sound in a very large file. Convert at 256 or 320 kbps.'],
          ['Apple Lossless (ALAC)', 'A perfect copy of the source. 320 kbps keeps the most detail.'],
          ['AAC', 'Already compressed. 192 kbps is a good match and keeps the file small.'],
          ['AMR', 'Phone-quality speech. 128 kbps with Mono is more than enough.'],
        ],
      },
      {
        h2: 'CAF vs MP3 size: from 10 MB to about 1 MB per minute',
        paras: [
          'Uncompressed CAF at CD quality uses about 10 MB for every minute of stereo sound. With Apple Lossless inside, the same minute shrinks to roughly 5.5 MB. A 192 kbps MP3, meanwhile, needs only about 1.4 MB, and 128 kbps about 1 MB. So a CAF to MP3 conversion of a PCM file can make it seven to ten times smaller.',
          'That makes a big difference when you email a demo or upload a sound to a website. For the smallest possible files, run the MP3 through our [MP3 Compressor](/mp3-compressor) afterwards. On the other hand, if you need a lossless copy for editing on Windows, keep the original CAF as your master.',
        ],
        image: { src: '/images/caf-to-mp3-vs-mp3-size.svg', alt: 'CAF vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Typical uses for CAF to MP3',
        list: [
          ['Share a GarageBand or Logic idea', 'Send a quick demo or bounced loop to bandmates who use Windows or Android.'],
          ['Reuse app and game sounds', 'Bring the sound effects from your own Xcode project into a web or Android version.'],
          ['Archive old recordings', 'Keep recordings saved as CAF in a format that will still open in many years.'],
          ['Preview sounds quickly', 'Listen to a folder of .caf effects on a PC without installing Apple software.'],
        ],
      },
      {
        h2: 'Convert CAF to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'This CAF to MP3 converter runs in any modern browser. On a Mac, drag the .caf file from Finder onto the box, and the MP3 goes to your Downloads folder. On Windows, the steps are the same in Chrome, Edge or Firefox, so you no longer need iTunes or other Apple software just to hear a CAF file.',
          'On an iPhone or iPad, open this page in Safari and choose the CAF file from the Files app. After you tap Download, the MP3 is saved in Files › Downloads. On Android, Chrome saves it to the Downloads folder, ready for any music player or messaging app.',
        ],
        image: { src: '/images/caf-to-mp3-on-phone-and-computer.svg', alt: 'CAF to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the CAF to MP3 converter',
      },
      {
        h2: 'Can Windows and Android play CAF files?',
        paras: [
          'Not out of the box. CAF is an Apple format, and Windows and Android do not include support for it. Some third-party players can open it, but the MP3 route is simpler, because then every device can play the file without extra apps.',
          'Is CAF to MP3 lossless? No, MP3 is always lossy. Yet at 320 kbps the difference is very hard to hear, even with a lossless ALAC or PCM source. If your project can also export WAV, our [WAV to MP3](/wav-to-mp3) converter works the same way. For Apple Lossless music in .m4a files, use our [ALAC to MP3](/alac-to-mp3) converter.',
        ],
      },
      {
        h2: 'Loops, markers and other CAF extras',
        paras: [
          'Besides audio, a CAF file can store extra data that a CAF to MP3 conversion leaves behind, such as markers, loop regions and other details used by Apple apps. An MP3 file only stores the sound, so this information is not carried over. The audio itself, however, is converted in full, from the first sample to the last.',
          'In every CAF to MP3 job, multichannel files are mixed down to stereo, and the MP3 is created at the standard 44.1 kHz sample rate.',
        ],
      },
      {
        h2: 'Safe and private CAF conversion',
        paras: [
          'Unreleased songs, client sound effects and private voice notes should stay private. [MP3 Converter](/) runs each CAF to MP3 conversion inside your own browser, so nothing is uploaded to a server. In addition, there is no sign-up, no software to install and no watermark in your MP3.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this CAF to MP3 converter free?', a: 'Yes. It is free to use, with no account, no watermark and no limit on the number of files.' },
      { q: 'What is a .caf file?', a: 'CAF (Core Audio Format) is an Apple audio container used on macOS and iOS. It can hold PCM, Apple Lossless, AAC or AMR audio.' },
      { q: 'Can Windows play CAF files?', a: 'Not without extra software. Convert the file to MP3 here, and Windows Media Player or any other player can open it.' },
      { q: 'Which MP3 bitrate should I use for CAF files?', a: 'Use 320 kbps for PCM or Apple Lossless audio, 192 kbps for AAC, and 128 kbps with Mono for voice recordings.' },
      { q: 'Is CAF the same as M4A?', a: 'No. Both can hold AAC or Apple Lossless audio, but CAF is a different container that mainly Apple software reads.' },
      { q: 'Will loops and markers be kept?', a: 'No. MP3 stores only audio, so loop regions, markers and similar CAF data are not carried over.' },
      { q: 'Can I convert many CAF files at once?', a: 'Yes. Select or drop a whole folder of CAF files. They are converted one by one, and Download all saves the finished MP3s.' },
      { q: 'Is there a size limit for CAF files?', a: 'Each file can be up to 500 MB, which is about 50 minutes of uncompressed CD-quality stereo audio.' },
      { q: 'Are my CAF files uploaded?', a: 'No. The conversion happens inside your browser, and your files stay on your device.' },
    ],
    related: ['alac-to-mp3', 'm4a-to-mp3', 'wav-to-mp3', 'mp3-compressor'],
  },

  // ------------------------------------------------------------------ AC3
  {
    slug: 'ac3-to-mp3',
    nav: 'AC3 to MP3',
    kind: 'convert',
    tool: { heading: 'Upload AC3 files to convert to MP3.', formats: 'AC3, E-AC3 (Dolby Digital Plus), MKV/MP4/VOB with AC3 audio', buttonLabel: 'Choose AC3 Files', defaultBitrate: 256, showRecord: false },
    seoTitle: 'AC3 to MP3 – Convert AC3 Files to MP3 Online Free',
    metaTitle: 'AC3 to MP3 – Convert AC3 Files to MP3 Online Free',
    metaDescription:
      'Convert AC3 files to MP3 online for free. Quickly transform AC3 audio into MP3 format with our simple and reliable converter.',
    h1: 'AC3 to MP3 & MP3 to AC3 Converter',
    lead: 'Our free AC3 to MP3 converter turns Dolby Digital sound from movies, DVDs and TV recordings into stereo MP3 files for headphones, phones and car stereos. It runs in your browser, and you can switch to MP3 to AC3 whenever a DVD project needs Dolby Digital audio.',
    intro: {
      h2: 'From Dolby Digital surround to everyday stereo',
      paras: [
        'AC3 is the file format behind Dolby Digital, the surround sound used on DVDs, Blu-ray discs, digital TV and many movie files. A typical AC3 track carries 5.1 channels: front left and right, a centre speaker, two surround speakers and a low-frequency (subwoofer) channel. On DVDs it usually runs at 384 or 448 kbps.',
        'That is ideal for a home cinema, yet most phones, music apps and car stereos cannot play AC3 at all. An AC3 to MP3 conversion gives you a normal stereo file instead. Rather than keeping only the front speakers, the converter blends the centre and surround channels into left and right. As a result, dialogue, which mostly lives in the centre channel, stays clear and easy to follow.',
      ],
      image: { src: '/images/ac3-to-mp3-converter.svg', alt: 'AC3 to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-ac3-to-mp3.svg', alt: 'How to convert AC3 to MP3', width: 960, height: 300 },
    howCta: 'Convert AC3 to MP3 now',
    steps: [
      ['Stay on AC3 → MP3', 'The page opens in this direction. Use the MP3 → AC3 tab only to create Dolby Digital files.'],
      ['Check the bitrate', 'The quality starts at 256 kbps, a good match for movie soundtracks. Pick 320 kbps for concerts. Choose before adding files, since each file keeps the setting active when it was added.'],
      ['Add AC3 or video files', 'Tap Choose AC3 Files or drag .ac3, .eac3 or movie files onto the box. Conversion starts automatically, and surround sound is mixed down to stereo.'],
      ['Download the stereo MP3', 'Preview the result, then tap Download. When several files are done, Download all saves them together.'],
    ],
    sections: [
      {
        h2: 'Where AC3 audio usually comes from',
        list: [
          ['DVD and Blu-ray rips', 'Movie files from your own discs often keep the original Dolby Digital track, either as .ac3 or inside an MKV.'],
          ['TV recordings', 'Digital TV broadcasts and recorder boxes frequently store sound as AC3.'],
          ['Streaming-style files', 'E-AC3, also called Dolby Digital Plus, is common in newer movie and series files.'],
          ['Video editing exports', 'Some editors and DVD tools export the soundtrack as a separate .ac3 file.'],
        ],
      },
      {
        h2: 'How 5.1 surround becomes stereo MP3',
        paras: [
          'For every AC3 to MP3 file, the converter uses standard down-mix rules. The centre channel is added to both the left and right sides at a lower level, and each surround channel is blended into its own side. So voices stay centred, and effects still move from left to right.',
          'The separate low-frequency (LFE) channel is not added, which is normal for a stereo down-mix. Most bass is also present in the main channels, so music and effects still sound full on headphones. Meanwhile, 7.1 mixes and E-AC3 files are handled the same way.',
        ],
      },
      {
        h2: 'AC3 vs MP3: bitrate and size guide',
        paras: [
          'A 5.1 AC3 track at 448 kbps uses about 3.4 MB per minute, while a stereo AC3 track at 192 kbps needs about 1.4 MB. An MP3 at 192 kbps is the same size as that stereo version, and 128 kbps comes in at roughly 1 MB per minute. In short, the MP3 is usually smaller than a surround AC3 file because it carries two channels instead of six at a lower bitrate.',
          'For AC3 to MP3 conversions of films and TV shows, the default 256 kbps keeps dialogue and effects crisp. For a concert film or a music soundtrack, choose 320 kbps. And for a talk show or documentary you only listen to, 128 kbps is perfectly fine.',
        ],
        image: { src: '/images/ac3-to-mp3-vs-mp3-size.svg', alt: 'AC3 vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Convert AC3 to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'Since the AC3 to MP3 tool runs in your browser, it works on any system without codec packs. On Windows and Mac, the stereo MP3 lands in your Downloads folder. On Android, Chrome saves it to Downloads, ready for your music player. On an iPhone or iPad, open the page in Safari, choose the file in the Files app, and the MP3 appears in Files › Downloads.',
          'Movie files can be large, though. Each file may be up to 500 MB, and big files need plenty of memory, so a laptop or desktop is the best choice for a full film. Phones handle AC3 to MP3 jobs for short clips and separate .ac3 tracks very well.',
        ],
        image: { src: '/images/ac3-to-mp3-on-phone-and-computer.svg', alt: 'AC3 to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the AC3 to MP3 converter',
      },
      {
        h2: 'Popular reasons to convert AC3',
        list: [
          ['Listen to a film on the go', 'Enjoy the dialogue or soundtrack of your own movies during a commute or a run.'],
          ['Language learning', 'Replay scenes from a film in the language you are studying, without the screen.'],
          ['Edit the sound', 'After an AC3 to MP3 conversion, most audio editors open the file without special Dolby plug-ins.'],
          ['Save a concert recording', 'Keep the audio of a recorded TV concert as a regular music file.'],
        ],
      },
      {
        h2: 'Is AC3 to MP3 lossless? Common questions',
        paras: [
          'No. Both AC3 and MP3 are lossy formats, and the surround channels are combined into two. However, at 256 or 320 kbps the stereo result sounds clean and natural, and most listeners hear no loss at all on phones or headphones.',
          'Do you need a separate AC3 file? Not always. You can add a video that contains AC3 sound, and the converter extracts the audio for you. For a full movie file, our [MKV to MP3](/mkv-to-mp3) and [MP4 to MP3](/mp4-to-mp3) pages work the same way. Afterwards, trim a favourite scene or song with the [MP3 Cutter](/mp3-cutter).',
        ],
      },
      {
        h2: 'Private, safe and fair use',
        paras: [
          'Every AC3 to MP3 conversion on [MP3 Converter](/) runs inside your own browser. Your movie files are never uploaded, there is no account to create, and nothing is installed on your computer. The MP3 contains only your audio, with no watermark.',
          'Please convert only files you own or have the right to use. Unprotected tracks from your own discs and recordings work well. Copy-protected commercial DVDs and Blu-rays, on the other hand, cannot be read by this AC3 to MP3 tool.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this AC3 to MP3 converter free?', a: 'Yes. It is free, with no sign-up, no watermark and no limit on how many files you convert.' },
      { q: 'Will I lose the surround sound?', a: 'The MP3 is stereo, because most players use two speakers. The centre and surround channels are blended into left and right, so dialogue and effects are kept.' },
      { q: 'Can I convert E-AC3 (Dolby Digital Plus) to MP3?', a: 'Yes. E-AC3 files and videos with E-AC3 sound are supported and mixed down to stereo.' },
      { q: 'What bitrate is best for AC3 to MP3?', a: '256 kbps, the default, works well for films and TV. Choose 320 kbps for concerts and music.' },
      { q: 'Can I extract AC3 audio from a DVD or MKV file?', a: 'Yes, from unprotected files such as your own VOB or MKV files. Copy-protected discs cannot be read.' },
      { q: 'Why can my phone not play AC3 files?', a: 'Dolby Digital is designed for home cinema equipment, and many phones and music apps do not include an AC3 decoder. Converting to MP3 solves this.' },
      { q: 'Why does the first file take a little longer?', a: 'Many browsers cannot decode AC3 themselves, so the page loads its FFmpeg decoder of about 32 MB once. After that it is cached.' },
      { q: 'Is there a file size limit?', a: 'Yes. Each file can be up to 500 MB. Very large movies convert most reliably on a computer.' },
      { q: 'Are my files uploaded to a server?', a: 'No. The conversion runs entirely in your browser, so your files stay on your device.' },
    ],
    related: ['mkv-to-mp3', 'video-to-mp3', 'mp4-to-mp3', 'mp3-cutter'],
  },

  // ------------------------------------------------------------------ ALAC
  {
    slug: 'alac-to-mp3',
    nav: 'ALAC to MP3',
    kind: 'convert',
    tool: { heading: 'Upload Apple Lossless (ALAC) files to convert to MP3.', formats: 'ALAC in .m4a or .caf', buttonLabel: 'Choose ALAC Files', defaultBitrate: 320, showRecord: false },
    seoTitle: 'Convert ALAC to MP3 in Seconds – Free & Unlimited',
    metaTitle: 'Convert ALAC to MP3 in Seconds – Free & Unlimited',
    metaDescription:
      'Free ALAC to MP3 converter that keeps sound quality high and file size small. Works in any browser, no download needed.',
    h1: 'ALAC to MP3 & MP3 to ALAC Converter',
    lead: 'Our free ALAC to MP3 converter makes compact 320 kbps copies of your Apple Lossless music for Android phones, Windows PCs, USB sticks and car stereos. Everything runs in your browser, and the MP3 to ALAC direction is there when you want your library in one format.',
    intro: {
      h2: 'Portable MP3 copies of your Apple Lossless library',
      paras: [
        'ALAC, the Apple Lossless Audio Codec, keeps every detail of the original recording while taking roughly half the space of a WAV file. Apple released it in 2004 and made it open source in 2011. Many people choose it when they rip CDs in iTunes or the Music app. The files usually end in .m4a, so they look just like ordinary AAC songs, although they are several times larger.',
        'Lossless files are wonderful at home, yet they fill a phone quickly, and some players outside the Apple world cannot open them. An ALAC to MP3 conversion gives you a smaller copy that plays almost anywhere. Because the source is lossless, the converter starts at 320 kbps, the highest MP3 quality. Meanwhile, your Apple Lossless originals stay untouched as your master archive.',
      ],
      image: { src: '/images/alac-to-mp3-converter.svg', alt: 'ALAC to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-alac-to-mp3.svg', alt: 'How to convert ALAC to MP3', width: 960, height: 300 },
    howCta: 'Convert ALAC to MP3 now',
    steps: [
      ['Keep ALAC → MP3 selected', 'This is the default direction. The MP3 → ALAC tab only matters when you want to create Apple Lossless files.'],
      ['Leave 320 kbps or pick less', 'The MP3 Quality menu starts at 320 kbps, ideal for a lossless source. Choose 192 kbps to save space. Set it before adding files, because each file keeps the quality active when it was added.'],
      ['Add an album or playlist', 'Tap Choose ALAC Files or drag a whole album folder’s songs onto the box. Tracks convert automatically, one after another.'],
      ['Download all your MP3s', 'Preview any track, tap Download for single files, or use Download all to save the whole album with the original file names.'],
    ],
    sections: [
      {
        h2: 'Is my .m4a file ALAC or AAC?',
        paras: [
          'Apple Lossless and AAC both use the .m4a extension, so here are three quick ways to tell them apart. Either way, this ALAC to MP3 converter handles both types.',
        ],
        list: [
          ['In the Music app', 'Select a song, choose Get Info and open the File tab. Kind shows “Apple Lossless audio file” or “AAC audio file”.'],
          ['On Windows', 'Right-click the file, choose Properties and open Details. A bit rate of several hundred kbps, often 700 or more, means lossless.'],
          ['By file size', 'A four-minute ALAC song is usually more than 20 MB, while the same song in AAC is under 10 MB.'],
        ],
      },
      {
        h2: 'ALAC vs MP3 size: what you save',
        paras: [
          'CD-quality WAV uses about 10 MB per minute, and Apple Lossless brings that down to roughly 5.5 MB. An MP3 at 320 kbps needs only about 2.4 MB per minute, and 192 kbps about 1.4 MB. So a 45-minute album shrinks from around 250 MB in ALAC to about 108 MB at 320 kbps, or 65 MB at 192 kbps.',
          'Put differently, an ALAC to MP3 conversion at 320 kbps fits more than twice as much music on the same phone, and 192 kbps nearly four times as much. For most listening on earbuds, in the car or at the gym, that trade is easy to make.',
        ],
        image: { src: '/images/alac-to-mp3-vs-mp3-size.svg', alt: 'ALAC vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Why people convert Apple Lossless to MP3',
        list: [
          ['Android phones', 'An ALAC to MP3 batch frees up storage and gives you files that every Android music app plays.'],
          ['Car stereos and USB sticks', 'Many car systems read MP3 from a USB stick but ignore lossless .m4a files.'],
          ['Older MP3 players', 'Classic players and kids’ audio players often support MP3 only.'],
          ['Sharing a recording', 'Send your own band recording or a home-made rip to a friend in a format that always opens.'],
        ],
      },
      {
        h2: 'Convert ALAC to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'On a Mac, your ripped music is normally in the Music folder under Music › Media › Music, sorted by artist and album. Drag the songs onto the converter in Safari, Chrome or Firefox, and the MP3s land in Downloads. On Windows, iTunes keeps its library in the Music › iTunes › iTunes Media folder, and the steps in Chrome or Edge are the same.',
          'On an iPhone or iPad, use Safari and choose ALAC files from the Files app; the MP3s are saved in Files › Downloads. On Android, Chrome saves them to the Downloads folder. However, a whole lossless album is a lot of data for a phone, so a computer is the faster option for big batches.',
        ],
        image: { src: '/images/alac-to-mp3-on-phone-and-computer.svg', alt: 'ALAC to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the ALAC to MP3 converter',
      },
      {
        h2: 'Hi-res ALAC, tags and protected songs',
        list: [
          ['Hi-res 24-bit files', 'They convert from ALAC to MP3 without problems. The MP3 is created at the standard 44.1 kHz sample rate, which covers the full range of human hearing.'],
          ['Song titles and artwork', 'The file name is kept, but tags and album art are not copied. A free tag editor can add them back.'],
          ['Apple Music downloads', 'Songs downloaded from an Apple Music subscription are copy-protected and cannot be converted. Your own CD rips work normally.'],
          ['ALAC inside .caf', 'Apple Lossless can also sit in a CAF container. Those files work here too, or use our [CAF to MP3](/caf-to-mp3) page.'],
        ],
      },
      {
        h2: 'Will a 320 kbps MP3 sound as good as ALAC?',
        paras: [
          'For most people, on most equipment, yes. MP3 is lossy, so ALAC to MP3 is not a lossless conversion. Still, at 320 kbps the difference is very hard to hear in blind tests, especially on phones, Bluetooth headphones and car speakers.',
          'That said, keep your ALAC files after any ALAC to MP3 job. They are your master copy, so you can create any other format later without stacking losses. If part of your collection is in FLAC, our [FLAC to MP3](/flac-to-mp3) converter works the same way, and plain AAC songs go through [M4A to MP3](/m4a-to-mp3).',
        ],
      },
      {
        h2: 'Your music library stays private',
        paras: [
          '[MP3 Converter](/) runs every ALAC to MP3 conversion inside your browser, so your music library is never uploaded to a server. You do not need an account, you install nothing, and the MP3 files carry no watermark. As a result, even a full album collection stays entirely on your own device.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this ALAC to MP3 converter free?', a: 'Yes. It is free, with no sign-up, no watermark and no limit on the number of songs.' },
      { q: 'What is the best bitrate for ALAC to MP3?', a: '320 kbps keeps the most detail from a lossless source. 256 or 192 kbps saves more space and still sounds very good.' },
      { q: 'Can I convert a whole album at once?', a: 'Yes. Select or drop all the songs together. They convert one after another, and Download all saves every MP3.' },
      { q: 'Should I delete my ALAC files after converting?', a: 'We recommend keeping them. Lossless files are your master copy and let you create any format later without extra quality loss.' },
      { q: 'Can I convert hi-res 24-bit ALAC?', a: 'Yes. The MP3 is created at the standard 44.1 kHz sample rate.' },
      { q: 'Will album art and tags be copied?', a: 'No. The audio and file name are kept, but tags and artwork are not copied. A free tag editor can add them back.' },
      { q: 'Can I convert songs downloaded from Apple Music?', a: 'No. Apple Music subscription downloads are copy-protected. Lossless rips of your own CDs convert without problems.' },
      { q: 'Does it work with ALAC on Windows?', a: 'Yes. Open the page in Chrome, Edge or Firefox on Windows and add your .m4a files. No iTunes is needed.' },
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
    seoTitle: 'M4B to MP3 Converter – Free Online Audiobook Converter',
    metaTitle: 'M4B to MP3 Converter – Free Online Audiobook Converter',
    metaDescription:
      'Convert M4B audiobooks to MP3 online for free. Choose your bitrate and play on any device. No signup or software needed.',
    h1: 'M4B to MP3 & MP3 to M4B Converter',
    lead: 'Our free M4B to MP3 converter turns DRM-free audiobooks into compact MP3 files for MP3 players, car stereos and every audiobook app. It runs in your browser with speech-friendly settings, and you can switch to MP3 to M4B when you want a single book file for Apple Books.',
    intro: {
      h2: 'Listen to your audiobooks on any device',
      paras: [
        'M4B is the audiobook version of the MPEG-4 audio format. Inside, it usually holds AAC audio, just like an .m4a song. In addition, it can store chapter markers and let players remember where you stopped listening. Apple Books uses it, and many audiobook publishers and free libraries offer it too.',
        'Outside Apple apps, however, support is patchy. Many MP3 players, older car stereos, kids’ audio players and some Android apps will not open an .m4b file at all. An M4B to MP3 conversion makes the book play almost everywhere. Because audiobooks are mostly speech, the converter starts at 64 kbps with Mono switched on, which sounds clear and keeps a long book small.',
      ],
      image: { src: '/images/m4b-to-mp3-converter.svg', alt: 'M4B to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-m4b-to-mp3.svg', alt: 'How to convert M4B to MP3', width: 960, height: 300 },
    howCta: 'Convert M4B to MP3 now',
    steps: [
      ['Keep the M4B → MP3 tab', 'The page opens in this direction. Use MP3 → M4B only to build an audiobook file from MP3s.'],
      ['Check the speech settings', 'The MP3 Quality menu starts at 64 kbps with Mono on. Choose 96 kbps for books with music, or 32 kbps for the smallest files. Pick before adding the book, because each file keeps the settings active when it was added.'],
      ['Add the audiobook', 'Tap Choose M4B Files and select the book, or every part if it is split into several files. Conversion starts automatically.'],
      ['Download the MP3', 'Listen to a few seconds in the preview, then tap Download. For multi-part books, Download all saves every finished part.'],
    ],
    sections: [
      {
        h2: 'Recommended MP3 settings for audiobooks',
        paras: [
          'Narration needs far less data than music. These settings cover almost every M4B to MP3 conversion:',
        ],
        list: [
          ['64 kbps mono (default)', 'About 29 MB per hour. Clear, natural narration and a compact file.'],
          ['96 kbps mono', 'A slightly richer voice, good for full-cast or dramatised books with music.'],
          ['32 kbps mono', 'About 14 MB per hour. Best for very long books on devices with little storage.'],
          ['128 or 160 kbps', 'Only worth it when the book is mostly music, such as a radio play with a score.'],
        ],
      },
      {
        h2: 'M4B vs MP3 size per hour',
        paras: [
          'At the same bitrate, M4B and MP3 files take the same space. A 128 kbps book needs about 1 MB per minute in either format, and 64 kbps mono needs about 0.5 MB. So an M4B to MP3 conversion at a matching bitrate does not make your audiobook bigger.',
          'M4B audiobooks are often encoded at 64 to 128 kbps. If your book is 128 kbps stereo, converting at 64 kbps mono halves the size, and for narration you will hardly hear a difference. For example, a five-hour book drops from about 288 MB to about 144 MB after an M4B to MP3 conversion.',
        ],
        image: { src: '/images/m4b-to-mp3-vs-mp3-size.svg', alt: 'M4B vs MP3 file size', width: 960, height: 330 },
      },
      {
        h2: 'Chapters, bookmarks and cover art',
        list: [
          ['Chapter markers', 'MP3 has no common standard for chapters, so they are not carried over. The audio itself is kept in full.'],
          ['Split into chapters', 'Need separate chapter files? Cut the MP3 into parts with our [MP3 Cutter](/mp3-cutter).'],
          ['Your listening position', 'Bookmarks belong to the player app, not the file, so start again from where you left off.'],
          ['Title and cover', 'The file name is kept, but tags and cover art are not copied.'],
        ],
      },
      {
        h2: 'Convert M4B to MP3 on iPhone, Android, Mac and Windows',
        paras: [
          'This M4B to MP3 converter runs in your browser, so you do not need iTunes, Apple Books or any other software. On Windows and Mac, the MP3 is saved to your Downloads folder, ready to copy to an MP3 player or a USB stick for the car. On Android, Chrome saves it to Downloads, where audiobook apps such as Smart AudioBook Player can find it.',
          'On an iPhone or iPad, open this page in Safari, pick the M4B file from the Files app and tap Download when it is ready. The MP3 then appears in Files › Downloads. Long audiobooks need a lot of memory, though, so a computer is the most reliable choice for books longer than a few hours.',
        ],
        image: { src: '/images/m4b-to-mp3-on-phone-and-computer.svg', alt: 'M4B audiobook to MP3 on iPhone and Android', width: 960, height: 340 },
        cta: 'Try the M4B to MP3 converter',
      },
      {
        h2: 'Which audiobooks can be converted?',
        paras: [
          'Only DRM-free files. Audiobooks bought with copy protection, such as Audible .aa and .aax files or protected Apple Books titles, cannot go through an M4B to MP3 conversion here. If you try, the converter shows an error saying the file may be protected.',
          'Plenty of audiobooks are DRM-free, however. Public-domain recordings from LibriVox, books you recorded yourself, and titles from publishers that sell without DRM all convert normally. Have a plain .m4a book or lecture instead? Use the [M4A to MP3](/m4a-to-mp3) converter, and for spoken shows see [Podcast to MP3](/podcast-to-mp3).',
        ],
      },
      {
        h2: 'Is M4B to MP3 lossless? Quality questions',
        paras: [
          'No. M4B usually holds AAC, and MP3 is lossy too, so each conversion changes the sound very slightly. With speech, though, 64 kbps mono MP3 sounds clean and natural, and most listeners notice nothing.',
          'Why does the M4B to MP3 tool stop at 160 kbps, with no 256 or 320 kbps options? Audiobook narration simply does not need them. This page offers 32 to 160 kbps, which matches how audiobooks are usually encoded and keeps your files small.',
        ],
      },
      {
        h2: 'Long audiobooks: file size and memory limits',
        paras: [
          'For M4B to MP3, each file can be up to 500 MB, which covers most single-file audiobooks. Because the whole book is decoded on your own device, very long books take a while and use a lot of memory. If a conversion fails on a phone, try a computer, or convert the book’s parts one at a time if your copy is split.',
        ],
      },
      {
        h2: 'Private audiobook conversion',
        paras: [
          'Your library is your business. [MP3 Converter](/) converts audiobooks inside your browser, so your M4B files are never uploaded to a server. There is no sign-up, no app to install and no watermark or added sound in your MP3.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this M4B to MP3 converter free?', a: 'Yes. It is free to use, with no sign-up, no watermark and no limit on the number of books.' },
      { q: 'Can I convert Audible audiobooks to MP3?', a: 'No. Audible .aa and .aax files are copy-protected and cannot be converted. DRM-free M4B files, such as LibriVox books or your own recordings, work fine.' },
      { q: 'Are chapter markers kept when converting M4B to MP3?', a: 'No. MP3 has no common chapter standard, so markers are removed. The full audio is kept, and you can split it into chapters with an MP3 cutter.' },
      { q: 'What bitrate is best for M4B to MP3?', a: '64 kbps mono, the default, is ideal for narration. Choose 96 kbps for books with music, or 32 kbps for the smallest files.' },
      { q: 'How big will the MP3 audiobook be?', a: 'At 64 kbps mono, about 29 MB per hour of listening, so a 10-hour book is roughly 290 MB.' },
      { q: 'Can I convert a multi-part audiobook?', a: 'Yes. Select all the parts at once. They convert one after another, and Download all saves every MP3.' },
      { q: 'Why did my long audiobook fail to convert?', a: 'Very long books need a lot of memory because the audio is decoded on your device. Try a computer instead of a phone, or convert the book in parts.' },
      { q: 'Is there a file size limit for M4B files?', a: 'Each file can be up to 500 MB. That covers most single-file audiobooks.' },
      { q: 'Are my audiobooks uploaded?', a: 'No. The conversion runs entirely in your browser, and your files never leave your device.' },
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
    seoTitle: 'Podcast to MP3 – Free Podcast MP3 Converter for Episodes',
    metaTitle: 'Podcast to MP3 – Free Podcast MP3 Converter for Episodes',
    metaDescription:
      'Podcast to MP3 converter: turn WAV, M4A and Zoom recordings into publish-ready MP3 episodes at 128 kbps mono. Free, private, in your browser. Convert now.',
    h1: 'Podcast to MP3 Converter',
    lead: 'Our free podcast to MP3 converter turns raw episode recordings, WAV exports and video calls into a small, publish-ready MP3 in your browser. It starts at 128 kbps mono, a common setting for talk shows, and you can switch to stereo or a higher bitrate in one tap. Your episodes never leave your device.',
    intro: {
      h2: 'Why podcasts are still published as MP3',
      paras: [
        'MP3 is the format every podcast app understands, from Apple Podcasts and Spotify to the oldest MP3 player. Most hosting platforms accept it, and many recommend it for uploads. Meanwhile, the files that come out of a recording session are huge. An hour of WAV from Audacity, GarageBand or a field recorder takes about 600 MB, which is slow to upload and wastes your hosting space.',
        'A podcast to MP3 conversion shrinks that hour to roughly 58 MB at 128 kbps stereo, or about 29 MB at 64 kbps mono, while the voices stay clear. This page reads WAV, M4A, FLAC and AIFF files, and it also pulls the sound from MP4, MOV and WEBM video recordings of Zoom calls or remote interviews. You can drop in several episodes at once, and each one becomes its own MP3.',
      ],
      image: { src: '/images/podcast-to-mp3-converter.svg', alt: 'Podcast to MP3 converter', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-convert-podcast-to-mp3.svg', alt: 'How to convert a podcast to MP3', width: 960, height: 300 },
    howCta: 'Convert your podcast to MP3',
    steps: [
      ['Check the settings first', 'The page starts with 128 kbps and Mono on, which suits most talk shows. For a music-heavy show, turn Mono off and choose 192 kbps. Settings apply to files you add next.'],
      ['Add your episode files', 'Tap Choose Episode Files or drag your final mix onto the box. WAV, M4A, FLAC, MP4, MOV, WEBM and more work, up to 500 MB per file.'],
      ['Let it convert in your browser', 'Each episode is converted one after another. A progress bar shows the encoding, and the new size appears next to the file when it is done.'],
      ['Listen, download and publish', 'Play the MP3 on the page to check it, then tap Download, or Download all for several episodes. Upload the files to your podcast host.'],
    ],
    sections: [
      {
        h2: 'Best MP3 settings for a podcast',
        paras: [
          'There is no single “correct” bitrate for a podcast to MP3 export. Still, a few settings cover almost every show. Pick the one that matches your content, and keep it the same across episodes so your feed sounds consistent.',
        ],
        list: [
          ['Talk shows and interviews', '128 kbps mono, the default on this page. Voices sound full and an hour takes about 58 MB.'],
          ['Shows with music or sound design', '128 to 192 kbps stereo. Turn Mono off so music beds and stereo effects keep their width.'],
          ['Narrative and audio drama', '192 kbps stereo or higher, especially if you mix ambience and score under the voices.'],
          ['Very long episodes', 'If listeners stream on mobile data, 64 or 96 kbps mono keeps downloads light. Create it with our [MP3 Compressor](/mp3-compressor), which offers those lower bitrates.'],
        ],
      },
      {
        h2: 'Podcast file size by bitrate',
        paras: [
          'A 60-minute WAV recording takes roughly 605 MB before you convert the podcast to MP3. Converted to MP3 at 128 kbps it drops to about 58 MB, and at 64 kbps mono to around 29 MB. That means faster uploads for you and quicker downloads for your listeners.',
          'Keep in mind that podcast to MP3 conversion is lossy, so always keep your WAV master. If you need to re-export later, for example at a different bitrate, start again from that master rather than from the MP3.',
        ],
        image: { src: '/images/podcast-to-mp3-vs-mp3-size.svg', alt: 'Podcast MP3 bitrate and file size', width: 960, height: 330 },
      },
      {
        h2: 'Turn Zoom calls and video interviews into podcast MP3s',
        paras: [
          'Plenty of shows are recorded over video calls. Zoom, for instance, saves a local recording as an MP4 video plus an M4A audio file, usually in a Zoom folder inside Documents. Either one converts here, but the M4A is smaller and loads faster. Similarly, MOV files from a camera and WEBM files from browser-based recorders work too.',
          'The podcast to MP3 converter takes only the sound track, so the picture is dropped and the MP3 stays small. Then, if you want to share a short clip on social media, cut the best minute with our [MP3 Cutter](/mp3-cutter).',
        ],
      },
      {
        h2: 'Polish your episode before you publish',
        paras: [
          'A podcast to MP3 conversion is usually the last step. Before that, a little tidying makes an episode feel professional, and you can do it all on this site without an audio editor.',
        ],
        list: [
          ['Trim the edges', 'Remove the silence and small talk before the intro and after the goodbye with the MP3 Cutter.'],
          ['Attach your intro and outro', 'Merge your theme music with the main recording in the [Audio Joiner](/audio-joiner), so every episode starts the same way.'],
          ['Record a quick insert', 'Need a sponsor read or a correction? Record it with the [online voice recorder](/voice-to-mp3) and join it in.'],
          ['Name files clearly', 'Rename the download to something like episode-12.mp3 before uploading, so your archive stays easy to search.'],
        ],
      },
      {
        h2: 'Convert podcast episodes on iPhone, Android, Mac and Windows',
        paras: [
          'Since the podcast to MP3 converter runs in your browser, it works on any device without an app. On a Mac or Windows PC, drag the exported WAV from GarageBand, Audacity, Adobe Audition or Reaper onto the box, and the MP3 lands in Downloads. That is the most comfortable way to handle long episodes.',
          'On an iPhone or iPad, open the page in Safari and choose a recording from the Files app, such as an export from the Voice Memos app. The MP3 is saved to Files, in Downloads. On Android, pick your file in Chrome and find the MP3 in the Downloads folder. From there, you can upload it to your podcast host straight from the phone.',
        ],
        image: { src: '/images/podcast-to-mp3-on-phone-and-computer.svg', alt: 'Podcast MP3 on phone and computer', width: 960, height: 340 },
        cta: 'Try the podcast to MP3 converter',
      },
      {
        h2: 'Private conversion for unreleased episodes',
        paras: [
          'An unreleased episode is not something you want sitting on a stranger’s server. So this podcast to MP3 tool never uploads it. The audio is decoded and encoded inside your own browser with the Web Audio API, FFmpeg compiled to WebAssembly and the LAME MP3 encoder. As a result, guest interviews and embargoed news stay on your device until you publish them.',
          'Like every tool on [MP3 Converter](/), it is free, with no sign-up, no watermark and no limit on episodes. The only rule is 500 MB per file, which covers several hours of WAV audio.',
        ],
      },
    ],
    faqs: [
      { q: 'Is this podcast to MP3 converter free?', a: 'Yes. You can convert as many podcast recordings to MP3 as you like for free, with no account and no watermark.' },
      { q: 'What bitrate should a podcast MP3 use?', a: 'Many spoken-word podcasts use 96 to 128 kbps mono. Shows with a lot of music often use 128 to 192 kbps stereo.' },
      { q: 'Should a podcast be mono or stereo?', a: 'Mono is fine for most talk shows, because the whole bitrate goes to one channel and voices stay clear. Choose stereo if your show relies on music or stereo sound design.' },
      { q: 'Can I convert a Zoom recording to a podcast MP3?', a: 'Yes. Zoom saves an MP4 video and an M4A audio file. Either one works in the podcast to MP3 converter, and only the sound is kept.' },
      { q: 'Which podcast platforms accept MP3?', a: 'MP3 is accepted by practically every podcast host and plays in Apple Podcasts, Spotify and all other podcast apps.' },
      { q: 'Can I convert several episodes at once?', a: 'Yes. Select or drop several episodes into the podcast to MP3 converter. They convert one after another, and Download all saves every finished MP3.' },
      { q: 'Do I need to add ID3 tags to my podcast MP3?', a: 'Usually not. Most podcast hosts add the episode title, description and artwork to the feed for you.' },
      { q: 'Are my podcast recordings uploaded anywhere?', a: 'No. The conversion happens inside your browser, so your episodes stay on your device until you upload them to your host.' },
    ],
    related: ['audio-joiner', 'mp3-cutter', 'mp3-compressor', 'transcribe-audio-to-text'],
  },

  // ------------------------------------------------------------------ Hub: audio formats
  {
    slug: 'audio-to-mp3',
    nav: 'Audio to MP3 Converter',
    kind: 'convert',
    tool: {
      heading: 'Upload audio files to convert to MP3.',
      formats: 'WAV, M4A, FLAC, AAC, OGG, OPUS, WMA, AMR',
      buttonLabel: 'Choose Audio Files',
      showRecord: false,
    },
    seoTitle: 'Audio to MP3 Converter – Convert Any Audio File to MP3 Free',
    metaTitle: 'Audio to MP3 Converter – Convert Any Audio File to MP3 Free',
    metaDescription:
      'Free audio to MP3 converter for WAV, M4A, FLAC, AAC, OGG, WMA and more. Convert any audio file to MP3 in your browser, with no upload and no sign-up.',
    h1: 'Audio to MP3 Converter',
    lead: 'Convert any audio file to MP3 in seconds. Drop WAV, M4A, FLAC, AAC, OGG and other files right here, or pick your format below for a dedicated converter with the best settings and tips. Every file stays on your device.',
    hub: {
      h2: 'Choose your audio format',
      intro: 'Each converter below is tuned for one format, with the right quality settings and answers to the most common questions about it.',
      items: [
        { slug: 'wav-to-mp3', text: 'Shrink large WAV recordings to a fraction of their size, at up to 320 kbps.' },
        { slug: 'm4a-to-mp3', text: 'Convert iPhone voice memos and iTunes M4A files to MP3.' },
        { slug: 'flac-to-mp3', text: 'Turn lossless FLAC music into MP3 files that play on every device.' },
        { slug: 'aac-to-mp3', text: 'Convert AAC audio from phones, apps and recorders to MP3.' },
        { slug: 'ogg-to-mp3', text: 'Change OGG Vorbis audio from games, apps and websites into MP3.' },
        { slug: 'opus-to-mp3', text: 'Convert Opus voice messages and recordings to MP3.' },
        { slug: 'wma-to-mp3', text: 'Bring old Windows Media Audio (WMA) files back to life as MP3.' },
        { slug: 'amr-to-mp3', text: 'Turn AMR call recordings and voice notes from phones into MP3.' },
        { slug: 'alac-to-mp3', text: 'Convert Apple Lossless (ALAC) music into smaller MP3 files.' },
        { slug: 'ac3-to-mp3', text: 'Convert Dolby Digital AC3 sound to MP3.' },
        { slug: 'caf-to-mp3', text: 'Convert Apple Core Audio (CAF) files from Mac and iPhone to MP3.' },
        { slug: 'm4b-to-mp3', text: 'Turn M4B audiobooks into MP3 for any player or car stereo.' },
      ],
    },
    intro: {
      h2: 'One audio to MP3 converter for every format',
      paras: [
        'MP3 is still the format that plays everywhere: on phones, in cars, on smart speakers and in every music app. Many recordings, however, arrive as WAV, M4A, FLAC or another format that a device or website will not accept. An **audio to MP3 converter** solves that in one step and usually makes the file much smaller too.',
        'This page reads all common audio formats, plus rarer ones such as AMR, AC3 and CAF. You can add several files at once, choose the bitrate and save each one as a standard MP3. The conversion runs inside your browser, so even private recordings never leave your device. If your sound is inside a video, use our [Video to MP3](/video-to-mp3) converter instead.',
      ],
    },
    howCta: 'Convert your audio to MP3',
    steps: [
      ['Add your audio files', 'Tap Choose Audio Files or drag files onto the box. You can mix formats and add many files at once, up to 500 MB each.'],
      ['Pick the MP3 quality', 'Keep 192 kbps for a good balance, choose 320 kbps for the best music quality, or turn on Mono for speech.'],
      ['Download your MP3 files', 'Each file converts on its own. Tap Download next to it, or Download all when everything is ready.'],
    ],
    sections: [
      {
        h2: 'Which MP3 bitrate should you choose?',
        paras: [
          'The bitrate decides both quality and size. As a rule, 128 kbps is fine for podcasts and voice, 192 kbps is a safe choice for most music, and 320 kbps keeps the most detail from lossless files such as WAV, FLAC and ALAC. Converting to a higher bitrate than the original never adds quality, so there is no need to go above it. Need an even smaller file? Run the result through our [MP3 Compressor](/mp3-compressor).',
        ],
      },
    ],
    faqs: [
      { q: 'Which audio formats can I convert to MP3?', a: 'WAV, M4A, FLAC, AAC, OGG, OPUS, WMA, AMR, ALAC, AC3, CAF, M4B, AIFF and more. If your browser cannot read a file, the converter switches to FFmpeg automatically.' },
      { q: 'Is this audio to MP3 converter free?', a: 'Yes. It is free with no sign-up, no watermark and no limit on the number of files. The only limit is 500 MB per file.' },
      { q: 'Are my audio files uploaded?', a: 'No. Every file is converted inside your browser, so it stays on your phone or computer.' },
      { q: 'Does converting to MP3 reduce the quality?', a: 'MP3 is a compressed format, so some detail is removed. At 192 or 320 kbps the difference is very hard to hear for most people.' },
    ],
    related: ['video-to-mp3', 'mp3-compressor', 'mp3-cutter', 'audio-joiner'],
  },

// ------------------------------------------------------------------ Hub: link downloaders
  {
    slug: 'link-to-mp3',
    nav: 'Link to MP3',
    kind: 'hub',
    seoTitle: 'Link to MP3 – Free Online Downloaders for MP3, MP4 & WAV',
    metaTitle: 'Link to MP3 – Free Online Downloaders for MP3, MP4 & WAV',
    metaDescription:
      'Paste a link and save it as MP3, WAV or MP4: YouTube to MP3, YouTube to MP4, YouTube to WAV and an online video downloader. Free, fast and no sign-up.',
    h1: 'Link to MP3 – Online Downloaders',
    lead: 'Have a link instead of a file? These tools fetch the video for you and save it as MP3, WAV or MP4. Pick the downloader that fits your link and the format you need.',
    hub: {
      h2: 'Choose a downloader',
      intro: 'Each tool is built for one kind of link or output, so you get the right options without extra steps.',
      items: [
        { slug: 'youtube-to-mp3', text: 'Paste a YouTube link and save the sound as an MP3, up to 320 kbps.' },
        { slug: 'youtube-to-wav', text: 'Save YouTube audio as an uncompressed WAV file for editing.' },
        { slug: 'podcast-to-mp3', text: 'Turn podcast recordings and episodes into small, publish-ready MP3 files.' },
        { slug: 'youtube-to-mp4', text: 'Download YouTube videos as MP4 in the quality you choose.' },
        { slug: 'online-video-downloader', text: 'Save videos from sites that allow downloads as MP4, up to 1080p.' },
        { slug: 'tiktok-to-mp3', text: 'Coming soon: save the sound of TikTok videos as MP3.' },
      ],
    },
    intro: {
      h2: 'How link downloads work',
      paras: [
        'Browsers cannot fetch videos from other websites on their own, so when you paste a link, our download server fetches it for you. It then converts the sound to MP3 or WAV, or keeps the video as MP4, and hands you the finished file. There is no software to install and no account to create.',
        'Already have the file on your device? Then you do not need a link at all. Our [Audio to MP3](/audio-to-mp3) and [Video to MP3](/video-to-mp3) converters work right in your browser, without any upload.',
      ],
    },
    howTitle: 'How to download from a link',
    steps: [
      ['Copy the link', 'Open the video in your browser or app, tap Share and choose Copy link.'],
      ['Paste it into the right tool', 'Pick the downloader above, paste the link and choose MP3, WAV or MP4 and the quality.'],
      ['Download the file', 'When the file is ready, tap Download. It is saved to your Downloads folder.'],
    ],
    sections: [
      {
        h2: 'Download responsibly',
        paras: [
          'Only download videos and music that you own, that are openly licensed or that you have permission to use. Many platforms do not allow downloads in their terms of service. Read our [Copyright & DMCA Policy](/copyright) to learn more.',
        ],
      },
    ],
    faqs: [
      { q: 'Are these link downloaders free?', a: 'Yes. All of them are free and need no account. To keep the service fair for everyone, the number of downloads per hour is limited.' },
      { q: 'Which downloader should I use for a YouTube link?', a: 'Use YouTube to MP3 for the sound, YouTube to WAV for an uncompressed audio file and YouTube to MP4 for the video itself.' },
      { q: 'Can I download from sites other than YouTube?', a: 'Yes. The Online Video Downloader saves videos from many sites that allow downloads as MP4 files.' },
    ],
    related: ['audio-to-mp3', 'video-to-mp3', 'mp3-cutter', 'transcribe-audio-to-text'],
  },

  // ------------------------------------------------------------------ Hub: MP3 editing tools
  {
    slug: 'mp3-tools',
    nav: 'MP3 Tools',
    kind: 'hub',
    seoTitle: 'MP3 Tools – Cut, Compress & Join MP3 Files Online Free',
    metaTitle: 'MP3 Tools – Cut, Compress & Join MP3 Files Online Free',
    metaDescription:
      'Free online MP3 tools: cut and trim MP3s, compress them to a smaller size and join several files into one. Everything runs in your browser, with no upload.',
    h1: 'MP3 Tools – Edit MP3 Files Online',
    lead: 'Simple tools for everyday MP3 editing. Trim a song, shrink a file that is too big to send, or join several recordings into one, all in your browser and without installing anything.',
    hub: {
      h2: 'Choose an MP3 tool',
      intro: 'Every tool opens your file on the page and saves a new MP3, so your original stays untouched.',
      items: [
        { slug: 'mp3-cutter', text: 'Trim songs and recordings, make ringtones and add a fade in or out.' },
        { slug: 'mp3-compressor', text: 'Make MP3 files smaller by lowering the bitrate, down to 32 kbps.' },
        { slug: 'audio-joiner', text: 'Merge several audio files into one MP3, in any order and with optional gaps.' },
      ],
    },
    intro: {
      h2: 'Edit MP3 files without software',
      paras: [
        'Full audio editors are powerful, but they take time to install and learn. These **MP3 tools** each do one job well and work the same way on a phone or a computer. They also read WAV, M4A, FLAC and video files, and always save a standard MP3.',
        'Because the editing happens inside your browser, your files are never uploaded. Want to create a recording first? Use the [Voice Recorder](/voice-to-mp3). To turn speech into written text, try the [Audio to Text](/transcribe-audio-to-text) transcriber.',
      ],
    },
    sections: [],
    faqs: [
      { q: 'Are these MP3 tools free?', a: 'Yes. You can cut, compress and join as many files as you like, with no sign-up and no watermark.' },
      { q: 'Do the MP3 tools upload my files?', a: 'No. Every tool works inside your browser, so your files stay on your device.' },
      { q: 'Can I use the MP3 tools on my phone?', a: 'Yes. They work in modern browsers on iPhone, Android, Windows, Mac and Chromebook.' },
    ],
    related: ['voice-to-mp3', 'transcribe-audio-to-text', 'audio-to-mp3', 'video-to-mp3'],
  },

  // ------------------------------------------------------------------ Audio to text
  {
    slug: 'transcribe-audio-to-text',
    nav: 'Audio to Text Transcriber',
    kind: 'transcribe',
    seoTitle: 'Transcribe Audio to Text Free – Online Audio Transcriber',
    metaTitle: 'Transcribe Audio to Text Free – Online Audio Transcriber',
    metaDescription:
      'Transcribe audio to text free in your browser. Turn MP3, WAV, M4A or video into text in English, Spanish, Portuguese and 25+ languages. No upload, no sign-up.',
    h1: 'Transcribe Audio to Text – Free Online Transcriber',
    lead: 'Turn interviews, voice notes, lectures and meetings into editable text in minutes. Our free audio transcriber runs a speech recognition model inside your browser, detects the spoken language and gives you a clean transcript with timestamps. Your recording never leaves your device.',
    intro: {
      h2: 'A free transcriber that turns speech into text on your device',
      paras: [
        'When you need to **transcribe audio to text**, typing it out by hand takes around four times as long as the recording itself. An automatic transcriber does the listening for you. Drop in a file, press Transcribe to Text, and the words appear as a transcript you can edit, copy into a document or save as subtitles.',
        'Most transcription services upload your audio to their servers and charge by the minute. This one works differently. It uses Whisper, an open-source speech recognition model created by OpenAI, and runs it right in your browser. As a result, the transcription is free, there is no account, and a confidential interview or a personal voice memo stays on your computer or phone.',
      ],
      image: { src: '/images/transcribe-audio-to-text.svg', alt: 'Transcribe audio to text', width: 960, height: 340 },
    },
    howImage: { src: '/images/how-to-transcribe-audio-to-text.svg', alt: 'How to transcribe audio to text', width: 960, height: 300 },
    howCta: 'Transcribe your audio now',
    steps: [
      ['Choose your audio or video file', 'Tap Choose File or drag a file onto the box. MP3, WAV, M4A, OGG, FLAC, AAC and the sound of MP4, MOV or WEBM videos all work, up to 500 MB.'],
      ['Pick the spoken language', 'Leave Spoken language on Detect automatically, or choose it yourself, for example Spanish or Portuguese. Choosing it helps with short clips and strong accents.'],
      ['Choose the accuracy', 'Balanced suits clear English recordings. Best gives the most accurate text for other languages and harder audio, while Fast is the quickest on a phone.'],
      ['Transcribe, then copy or download', 'Press Transcribe to Text and watch the live preview. When it is done, edit the text if needed, then copy it or download a TXT, SRT or VTT file.'],
    ],
    sections: [
      {
        h2: 'How the audio transcriber works',
        paras: [
          'The first time you transcribe, your browser downloads the speech model you picked, between 41 MB and 249 MB, and keeps it in its cache. After that, the model loads from the cache in seconds. Your file is decoded on the page, converted to the 16 kHz mono sound the model expects, and then processed in 30-second windows that overlap slightly, so no words are lost between them.',
          'Each window becomes a few lines of text with start and end times. The tool then joins them into paragraphs, starting a new one when the speaker pauses. Because everything happens on your device, the speed depends on your computer or phone. A modern laptop is the fastest option, and long recordings simply take a little longer.',
        ],
        list: [
          ['Fast (41 MB)', 'The smallest model. Good for clear English speech and for phones with little memory.'],
          ['Balanced (77 MB)', 'The default. Accurate on clean recordings in English and other widely spoken languages.'],
          ['Best (249 MB)', 'The most accurate choice for Spanish, Portuguese, French, German and other languages, and for noisy or fast speech.'],
        ],
      },
      {
        h2: 'Transcribe Spanish audio to text, and 25+ other languages',
        paras: [
          'You can **transcribe Spanish audio to text** just as easily as English. The transcriber recognises English, Spanish, Portuguese, French, German, Italian, Russian, Turkish, Arabic, Hindi, Indonesian, Japanese, Chinese, Korean and many more. By default, it listens to the first 30 seconds and detects the language for you, then shows which one it found next to the transcript.',
          'For the best results in Spanish or Portuguese, choose the language yourself and set Accuracy to Best. This matters most for short clips, mixed languages and regional accents, such as Latin American and European Spanish, or Brazilian and European Portuguese. The text is written in the language that is spoken, so a Spanish interview gives you a Spanish transcript.',
        ],
        image: { src: '/images/transcribe-spanish-audio-to-text.svg', alt: 'Transcribe Spanish audio to text', width: 960, height: 340 },
        cta: 'Transcribe Spanish audio now',
      },
      {
        h2: 'Audio file transcription for every kind of recording',
        paras: [
          'Audio file transcription is useful far beyond the office. Here are the recordings people turn into text most often.',
        ],
        list: [
          ['Interviews and research', 'Get a searchable transcript of a journalist interview, a user study or a podcast guest, ready to quote.'],
          ['Lectures and classes', 'Transcribe a recorded lecture into study notes you can search, highlight and summarise.'],
          ['Meetings and calls', 'Turn a Zoom, Teams or phone call recording into minutes, and keep a written record of decisions.'],
          ['Voice memos and ideas', 'Speak your notes on a walk and turn them into text later. You can record straight from your browser with our [Voice Recorder](/voice-to-mp3).'],
          ['Videos and subtitles', 'Load an MP4, MOV or WEBM video and save SRT or VTT subtitles to add captions on YouTube or in your video editor.'],
          ['Podcasts', 'Publish show notes and a full transcript, which makes each episode easier to find in search engines.'],
        ],
      },
      {
        h2: 'Save your transcript as TXT, SRT or VTT',
        paras: [
          'When the transcription is finished, the text appears in an editor. Fix a name or a technical term, then press Copy Text to paste it into Google Docs, Word or an email. You can also switch to the Timestamps view to see when each sentence was spoken.',
          'For files, choose TXT for plain text, SRT for subtitles in YouTube, Premiere Pro, DaVinci Resolve or VLC, and VTT for web video players. The subtitle files use the timestamps from the model, so each line appears on screen while it is being said.',
        ],
        image: { src: '/images/audio-transcription-txt-srt-vtt.svg', alt: 'Audio file transcription to TXT, SRT and VTT', width: 960, height: 330 },
      },
      {
        h2: 'Tips for a more accurate transcription',
        paras: [
          'Speech recognition is good, but it is not perfect. It works best on clear speech, so a few small steps make a real difference.',
        ],
        list: [
          ['Record close to the microphone', 'A phone held near the speaker beats a laptop across the room. Less echo and background noise means fewer mistakes.'],
          ['Choose the language and Best accuracy', 'For anything other than clear English, these two settings give the biggest improvement.'],
          ['Cut out music and silence', 'Long intros, music or silence can confuse the model. Trim them first with the [MP3 Cutter](/mp3-cutter).'],
          ['Check names and numbers', 'Proper names, brands and figures are the most common errors, so read them over before you share the transcript.'],
          ['Split very long recordings', 'For recordings of several hours, cut them into parts. It keeps memory use low, especially on phones.'],
        ],
      },
      {
        h2: 'Private, free and without limits',
        paras: [
          'There is no sign-up, no watermark and no monthly quota, so you can transcribe audio to text free as often as you like. Since the speech model runs locally, your audio is never sent to a server, and nobody else can listen to it. The only download is the model itself, which comes from Hugging Face, a public library of AI models.',
          'This transcriber is part of [MP3 Converter](/), a set of free audio tools that all work in your browser. If your recording is a video, you can also keep just the sound with our [Video to MP3](/video-to-mp3) converter.',
        ],
        cta: 'Start transcribing for free',
      },
    ],
    faqs: [
      { q: 'How do I transcribe audio to text for free?', a: 'Open this page, choose your audio or video file, leave the language on Detect automatically and press Transcribe to Text. The transcript appears on the page, ready to copy or download, at no cost and with no account.' },
      { q: 'Can I transcribe Spanish audio to text?', a: 'Yes. Spanish is fully supported, along with Portuguese, French, German and more than 20 other languages. For the best result, set Spoken language to Spanish and Accuracy to Best.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. The speech recognition model runs inside your browser, so your file stays on your device. Only the model itself is downloaded once from Hugging Face.' },
      { q: 'Which file formats can I transcribe?', a: 'MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, WMA and AMR audio, plus the sound track of MP4, MOV, WEBM and MKV videos, up to 500 MB per file.' },
      { q: 'How accurate is the transcription?', a: 'On clear speech it is very accurate, especially with the Best setting. Background noise, music, people talking over each other and strong accents lower the accuracy, so always check names and numbers.' },
      { q: 'How long does it take to transcribe a file?', a: 'It depends on your device and the accuracy you choose. On a modern computer, Fast and Balanced are usually quicker than the recording itself, while Best takes longer. The first run also includes the one-time model download.' },
      { q: 'Does the transcript include timestamps?', a: 'Yes. Switch to the Timestamps view to see when each sentence starts, or download an SRT or VTT file with start and end times for every line.' },
      { q: 'Can it tell different speakers apart?', a: 'Not yet. The transcript is written as continuous text in paragraphs, without speaker names. You can add names yourself in the editor before you download it.' },
      { q: 'Can I record my voice and transcribe it to text?', a: 'Yes. Open the Record tab, press Start Recording and speak. When you press Stop & Transcribe, the recording is turned into text right away, and it never leaves your device.' },
      { q: 'Does the audio transcriber work on iPhone and Android?', a: 'Yes, it works in modern mobile browsers. On phones, choose Fast or Balanced and transcribe shorter recordings, because the Best model needs more memory.' },
    ],
    related: ['voice-to-mp3', 'mp3-cutter', 'video-to-mp3', 'podcast-to-mp3'],
  },

];

// Format pages that also convert the other way (e.g. MP3 to WMA).
export const TOOLS = BASE_TOOLS.map((t) => {
  const r = REVERSE_CONTENT[t.slug];
  if (!r) return t;
  return {
    ...t,
    // Pages with their own SEO title keep their own H1, title and description.
    h1: t.seoTitle ? t.h1 : r.h1,
    metaTitle: t.seoTitle ? t.metaTitle : r.metaTitle,
    metaDescription: t.seoTitle ? t.metaDescription : r.metaDescription,
    tool: { ...t.tool, reverse: r.target },
    sections: [...r.sections, ...t.sections],
    faqs: [...t.faqs, ...r.faqs],
  };
});

export const TOOL_MAP = Object.fromEntries(TOOLS.map((t) => [t.slug, t]));
