<?xml version="1.0" encoding="UTF-8"?>
<!-- Browser view for /sitemap.xml and /sitemaps/<lang>.xml. Search engines ignore it and read the XML directly. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex, follow"/>
        <title>XML Sitemap – MP3 Converter</title>
        <style>
          *{box-sizing:border-box}
          body{margin:0;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#111827;background:#faf8ff;line-height:1.5}
          header{background:linear-gradient(135deg,#3b82f6,#a855f7);color:#fff;padding:36px 16px 30px}
          header .in,main{max-width:1100px;margin:0 auto}
          h1{margin:0 0 6px;font-size:1.7rem;font-weight:800}
          header p{margin:0;opacity:.92;font-size:.95rem}
          header a{color:#fff;text-decoration:underline}
          main{padding:24px 16px 48px}
          .count{display:inline-block;margin:0 0 14px;padding:5px 12px;border-radius:999px;background:#f3efff;color:#7c3aed;font-weight:700;font-size:.88rem}
          .wrap{overflow-x:auto;background:#fff;border:1px solid #ece8f7;border-radius:14px;box-shadow:0 8px 24px -16px rgba(124,58,237,.35)}
          table{width:100%;border-collapse:collapse;font-size:.92rem}
          th{text-align:left;padding:12px 16px;background:#f7f5fd;color:#4b5563;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
          td{padding:11px 16px;border-top:1px solid #f0edf8;vertical-align:top}
          tr:hover td{background:#fbfaff}
          td a{color:#7c3aed;text-decoration:none;word-break:break-all}
          td a:hover{text-decoration:underline}
          .muted{color:#6b7280;white-space:nowrap}
          .num{text-align:right}
          footer{margin-top:18px;color:#6b7280;font-size:.85rem}
        </style>
      </head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

  <!-- Sitemap index: one row per language sitemap -->
  <xsl:template match="s:sitemapindex">
    <header>
      <div class="in">
        <h1>XML Sitemap Index</h1>
        <p>This index lists one sitemap per language for <a href="/">mp3convert.tools</a>. It is read by search engines such as Google and Bing.</p>
      </div>
    </header>
    <main>
      <span class="count"><xsl:value-of select="count(s:sitemap)"/> sitemaps</span>
      <div class="wrap">
        <table>
          <thead><tr><th>Sitemap</th><th>Last modified</th></tr></thead>
          <tbody>
            <xsl:for-each select="s:sitemap">
              <tr>
                <td><a><xsl:attribute name="href"><xsl:call-template name="path"><xsl:with-param name="url" select="s:loc"/></xsl:call-template></xsl:attribute><xsl:value-of select="s:loc"/></a></td>
                <td class="muted"><xsl:value-of select="concat(substring(s:lastmod,1,10),' ',substring(s:lastmod,12,5))"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>
      <footer>Generated automatically on every deployment.</footer>
    </main>
  </xsl:template>

  <!-- Language sitemap: one row per page -->
  <xsl:template match="s:urlset">
    <header>
      <div class="in">
        <h1>XML Sitemap</h1>
        <p>Pages in this language, with links to the same page in every other language. <a href="/sitemap.xml">← Back to the sitemap index</a></p>
      </div>
    </header>
    <main>
      <span class="count"><xsl:value-of select="count(s:url)"/> URLs</span>
      <div class="wrap">
        <table>
          <thead><tr><th>URL</th><th class="num">Languages</th><th class="num">Priority</th><th>Change freq.</th><th>Last modified</th></tr></thead>
          <tbody>
            <xsl:for-each select="s:url">
              <tr>
                <td><a><xsl:attribute name="href"><xsl:call-template name="path"><xsl:with-param name="url" select="s:loc"/></xsl:call-template></xsl:attribute><xsl:value-of select="s:loc"/></a></td>
                <td class="muted num"><xsl:value-of select="count(xhtml:link[@hreflang != 'x-default'])"/></td>
                <td class="muted num"><xsl:value-of select="s:priority"/></td>
                <td class="muted"><xsl:value-of select="s:changefreq"/></td>
                <td class="muted"><xsl:value-of select="concat(substring(s:lastmod,1,10),' ',substring(s:lastmod,12,5))"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>
    </main>
  </xsl:template>
  <!-- Links in this view stay on the current host (handy on preview deployments); the XML keeps the full URLs. -->
  <xsl:template name="path">
    <xsl:param name="url"/>
    <xsl:value-of select="concat('/', substring-after(substring-after($url, '://'), '/'))"/>
  </xsl:template>
</xsl:stylesheet>
