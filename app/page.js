import Link from 'next/link';
import Converter from '@/components/Converter';
import Icon from '@/components/Icon';
import { SITE } from '@/lib/site';

export const metadata = {
  alternates: { canonical: '/' },
};

const FORMATS = [
  { href: '/mp4-to-mp3', tag: 'Video', name: 'MP4 to MP3' },
  { href: '/wav-to-mp3', tag: 'Audio', name: 'WAV to MP3' },
  { href: '/m4a-to-mp3', tag: 'Audio', name: 'M4A to MP3' },
  { href: '/flac-to-mp3', tag: 'Lossless', name: 'FLAC to MP3' },
  { href: '/mov-to-mp3', tag: 'Video', name: 'MOV to MP3' },
  { href: '/ogg-to-mp3', tag: 'Audio', name: 'OGG to MP3' },
  { href: '/webm-to-mp3', tag: 'Video', name: 'WEBM to MP3' },
  { href: '/aac-to-mp3', tag: 'Audio', name: 'AAC to MP3' },
];

const FEATURES = [
  {
    icon: 'lock',
    title: 'Private by design',
    text: 'The conversion happens on your own device. Your songs, lectures and voice notes never travel to our servers, so nobody else can see them.',
  },
  {
    icon: 'zap',
    title: 'Fast, with no waiting line',
    text: 'Because there is no upload step, short clips turn into MP3 in a few seconds. Longer files simply depend on the speed of your device.',
  },
  {
    icon: 'sliders',
    title: 'You choose the quality',
    text: 'Pick 128, 192, 256 or 320 kbps. Go small for voice and podcasts, or go high for music you plan to keep.',
  },
  {
    icon: 'layers',
    title: 'Convert many files at once',
    text: 'Select a whole folder of clips. The tool lines them up and converts them one after another, so you can keep working.',
  },
  {
    icon: 'phone',
    title: 'Works on any device',
    text: 'Use it on Windows, Mac, Linux, Android, iPhone or a Chromebook. A modern browser is all you need, with no app to install.',
  },
  {
    icon: 'tag',
    title: 'Free, with no account',
    text: 'There is no sign-up, no email and no watermark. Open the page, drop your file and download the MP3.',
  },
];

const FAQS = [
  {
    q: 'Is this MP3 converter really free?',
    a: 'Yes. You can convert as many files as you like without paying, signing up or sharing an email address. The conversion runs on your own device, so it costs us very little to keep the tool free.',
  },
  {
    q: 'Are my files uploaded to your server?',
    a: 'Files you upload are never sent to us. Your browser reads the file, decodes the audio and builds the MP3 right on your device. Only when you paste a link does our server fetch that video for you, and the result is deleted after 30 minutes.',
  },
  {
    q: 'Can I convert a video to MP3?',
    a: 'Yes. Pick an MP4, MOV, WEBM or other video file and the converter pulls out only the sound track and saves it as an MP3. The picture is dropped, so the new file is much smaller than the video.',
  },
  {
    q: 'Which bitrate should I choose?',
    a: 'For speech, such as podcasts, lectures or voice memos, 128 kbps is plenty, and mono makes the file even smaller. For music, 192 kbps sounds good to most people, while 256 or 320 kbps is the better choice for songs you want to keep long term.',
  },
  {
    q: 'Will converting to MP3 lower the audio quality?',
    a: 'MP3 is a lossy format, so it removes some detail that most people cannot hear. If you start from a lossless file such as WAV or FLAC and choose 256 or 320 kbps, the result sounds almost the same as the original. However, converting an existing MP3 to a higher bitrate will not bring back lost quality.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'You can convert files up to 500 MB. Since the work happens on your device, very long recordings need free memory. If a large file fails on a phone, try it on a computer or split it into parts first.',
  },
  {
    q: 'Does the MP3 converter work on iPhone and Android?',
    a: 'Yes. It works as an MP3 converter on iPhone, iPad and Android with no app to install. Open the site in Safari, Chrome or another up-to-date browser, tap Choose Files and pick a file from your phone. When it finishes, tap Download to save the MP3 to your Files app or downloads folder.',
  },
  {
    q: 'Why did my file fail to convert?',
    a: 'The converter first uses your browser’s own decoder. If that cannot read the file, it loads a built-in FFmpeg decoder that handles almost every format. A file will usually only fail if it has no sound track (for example a silent screen recording), is copy protected (DRM) or is damaged.',
  },
  {
    q: 'Is it legal to convert files to MP3?',
    a: 'Converting files you own, or files you have permission to use, is generally fine for personal use. Please do not use the tool to copy music, films or other content that is protected by copyright without the owner’s permission.',
  },
];

function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: `${SITE.url}/`,
        name: SITE.name,
        inLanguage: 'en',
      },
      {
        '@type': 'WebApplication',
        '@id': `${SITE.url}/#app`,
        name: 'MP3 Converter',
        url: `${SITE.url}/`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any (runs in a web browser)',
        browserRequirements: 'Requires a modern browser with JavaScript and Web Audio support',
        description:
          'Free online MP3 converter that turns audio and video files into MP3 inside your browser, with bitrates from 128 to 320 kbps.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: [
          'Convert WAV, M4A, AAC, FLAC, OGG and OPUS to MP3',
          'Extract MP3 audio from MP4, MOV, WEBM and MKV video',
          'Record your voice and save it as MP3',
          '128, 192, 256 and 320 kbps output',
          'Batch conversion',
          'No upload: files stay on your device',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}/#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function HomePage() {
  return (
    <>
      <JsonLd />

      {/* ---------- Hero + tool ---------- */}
      <section className="hero container" aria-labelledby="page-title">
        <h1 id="page-title">
          MP3 Converter – Convert Audio &amp; Video to <span className="grad">MP3 Free Online</span>
        </h1>
        <p className="hero__lead">
          Our free MP3 Converter turns WAV, M4A, FLAC, MP4, MOV, MKV and many other files into clean MP3 audio in a
          few clicks. Upload a file, paste a media link or record your voice. No sign-up, and files you upload never
          leave your device.
        </p>
        <ul className="badges">
          <li><Icon name="shield" /> Private &amp; Secure</li>
          <li><Icon name="infinity" /> Unlimited File Conversions</li>
          <li><Icon name="tag" /> Free to Use</li>
          <li><Icon name="zap" /> Up to 320 kbps</li>
        </ul>
        <Converter showLink />
      </section>

      {/* ---------- Popular conversions ---------- */}
      <section className="section container" aria-labelledby="popular">
        <div className="section__head">
          <span className="eyebrow">Popular conversions</span>
          <h2 id="popular">Convert almost any format to MP3</h2>
          <p>
            One tool covers both audio and video. Choose a format below for a page with tips for that file type, or
            simply drop your file into the converter above.
          </p>
        </div>
        <div className="grid grid-4">
          {FORMATS.map((f) => (
            <Link key={f.href} href={f.href} className="card format-card">
              <span className="card__icon"><Icon name={f.tag === 'Video' ? 'fileVideo' : 'fileAudio'} /></span>
              <span>
                <span className="tag">{f.tag}</span>
                <strong>{f.name}</strong>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="container narrow">
        {/* ---------- What is ---------- */}
        <section className="section" aria-labelledby="what-is">
          <span className="eyebrow">The basics</span>
          <h2 id="what-is">What is an MP3 converter?</h2>
          <p>
            An <strong>MP3 converter</strong>, sometimes called an MP3 audio converter, is a tool that changes an audio
            or video file into the MP3 format.
            In other words, it takes a sound file that might be too big, too unusual or not supported by your device,
            and turns it into an MP3 that plays almost everywhere.
          </p>
          <p>
            MP3 has been the most common audio format for more than two decades. Your phone, your car stereo, your
            laptop, smart speakers and nearly every music player can open it. That is exactly why people still convert
            files to MP3 today, even with so many newer formats around.
          </p>
          <figure className="figure">
            <img
              src="/images/mp3-converter-hero.svg"
              alt="MP3 Converter"
              title="MP3 Converter"
              width="1100"
              height="800"
              loading="lazy"
            />
            <figcaption>Audio and video files go in, small and widely supported MP3 files come out.</figcaption>
          </figure>
          <p>
            Our free online <Link href="/"><strong>MP3 Converter</strong></Link> works a little differently from
            most. Instead of sending your file to a remote server, it does the whole job inside your web browser.
            Because there is no upload and no waiting line, it is a genuinely fast MP3 converter for most files, and
            it is far more private, since your recordings never leave your device.
          </p>
        </section>

        {/* ---------- How to ---------- */}
        <section className="section" aria-labelledby="how-to">
          <span className="eyebrow">Step by step</span>
          <h2 id="how-to">How to convert a file to MP3</h2>
          <p>
            You do not need any technical skills to use this MP3 converter. Here is the full process, and it usually
            takes less than a minute.
          </p>
          <figure className="figure">
            <img
              src="/images/how-to-convert-to-mp3.svg"
              alt="How to convert a file to MP3"
              title="How to convert a file to MP3"
              width="960"
              height="300"
              loading="lazy"
            />
          </figure>
          <ol className="steps">
            <li>
              <strong>Add your file</strong>
              Click <em>Choose Files</em> or drag a file onto the converter. You can add one file or several at the
              same time, including audio and video.
            </li>
            <li>
              <strong>Pick the MP3 quality</strong>
              Leave it on 192 kbps for everyday listening, or change it to suit your needs. Turn on Mono if the file
              is mostly speech and you want it smaller.
            </li>
            <li>
              <strong>Wait a moment</strong>
              The progress bar shows each step. First the tool reads the audio, then it encodes the MP3.
            </li>
            <li>
              <strong>Download your MP3</strong>
              Press <em>Download</em> next to the file. The new MP3 keeps the same name as the original, so it is
              easy to find later.
            </li>
          </ol>
          <div className="callout">
            <Icon name="mic" />
            <p>
              <strong>Need to capture audio first?</strong> Switch to the <em>Record</em> tab, speak into your
              microphone and press <em>Stop &amp; Convert</em>. You will get a ready-to-share MP3 voice recording.
            </p>
          </div>
        </section>

        {/* ---------- Devices ---------- */}
        <section className="section" aria-labelledby="devices">
          <span className="eyebrow">Any device</span>
          <h2 id="devices">Using the MP3 converter on iPhone, Android and computer</h2>
          <p>
            Since everything runs in the browser, there is no app to install on any device. The steps differ only in
            where your files are saved.
          </p>
          <ul className="checklist">
            <li>
              <strong>MP3 converter on iPhone and iPad.</strong> Open this page in Safari, tap Choose Files and pick
              a file from Photos or the Files app. After converting, tap Download; the MP3 appears in Files under
              Downloads, ready to share or add to a music app.
            </li>
            <li>
              <strong>Android phones and tablets.</strong> Use Chrome or any up-to-date browser. Finished MP3s are
              saved to the Downloads folder, where your music player and file manager can find them.
            </li>
            <li>
              <strong>Windows, Mac, Linux and Chromebook.</strong> Drag a whole folder of files onto the converter,
              then use Download all to save every MP3 in one go.
            </li>
          </ul>
        </section>

        {/* ---------- Why MP3 ---------- */}
        <section className="section" aria-labelledby="why">
          <span className="eyebrow">Why it matters</span>
          <h2 id="why">Why convert audio and video to MP3?</h2>
          <p>
            There are plenty of good reasons to keep an MP3 copy of your files. Below are the ones we hear about most
            often from people who use the tool.
          </p>
          <ul className="checklist">
            <li>
              <strong>It plays everywhere.</strong> Some formats, such as FLAC, OPUS or WMA, will not open on every
              phone or car stereo. MP3, on the other hand, is supported almost universally.
            </li>
            <li>
              <strong>It saves storage space.</strong> A three-minute WAV song takes roughly 30 MB. The same song as a
              192 kbps MP3 is about 4.3 MB, around seven times smaller.
            </li>
            <li>
              <strong>It is easy to share.</strong> Smaller files are quicker to send by email, WhatsApp or a cloud
              drive, and they upload faster to websites that only accept MP3.
            </li>
            <li>
              <strong>You only need the sound.</strong> If you want the audio from a lecture video, a family clip or a
              screen recording, a <strong>video to MP3 converter</strong> removes the picture and keeps just what you
              want to hear.
            </li>
          </ul>
        </section>

        {/* ---------- Bitrate guide ---------- */}
        <section className="section" aria-labelledby="bitrate">
          <span className="eyebrow">Quality guide</span>
          <h2 id="bitrate">Choosing the right MP3 bitrate</h2>
          <p>
            Bitrate, measured in kilobits per second (kbps), controls how much data the MP3 uses for each second of
            sound. A higher bitrate keeps more detail, but it also makes the file bigger. The table below shows what
            to expect so you can find the right balance.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Bitrate</th>
                  <th scope="col">Size per minute</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>128 kbps</strong></td>
                  <td>about 0.96 MB</td>
                  <td>Podcasts, audiobooks, lectures, voice memos</td>
                </tr>
                <tr>
                  <td><strong>192 kbps</strong></td>
                  <td>about 1.44 MB</td>
                  <td>Everyday music listening on phones and earbuds</td>
                </tr>
                <tr>
                  <td><strong>256 kbps</strong></td>
                  <td>about 1.92 MB</td>
                  <td>Music on good headphones or home speakers</td>
                </tr>
                <tr>
                  <td><strong>320 kbps</strong></td>
                  <td>about 2.40 MB</td>
                  <td>Archiving music, DJ sets, the highest MP3 quality</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Practical tips for better results</h3>
          <ul>
            <li>
              <strong>Start from the best source you have.</strong> Converting from WAV or FLAC gives a cleaner MP3
              than converting from another compressed file.
            </li>
            <li>
              <strong>Do not “upscale” an MP3.</strong> Turning a 128 kbps MP3 into 320 kbps makes the file bigger,
              yet it cannot restore detail that was already removed.
            </li>
            <li>
              <strong>Use mono for speech.</strong> A single voice sounds the same in mono, and the file ends up
              noticeably smaller.
            </li>
            <li>
              <strong>Keep your originals.</strong> MP3 is a lossy format, so hold on to the source file in case you
              need a different quality later.
            </li>
          </ul>
        </section>

        {/* ---------- Compare formats ---------- */}
        <section className="section" aria-labelledby="compare">
          <span className="eyebrow">Format comparison</span>
          <h2 id="compare">MP3 vs WAV vs AAC vs FLAC</h2>
          <p>
            Every audio format makes a trade-off between size, quality and compatibility. This quick comparison helps
            you decide when MP3 is the right choice and when another format might suit you better.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Format</th>
                  <th scope="col">Type</th>
                  <th scope="col">File size</th>
                  <th scope="col">Compatibility</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>MP3</strong></td>
                  <td>Lossy</td>
                  <td>Small</td>
                  <td>Plays on almost every device and app</td>
                </tr>
                <tr>
                  <td><strong>WAV</strong></td>
                  <td>Uncompressed</td>
                  <td>Very large</td>
                  <td>Great for editing, too big for daily listening</td>
                </tr>
                <tr>
                  <td><strong>AAC / M4A</strong></td>
                  <td>Lossy</td>
                  <td>Small</td>
                  <td>Strong on Apple devices, weaker on older players</td>
                </tr>
                <tr>
                  <td><strong>FLAC</strong></td>
                  <td>Lossless</td>
                  <td>Large</td>
                  <td>Loved by audiophiles, not supported everywhere</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            In short, choose MP3 when you want a file that is small and plays anywhere. Keep WAV or FLAC when you
            need a perfect master copy for editing or archiving.
          </p>
        </section>
      </div>

      {/* ---------- Features ---------- */}
      <section className="section container" aria-labelledby="features">
        <div className="section__head center">
          <span className="eyebrow">Features</span>
          <h2 id="features">Why people choose our free MP3 converter</h2>
          <p>
            We built this <Link href="/">MP3 Converter</Link> to be simple for beginners, yet useful enough for people who work with sound
            every day.
          </p>
        </div>
        <figure className="figure figure--wide">
          <img
            src="/images/why-choose-mp3-converter.svg"
            alt="Why people choose our free MP3 converter"
            title="Why people choose our free MP3 converter"
            width="1100"
            height="520"
            loading="lazy"
          />
        </figure>
        <div className="grid grid-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card">
              <span className="card__icon"><Icon name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container narrow">
        {/* ---------- Use cases ---------- */}
        <section className="section" aria-labelledby="uses">
          <span className="eyebrow">Real-life uses</span>
          <h2 id="uses">What can you do with an MP3 converter?</h2>
          <div className="grid grid-2">
            <div className="card">
              <span className="card__icon"><Icon name="book" /></span>
              <h3>Study on the go</h3>
              <p>Turn recorded lectures or online class videos into MP3 and listen during your commute or workout.</p>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="podcast" /></span>
              <h3>Publish podcasts</h3>
              <p>Export your episode as a lightweight MP3 that podcast hosts and listening apps accept without trouble.</p>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="mic" /></span>
              <h3>Share voice notes</h3>
              <p>Convert iPhone M4A memos or WhatsApp OPUS notes into MP3 so anyone can open them.</p>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="headphones" /></span>
              <h3>Build a music library</h3>
              <p>Make portable MP3 copies of your own WAV or FLAC albums for your phone, laptop and car.</p>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="music" /></span>
              <h3>Fill your MP3 player</h3>
              <p>
                Use it as an MP3 player converter: turn WMA, FLAC, M4A or OGG files that an older MP3 player or car
                stereo refuses to play into standard MP3s it can read.
              </p>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="scissors" /></span>
              <h3>Make ringtones and clips</h3>
              <p>
                Convert a song to MP3, then keep just the chorus with our <Link href="/mp3-cutter">MP3 Cutter</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Privacy / trust ---------- */}
        <section className="section" aria-labelledby="privacy">
          <span className="eyebrow">Safety &amp; privacy</span>
          <h2 id="privacy">Is this online MP3 converter safe?</h2>
          <p>
            Yes. This <Link href="/">MP3 Converter</Link> was built to be private from the start, and here is how it works behind the
            scenes, so you do not have to take our word for it. When you add
            a file, your browser uses its built-in Web Audio engine to read the sound. For formats the browser cannot
            open, such as MKV, AVI or WMA, the page loads FFmpeg, a trusted open-source media library, compiled to run
            inside your browser. Then the well-known LAME encoder compresses the sound into an MP3. Finally, your
            browser hands the finished file straight back to you.
          </p>
          <ul className="checklist">
            <li>Files you upload never leave your device. Videos fetched from a link are deleted from our server after 30 minutes.</li>
            <li>No software to install, so there is no risk of bundled adware.</li>
            <li>No account, which means no personal data to protect or leak.</li>
            <li>Close the tab, and every converted file in memory is cleared.</li>
          </ul>
          <div className="callout">
            <Icon name="info" />
            <p>
              <strong>Please convert responsibly.</strong> Use the tool for your own recordings, files you have
              bought or files you have permission to use. Copying protected music or films without permission may
              break copyright law in your country.
            </p>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="section" aria-labelledby="faq">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq">Frequently asked questions</h2>
          <div className="faq">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- About / E-E-A-T ---------- */}
        <section className="section" aria-labelledby="about">
          <h2 id="about" className="sr-only">About this page</h2>
          <div className="author-box">
            <img src="/images/logo.svg" alt="" width="52" height="52" />
            <div>
              <strong>Written by the MP3 Converter team</strong>
              <p>
                We build simple, privacy-first audio tools. Every tip on this page is checked against how the converter
                actually behaves, and we update this guide whenever the tool changes.{' '}
                <Link href="/about">Learn more about us</Link>.
              </p>
              <p style={{ color: 'var(--text-3)', fontSize: '.88rem' }}>Last updated: October 2026</p>
            </div>
          </div>
        </section>
      </div>

      {/* ---------- CTA ---------- */}
      <section className="container" aria-labelledby="cta">
        <div className="cta">
          <h2 id="cta">Ready to convert your file to MP3?</h2>
          <p style={{ color: 'var(--text-2)', maxWidth: 620, margin: '0 auto 22px' }}>
            It is free, private and takes only a few seconds. Scroll back up, drop in your file and get your MP3.
          </p>
          <a href="#converter" className="btn-grad">
            <Icon name="upload" /> Convert to MP3 Now
          </a>
        </div>
      </section>
    </>
  );
}
