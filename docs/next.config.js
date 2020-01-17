/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const withImages = require('next-images');
const pkg = require('../package.json');
const findPages = require('./scripts/findPages');
const markdownRenderer = require('./scripts/markdownRenderer');

const resolveToStaticPath = relativePath => path.resolve(__dirname, relativePath);
const SVG_LOGO_PATH = resolveToStaticPath('./resources/images');
const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = withImages({
  webpack(config) {
    const plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          __DEV__: JSON.stringify(__DEV__),
          VERSION: JSON.stringify(pkg.version)
        }
      })
    ]);

    config.module.rules.unshift({
      test: /\.svg$/,
      include: SVG_LOGO_PATH,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]'
          }
        },
        'svgo-loader'
      ]
    });

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
            renderer: markdownRenderer([
              'javascript',
              'bash',
              'xml',
              'css',
              'less',
              'json',
              'diff',
              'typescript'
            ])
          }
        }
      ]
    });

    config.resolve.alias['@'] = resolveToStaticPath('./');
    if (__DEV__) {
      config.resolve.alias['rsuite'] = resolveToStaticPath('../');
    }

    config.plugins = plugins;

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
  },
  exclude: SVG_LOGO_PATH
});
