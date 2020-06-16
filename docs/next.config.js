/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const pkg = require('./package.json');
const findPages = require('./scripts/findPages');
const markdownRenderer = require('./scripts/markdownRenderer');
const ip = require('ip');

const resolveToStaticPath = relativePath => path.resolve(__dirname, relativePath);
const SVG_LOGO_PATH = resolveToStaticPath('./resources/images');
const __DEV__ = process.env.NODE_ENV !== 'production';

const RSUITE_ROOT = path.join(__dirname, '../src');
const LANGUAGES = {
  // key: [language, path]
  default: ['en', ''],
  en: ['en', '/en'],
  zh: ['zh', '/zh']
};

const useLanguage = language => LANGUAGES[language] || '';

module.exports = withPlugins([[withImages]], {
  webpack(config) {
    const originEntry = config.entry;

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
      test: /\.ts|tsx?$/,
      use: ['babel-loader?babelrc'],
      include: [RSUITE_ROOT, path.join(__dirname, './')],
      exclude: /node_modules/
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

    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          __DEV__: JSON.stringify(__DEV__),
          // Use to load css when npm run dev,
          __LOCAL_IP__: __DEV__ ? JSON.stringify(ip.address()) : null,
          VERSION: JSON.stringify(pkg.version)
        }
      })
    ]);

    config.resolve.alias['@'] = resolveToStaticPath('./');
    config.resolve.alias['@rsuite-locales'] = resolveToStaticPath(
      './node_modules/rsuite/lib/IntlProvider/locales'
    );

    config.entry = async () => {
      const entries = await originEntry();
      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.ts')) {
        entries['main.js'].unshift('./client/polyfills.ts');
      }
      return entries;
    };

    return config;
  },
  exportTrailingSlash: true,
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(nextPages, userLanguage) {
      const [language, rootPath] = useLanguage(userLanguage);

      nextPages.forEach(page => {
        if (page.children.length === 0) {
          map[`${rootPath}${page.pathname}`] = {
            page: page.pathname,
            query: { userLanguage: language }
          };
          return;
        }

        traverse(page.children, userLanguage);
      });
    }

    Object.keys(LANGUAGES).forEach(key => traverse(pages, key));

    return map;
  },
  exclude: SVG_LOGO_PATH,
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3 // default 2
  }
});
