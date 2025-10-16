const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://awsspeedtest.com';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');
const REGIONS_PATH = path.join(__dirname, '../src/assets/data/regions.json');

function generateSitemap() {
  const now = new Date().toISOString();
  
  // Static routes
  const staticRoutes = [
    { url: '/latency', priority: '1.00' },
    { url: '/regions', priority: '0.80' },
    { url: '/availability-zones', priority: '0.80' },
    { url: '/geographies', priority: '0.80' },
    { url: '/about', priority: '0.80' },
    { url: '/privacy', priority: '0.50' }
  ];

  // Dynamic region routes
  let dynamicRoutes = [];
  try {
    const regionsData = JSON.parse(fs.readFileSync(REGIONS_PATH, 'utf8'));
    dynamicRoutes = regionsData.map(region => ({
      url: `/regions/${region.regionId}`,
      priority: '0.60'
    }));
  } catch (error) {
    console.warn('Could not read regions data:', error.message);
  }

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
     xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes.map(route => `<url>
  <loc>${DOMAIN}${route.url}</loc>
  <lastmod>${now}</lastmod>
  <priority>${route.priority}</priority>
</url>`).join('\n')}

</urlset>`;

  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`Sitemap generated with ${allRoutes.length} URLs at ${OUTPUT_PATH}`);
}

if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
