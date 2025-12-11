/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rsuitejs.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',

  // Exclude internal pages and example pages
  exclude: ['/404', '/500', '/_error', '/api/*', '*/examples/*', '*/_components/*'],

  // Transform function to customize each URL entry
  transform: async (config, path) => {
    // Set priority based on page type
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/guide/')) {
      priority = 0.9;
    } else if (path.includes('/components/')) {
      priority = 0.8;
    } else if (path.includes('/resources/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      // Declare English/Chinese site roots for all paths, next-sitemap will append the current path
      alternateRefs: [
        {
          href: config.siteUrl,
          hreflang: 'en'
        },
        {
          href: `${config.siteUrl}/zh`,
          hreflang: 'zh'
        }
      ]
    };
  },

  // Additional paths that might not be auto-discovered
  additionalPaths: async () => {
    // Add any additional static paths if needed
    return [];
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/']
      }
    ],
    additionalSitemaps: []
  }
};
