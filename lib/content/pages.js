// English content for the simple pages. Translations in lib/i18n/locales/<lang>/pages.json mirror this structure.
// Each section has an h2 and blocks: a string is a paragraph; { h3 }, { ul: [] }, { ol: [] } and { check: [] } are
// headings and lists. Inline markup: **bold**, [text](/path) and [text](mailto:{email}). {email} and {domain} are filled in.

export const PAGES = {
  about: {
    metaTitle: 'About Us',
    metaDescription: 'Learn who builds MP3 Converter, how the tool works and why it converts audio privately in your browser.',
    title: 'About MP3 Converter',
    lead: 'Simple, private audio tools that anyone can use.',
    sections: [
      {
        h2: 'Why we built this',
        blocks: [
          'Most online converters ask you to upload your files to a server, wait in a queue, and then download the result. That is slow, and it means handing your private recordings to a stranger. We wanted something better: a converter that is fast, free and keeps your files on your own device.',
          'So we built MP3 Converter as a tool that runs entirely in your web browser. There is no upload, no account and no limit on how many files you convert.',
        ],
      },
      {
        h2: 'How the tool works',
        blocks: [
          {
            check: [
              '**Decoding.** Your browser’s Web Audio engine reads common formats. For others, such as MKV, AVI or WMA, we load FFmpeg, a widely used open-source media library, compiled to WebAssembly.',
              '**Encoding.** The MP3 is created with LAME, the open-source encoder trusted for over two decades, running in a background worker.',
              '**Saving.** The finished MP3 goes straight from your browser’s memory to your downloads folder.',
            ],
          },
        ],
      },
      {
        h2: 'Our principles',
        blocks: [
          {
            check: [
              'Your files stay on your device.',
              'Plain, honest explanations without technical jargon.',
              'Free tools without watermarks or sign-up walls.',
              'Respect for creators: please only convert content you own or may use.',
            ],
          },
          'Questions or ideas? [Get in touch](/contact).',
        ],
      },
    ],
  },

  contact: {
    metaTitle: 'Contact',
    metaDescription: 'Contact the MP3 Converter team with questions, bug reports or feature ideas.',
    title: 'Contact Us',
    lead: 'We read every message and reply as soon as we can.',
    sections: [
      {
        h2: 'Email',
        blocks: [
          'Send us an email at [{email}](mailto:{email}).',
          { h3: 'When reporting a problem, please include' },
          {
            ul: [
              'The tool you used (for example, MP4 to MP3 or MP3 Cutter).',
              'Your browser and device (for example, Chrome on Windows or Safari on iPhone).',
              'The file format and roughly how long or large the file was.',
              'The exact error message, if one appeared.',
            ],
          },
          'Please do not send us the audio file itself unless we ask. Because the tool runs in your browser, we never see your files.',
        ],
      },
    ],
  },

  'privacy-policy': {
    metaTitle: 'Privacy Policy',
    metaDescription: 'How MP3 Converter handles your data. Files are processed in your browser and never uploaded to our servers.',
    title: 'Privacy Policy',
    lead: 'Last updated: October 2026',
    sections: [
      {
        h2: 'The short version',
        blocks: [
          'Files you upload, record, cut, compress or join on {domain} are processed inside your own browser and are never sent to us. When you paste a link, our download server fetches that link for you and deletes the result after 30 minutes.',
        ],
      },
      {
        h2: 'Files and recordings on your device',
        blocks: [
          'When you choose a file or record with your microphone, the audio is read and converted in your browser’s memory. The resulting MP3 is offered to you as a download. When you close or reload the page, this data is cleared.',
        ],
      },
      {
        h2: 'Links you paste',
        blocks: [
          'To download from a link, we send the link to our download server, which fetches the video from the website and, if you choose, converts it to MP3. The finished file is stored only so you can download it and is deleted automatically after 30 minutes. We keep the IP address of each request in memory for up to one hour to apply fair-use limits, and our server logs record technical errors without the content of the files.',
        ],
      },
      {
        h2: 'Microphone',
        blocks: [
          'The recorder only accesses your microphone after you press Start Recording and your browser asks for permission. The recording is used only to create your MP3 on this page.',
        ],
      },
      {
        h2: 'Information stored in your browser',
        blocks: [
          'We save one small setting in your browser’s local storage: whether the sidebar is collapsed. Your browser may also cache the converter’s program files so the site loads faster next time.',
        ],
      },
      {
        h2: 'Server logs',
        blocks: [
          'Like any website, our hosting provider may keep standard technical logs, such as IP address, browser type and the pages requested, for security and reliability. These logs do not contain your audio files.',
        ],
      },
      {
        h2: 'Changes and contact',
        blocks: [
          'If we add analytics or advertising in the future, we will update this page first. For any privacy question, email [{email}](mailto:{email}).',
        ],
      },
    ],
  },

  terms: {
    metaTitle: 'Terms of Use',
    metaDescription: 'Read the terms for using MP3 Converter: free personal and commercial use, your responsibility for content and copyright, fair-use limits and no warranty.',
    title: 'Terms of Use',
    lead: 'Last updated: October 2026',
    sections: [
      {
        h2: 'Using the tools',
        blocks: ['MP3 Converter is free to use for personal and commercial purposes. By using the site, you agree to these terms.'],
      },
      {
        h2: 'Your content and copyright',
        blocks: [
          'You are responsible for the files and links you process. Only convert, download, cut, compress or join content that you own, that is openly licensed, that you have permission to use, or that the law allows you to copy. Do not use the tools to infringe copyright, to get around copy protection, or in breach of another website’s terms of service. See our [Copyright & DMCA Policy](/copyright).',
        ],
      },
      {
        h2: 'Fair use of the link downloader',
        blocks: [
          'To keep the service available for everyone, we limit how many downloads each visitor can start per hour, the length of videos and the size of files. Automated or bulk use is not allowed. We may block access in case of abuse.',
        ],
      },
      {
        h2: 'No warranty',
        blocks: [
          'The tools are provided “as is”. We work hard to make them reliable, but we cannot guarantee that every file will convert or that the service will always be available. Always keep a copy of your original files.',
        ],
      },
      {
        h2: 'Open-source software',
        blocks: [
          'The site uses LAME (via lamejs, LGPL) for MP3 encoding, FFmpeg (via ffmpeg.wasm and on our server) for decoding and converting, and yt-dlp (Unlicense) for fetching media from links. These projects remain the property of their authors and are used under their licences.',
        ],
      },
      {
        h2: 'Contact',
        blocks: ['Questions about these terms? Email [{email}](mailto:{email}).'],
      },
    ],
  },

  copyright: {
    metaTitle: 'Copyright & DMCA Policy',
    metaDescription: 'How rights holders can ask MP3 Converter to block links to their content, and our responsible-use rules.',
    title: 'Copyright & DMCA Policy',
    lead: 'Last updated: October 2026',
    sections: [
      {
        h2: 'We respect creators',
        blocks: [
          'MP3 Converter provides tools for converting and downloading media. Users must only process content they own, content that is in the public domain or openly licensed, or content they have permission to use. Using our tools to infringe copyright is not allowed and breaks our [Terms of Use](/terms).',
          'We do not host a library of music or videos. Files created from a link are stored temporarily so the person who requested them can download them, and are deleted automatically after 30 minutes.',
        ],
      },
      {
        h2: 'How to ask us to block content',
        blocks: [
          'If you own the rights to content and want us to prevent our tools from downloading it, email [{email}](mailto:{email}?subject=Copyright%20notice) with:',
          {
            ol: [
              'Your name, company (if any), postal address, phone number and email address.',
              'A description of the copyrighted work.',
              'The exact links (URLs) or channel/site you want blocked.',
              'A statement that you believe in good faith that the use is not authorised by the owner, its agent or the law.',
              'A statement, under penalty of perjury, that the information is accurate and that you are the owner or authorised to act for the owner.',
              'Your physical or electronic signature.',
            ],
          },
          'We aim to review valid notices within two business days. Approved links are added to our block list, after which our service refuses to process them.',
        ],
      },
      {
        h2: 'Repeat abuse',
        blocks: ['We limit how many downloads each visitor can start, and we may block visitors who repeatedly misuse the service.'],
      },
      {
        h2: 'Trademarks',
        blocks: [
          'YouTube is a trademark of Google LLC. Other platform names are trademarks of their respective owners. MP3 Converter is independent and is not affiliated with, endorsed by or sponsored by any of these companies.',
        ],
      },
    ],
  },
};

export const PAGE_SLUGS = Object.keys(PAGES);
