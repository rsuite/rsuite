/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RtlCssPlugin = require('rtlcss-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const pkg = require('./package.json');
const findPages = require('./scripts/findPages');
const markdownRenderer = require('./scripts/markdownRenderer');

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

const getLanguage = language => LANGUAGES[language] || '';

module.exports = {
  env: {
    DEV: __DEV__ ? 1 : 0,
    VERSION: pkg.version
  },
  webpack(config) {
    const originEntry = config.entry;

    config.module.rules.unshift({
      test: /\.svg$/,
      include: SVG_LOGO_PATH,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            icon: true
          }
        }
      ]
    });

    config.module.rules.push({
      test: /\.ts|tsx?$/,
      use: ['babel-loader?babelrc'],
      include: [RSUITE_ROOT, path.join(__dirname, './')],
      exclude: /node_modules/
    });

    config.module.rules.push({
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            postcssOptions: {
              plugins: [
                require('autoprefixer'),
                // Do not use postcss-rtl which generates a LTR+RTL css
                // Use rtlcss-webpack-plugin which generates separate LTR css and RTL css
                // require('postcss-rtl')({}),
                require('postcss-custom-properties')()
              ]
            }
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            lessOptions: {
              globalVars: {
                rootPath: '../../../'
              }
            }
          }
        }
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

    /**
     * @see https://github.com/vercel/next.js/blob/0bcc6943ae7a8c3c7d1865b4ae090edafe417c7c/packages/next/build/webpack/config/blocks/css/index.ts#L311
     */
    config.plugins.push(
      new MiniCssExtractPlugin({
        experimentalUseImportModule: true, // isWebpack5
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[contenthash].css'
      }),
      new RtlCssPlugin('static/css/[name]-rtl.css')
    );

    config.optimization.minimizer.push(
      /**
       * Minimize CSS using cssnano
       * @see https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
       */
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'advanced',
            {
              // Don't modify z-index
              zindex: false
            }
          ]
        }
      })
    );

    config.resolve.alias['@'] = resolveToStaticPath('./');
    config.resolve.alias['rsuite'] = resolveToStaticPath('../src');
    config.resolve.alias['@rsuite-locales'] = resolveToStaticPath(
      './node_modules/rsuite/lib/locales'
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
  trailingSlash: true,
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(nextPages, userLanguage) {
      const [language, rootPath] = getLanguage(userLanguage);

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
};
