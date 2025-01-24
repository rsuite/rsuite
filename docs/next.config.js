/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RtlCssPlugin = require('rtlcss-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const pkg = require('./package.json');
const markdownRenderer = require('./scripts/markdownRenderer');
const { format } = require('date-fns');

const resolveToStaticPath = relativePath => path.resolve(__dirname, relativePath);
const SVG_LOGO_PATH = resolveToStaticPath('./resources/images');

const {
  // 'production' on main branch
  // 'preview' on pr branches
  // empty on local machine
  // @see https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  VERCEL_ENV = 'local'
} = process.env;

const __USE_SRC__ = VERCEL_ENV === 'preview' || VERCEL_ENV === 'local';
const __DEV__ = VERCEL_ENV === 'local';
const BUILD_ID = format(new Date(), 'yyyyMMddHHmm');

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  env: {
    VERSION: pkg.version,
    BUILD_ID
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: false
  },
  eslint: {
    // ESLint is ignored because it's already run in CI workflow
    ignoreDuringBuilds: true
  },
  experimental: {
    externalDir: true
  },
  // Exclude example pages from static generation
  exportPathMap: async function (defaultPathMap) {
    const pathMap = { ...defaultPathMap };
    
    // Remove example pages from static generation
    Object.keys(pathMap).forEach(path => {
      if (path.includes('/examples/')) {
        delete pathMap[path];
      }
    });
    
    return pathMap;
  },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @param {{ isServer: boolean }}
   */
  webpack(config, { isServer }) {
    const originEntry = config.entry;

    config.module.rules.unshift({
      test: /\.svg$/,
      include: SVG_LOGO_PATH,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true
          }
        }
      ]
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
                require('autoprefixer')
                // Do not use postcss-rtl which generates a LTR+RTL css
                // Use rtlcss-webpack-plugin which generates separate LTR css and RTL css
                // require('postcss-rtl')({})
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
                rootPath: __USE_SRC__ ? '../../../src/' : '~rsuite'
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
          loader: 'react-code-view/webpack-md-loader',
          options: {
            htmlOptions: {
              // HTML Loader options
              // See https://github.com/webpack-contrib/html-loader#options
            },
            markedOptions: {
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
              // Pass options to marked
              // See https://marked.js.org/using_advanced#options
            }
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

    if (__DEV__) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

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

    config.entry = async () => {
      const entries = await originEntry();
      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.ts')) {
        entries['main.js'].unshift('./client/polyfills.ts');
      }
      return entries;
    };

    // If we are building docs with local rsuite from src (local development and review builds),
    // we should stick `react` and `react-dom` imports to docs/node_modules
    // preventing "more than one copy of React" error
    if (__USE_SRC__) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/internals': path.resolve(__dirname, '../src/internals'),
        rsuite: path.resolve(__dirname, '../src'),
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom')
      };
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false
      };
    }

    return config;
  },
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3 // default 2
  },
  typescript: {
    tsconfigPath: __USE_SRC__ ? './tsconfig.local.json' : './tsconfig.json'
  },
  trailingSlash: true,
  pageExtensions: ['tsx'],
  redirects() {
    return [
      {
        source: '/design/:theme(default|dark)',
        destination: '/design/:theme/index.html',
        permanent: true
      }
    ];
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com'
      }
    ]
  }
};
