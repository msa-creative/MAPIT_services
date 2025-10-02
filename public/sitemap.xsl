<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap for MAPIT</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; background:#fff; color:#111 }
          .container{ max-width:1000px; margin:30px auto; padding:20px }
          h1{ color:#0ea5a4 }
          table{ width:100%; border-collapse:collapse }
          th, td{ padding:8px 10px; border-bottom:1px solid #e6e6e6; text-align:left }
          th{ background:#f7fafc }
          a{ color:#0ea5a4; text-decoration:none }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sitemap — MAPIT</h1>
          <p>Generated sitemap for <a href="https://mapit-services.com">mapit-services.com</a></p>
          <table>
            <thead>
              <tr><th>URL</th><th>Last Modified</th><th>Change Frequency</th><th>Priority</th></tr>
            </thead>
            <tbody>
              <xsl:for-each select="//url">
                <tr>
                  <td><a href="{loc}"><xsl:value-of select="loc"/></a></td>
                  <td><xsl:value-of select="lastmod"/></td>
                  <td><xsl:value-of select="changefreq"/></td>
                  <td><xsl:value-of select="priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
