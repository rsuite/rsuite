/* eslint-disable @typescript-eslint/no-var-requires */

const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const markdown = require('react-markdown-reader');
const findPages = require('./scripts/findPages');
const languages = ['javascript', 'bash', 'xml', 'css', 'less', 'json', 'diff', 'typescript'];

module.exports = withImages(
  withLess({
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

      return config;
    },
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    exportTrailingSlash: true,
    exportPathMap: () => {
      const pages = findPages();
      const map = {};

      function traverse(nextPages, userLanguage) {
        const prefix = userLanguage === 'zh' ? '' : `/${userLanguage}`;

        nextPages.forEach(page => {
          if (!page.children) {
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
  })
);
