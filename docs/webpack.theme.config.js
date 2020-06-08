const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const multipleThemesCompile = require('webpack-multiple-themes-compile');
const RTLCSSPlugin = require('./scripts/RTLCSSPlugin');

const { resolve } = require('path');

const resolveDirName = path => resolve(__dirname, path);
const filterEmpty = array => Array.from(array).filter(Boolean);

const PORT = process.env.PORT || 3001;
const __PRO__ = process.env.NODE_ENV === 'production';
const __DEV_STYLES__ = process.env.STYLE_DEBUG === 'STYLE';
const __DEV__ = !__PRO__;
const sourceMap = __DEV__;
const CSS_PATH = 'css';

const themesConfig = multipleThemesCompile({
  themesConfig: {
    default: {},
    dark: {}
  },
  styleLoaders: filterEmpty([
    { loader: 'css-loader', options: { sourceMap } },
    __DEV__ && {
      loader: 'postcss-loader',
      options: {
        sourceMap,
        plugins: [
          ...(__DEV_STYLES__
            ? [
                require('autoprefixer'),
                require('cssnano')({
                  preset: [
                    'default',
                    {
                      discardComnments: {
                        removeAll: false
                      }
                    }
                  ]
                })
              ]
            : []),
          require('postcss-rtl')({})
        ]
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap,
        javascriptEnabled: true,
        globalVars: {
          rootPath: __PRO__ ? '~rsuite/' : '../../../'
        }
      }
    }
  ]),
  lessContent: themeName => `// Generate by Script.
@import '../index.less';
@import '../themes/${themeName}.less';

@theme-name: ${themeName};`,
  cwd: resolveDirName('./'), // 将相对目录修改为 webpack.config.js 所在目录
  cacheDir: './less/themes-cache', // 输出目录
  outputName: `${CSS_PATH}/theme-[name].css`
});

module.exports = merge(
  {
    // https://webpack.js.org/configuration/devtool/#devtool
    devtool: sourceMap && 'source-map',
    devServer: {
      contentBase: resolveDirName('public'),
      disableHostCheck: true,
      historyApiFallback: true,
      compress: true,
      host: '0.0.0.0',
      port: PORT
    },
    output: {
      path: resolveDirName('public'),
      filename: 'css/theme-[name].js',
      publicPath: '/'
    },
    plugins: filterEmpty([
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [resolveDirName('public/css/theme-*.css')],
        cleanAfterEveryBuildPatterns: [resolveDirName('public/css/*.js')]
      }),
      __PRO__ &&
        new RTLCSSPlugin({
          path: CSS_PATH
        })
    ])
  },
  themesConfig,
  __PRO__
    ? {}
    : {
        resolve: {
          alias: {
            rsuite: resolveDirName('../')
          }
        }
      }
);
