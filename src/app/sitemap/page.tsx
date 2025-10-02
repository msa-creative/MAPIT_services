import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';

// Links to include (copied from footer + common pages)
const STATIC_LINKS = [
  { href: '/', title: 'Home' },
  { href: '/services/gis-consulting', title: 'GIS Consulting' },
  { href: '/services/data-processing', title: 'Data Processing' },
  { href: '/services/custom-development', title: 'Web GIS Development' },
  { href: '/portfolio/mapping-solutions', title: 'Cadastral Mapping' },
  { href: '/portfolio/satellite-projects', title: 'Satellite Projects' },
  { href: '/portfolio/all-projects', title: 'All Projects' },
  { href: '/solutions/geospatial-mapping', title: 'Web GIS Solutions' },
  { href: '/solutions/data-visualization', title: 'Data Visualization' },
  { href: '/solutions/environmental-monitoring', title: 'Environmental Monitoring' },
  { href: '/solutions/general-mapping', title: 'General Mapping' },
  { href: '/solutions/satellite-analysis', title: 'Satellite Analysis' },
  { href: '/faqs', title: 'FAQs' },
  { href: '/contact', title: 'Contact' }
];

function friendlyTitleFromPath(p: string) {
  // create a readable title from a path or filename
  const name = decodeURIComponent(p).replace(/\/+index.html$/i, '').replace(/^\//, '');
  if (!name) return 'Home';
  return name.split('/').map(s => s.replace(/[-_]/g, ' ')).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' - ');
}

export default function SitemapPage() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const publicDir = path.join(process.cwd(), 'public');

  // discover app routes
  const routes: string[] = [];
  try {
    const walk = (dir: string, base = '') => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const pageFile = path.join(entryPath, 'page.tsx');
          if (fs.existsSync(pageFile)) {
            routes.push('/' + (base ? path.posix.join(base, entry.name) : entry.name));
          }
          walk(entryPath, base ? path.posix.join(base, entry.name) : entry.name);
        }
      }
    };
    if (fs.existsSync(path.join(appDir, 'page.tsx'))) routes.push('/');
    walk(appDir);
  } catch (e) {}

  // discover public index.html files
  const publicPages: string[] = [];
  try {
    const walkPublic = (dir: string, base = '') => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const entryPath = path.join(dir, entry.name);
        const posixPath = base ? path.posix.join(base, entry.name) : entry.name;
        if (entry.isDirectory()) {
          walkPublic(entryPath, posixPath);
        } else if (entry.name.toLowerCase() === 'index.html') {
          publicPages.push('/' + posixPath.replace(/\\/g, '/'));
        }
      }
    };
    walkPublic(publicDir);
  } catch (e) {}

  // merge static footer links + discovered routes (avoid duplicates)
  const discovered = new Set(routes.concat(STATIC_LINKS.map(s => s.href)));
  const allRoutes = Array.from(discovered).sort();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Sitemap</h1>
          <p className="mb-8 text-gray-300">This human-readable sitemap lists main website pages and static map exports. Use this page to quickly navigate the site or to share important links.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-2xl mb-4">Primary Pages</h2>
              <ul className="space-y-2">
                {STATIC_LINKS.map(link => (
                  <li key={link.href}><Link href={link.href} className="text-primary hover:underline">{link.title}</Link></li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">All Discovered Routes</h2>
              <ul className="space-y-2 text-gray-300">
                {allRoutes.map(r => (
                  <li key={r}><Link href={r} className="hover:underline">{r === '/' ? 'Home' : r}</Link></li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl mb-4">Static map exports</h2>
            <ul className="space-y-2 text-gray-300">
              {publicPages.map(p => (
                <li key={p}><a href={encodeURI(p)} className="text-primary hover:underline">{friendlyTitleFromPath(p)}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
