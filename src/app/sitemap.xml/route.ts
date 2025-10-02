import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://mapit-services.com';

// Helper to format date to YYYY-MM-DD
function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}

export async function GET() {
    // Auto-discover Next.js routes by scanning src/app for page.tsx files
    const appDir = path.join(process.cwd(), 'src', 'app');
    const routes: string[] = [];
    try {
      const walkApp = (dir: string, base = '') => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const entryPath = path.join(dir, entry.name);
          const routePath = path.posix.join(base, entry.name);
          if (entry.isDirectory()) {
            // if directory contains 'page.tsx' treat it as a route
            const pageFile = path.join(entryPath, 'page.tsx');
            if (fs.existsSync(pageFile)) {
              const route = '/' + (base === '' ? entry.name : path.posix.join(base, entry.name));
              routes.push(route.replace(/\\\\/g, '/'));
            }
            walkApp(entryPath, routePath);
          }
        }
      };
      // root index page
      if (fs.existsSync(path.join(appDir, 'page.tsx'))) routes.push('/');
      walkApp(appDir);
    } catch (e) {
      // fallback to common routes if scanning fails
      routes.push('/', '/solutions', '/services', '/contact');
    }

  // Include static HTML files inside public root (like the exported maps)
  const publicDir = path.join(process.cwd(), 'public');
  let staticFiles: string[] = [];
  try {
    const walk = (dir: string, baseUrl = '') => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const entryPath = path.join(dir, entry.name);
        const posixPath = baseUrl ? path.posix.join(baseUrl, entry.name) : entry.name;
        if (entry.isDirectory()) {
          walk(entryPath, posixPath);
        } else {
          const ext = path.extname(entry.name).toLowerCase();
          // only include real HTML pages (prefer index.html files)
          if (ext === '.html') {
            // store with posix separators
            staticFiles.push(posixPath);
          }
        }
      }
    };
    walk(publicDir);
    // filter to include mainly index.html pages (map folders) and top-level html files
    staticFiles = staticFiles.filter(f => f.toLowerCase().endsWith('.html'))
      .filter(f => f.toLowerCase().endsWith('/index.html') || path.posix.basename(f).toLowerCase() === 'index.html' || path.posix.dirname(f) === '.')
      .map(f => f.replace(/\\\\/g, '/'));
  } catch (e) {
    // ignore missing public folder
    staticFiles = [];
  }

  // Build sitemap entries
  const allUrls = new Map<string, { lastmod?: string; priority?: number }>();

  // Add discovered routes with sensible defaults
  routes.forEach((r, i) => {
    const clean = r === '/' ? '/' : r.replace(/\\/g, '/');
    allUrls.set(DOMAIN + clean, { lastmod: formatDate(new Date()), priority: r === '/' ? 1.0 : 0.8 });
  });

  staticFiles.forEach((file) => {
    // file is posix-style like "Arizona Glamping  Sites/index.html"
    // Use a single encode step with encodeURI on the full URL to avoid double-encoding
    const fullUrl = encodeURI(DOMAIN + '/' + file);
    let statDate: string | undefined;
    try {
      const stats = fs.statSync(path.join(publicDir, ...file.split('/')));
      statDate = formatDate(stats.mtime);
    } catch {}
    // static maps change less frequently
    allUrls.set(fullUrl, { lastmod: statDate, priority: 0.6 });
  });

  // Generate XML
  const urlsXml = Array.from(allUrls.entries())
    .map(([loc, meta]) => {
  const lastmod = meta.lastmod ? `<lastmod>${meta.lastmod}</lastmod>` : '';
  const priority = meta.priority ? `<priority>${meta.priority.toFixed(1)}</priority>` : '';
  // Heuristic changefreq: homepage=daily, high priority=daily, maps/static=monthly, others=weekly
  let changefreq = `<changefreq>weekly</changefreq>`;
  if (meta.priority && meta.priority >= 0.9) changefreq = `<changefreq>daily</changefreq>`;
  if (meta.priority && meta.priority <= 0.6) changefreq = `<changefreq>monthly</changefreq>`;
  return `  <url>\n    <loc>${loc}</loc>\n    ${lastmod}\n    ${changefreq}\n    ${priority}\n  </url>`;
    })
    .join('\n');

  // Add an XSL stylesheet link so browsers render the sitemap nicely (optional; search engines ignore it)
  const xslLink = `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xslLink}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600'
    }
  });
}
