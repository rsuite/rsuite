/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const withImages = require('next-images');
const markdown = require('react-markdown-reader');
const findPages = require('./scripts/findPages');
const languages = ['javascript', 'bash', 'xml', 'css', 'less', 'json', 'diff', 'typescript'];

const resolveToStaticPath = relativePath => path.resolve(__dirname, relativePath);

module.exports = withImages({
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader'
        },
        {
          loader: 'markdown-loader',
          options: {
            pedantic: true,
            renderer: markdown.renderer(languages)
          }
        }
      ]
    });
    config.resolve.alias['@'] = resolveToStaticPath('./');
    return config;
  },
  exportTrailingSlash: true,
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(nextPages, userLanguage) {
      const prefix = userLanguage === 'zh' ? '' : `/${userLanguage}`;

      nextPages.forEach(page => {
        if (page.children.length === 0) {
          console.log(`router: ${prefix}${page.pathname}`);
          map[`${prefix}${page.pathname}`] = {
            page: page.pathname,
            query: {
              userLanguage
            }
          };
          return;
        }

        traverse(page.children, userLanguage);
      });
    }

    traverse(pages, 'en');
    traverse(pages, 'zh');

    return map;
  }
});
