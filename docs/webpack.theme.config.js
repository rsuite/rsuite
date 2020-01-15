const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const multipleThemesCompile = require('webpack-multiple-themes-compile');
const RTLCSSPlugin = require('./scripts/RTLCSSPlugin');

const { resolve } = require('path');

const resolveDirName = path => resolve(__dirname, path);

const PORT = process.env.PORT || 3001;
const CSS_PATH = 'css';

const themesConfig = multipleThemesCompile({
  themesConfig: {
    default: {},
    dark: {}
  },
  styleLoaders: [
    { loader: 'css-loader' },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true
      }
    }
  ],
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
    devServer: {
      contentBase: resolveDirName('public'),
      disableHostCheck: true,
      historyApiFallback: true,
      compress: true,
      host: '127.0.0.1',
      port: PORT
    },
    output: {
      path: resolveDirName('public'),
      filename: 'css/theme-[name].js',
      publicPath: '/'
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [resolveDirName('public/css/theme-*.css')],
        cleanAfterEveryBuildPatterns: [resolveDirName('public/css/*.js')]
      }),
      new RTLCSSPlugin({
        path: CSS_PATH
      })
    ]
  },
  themesConfig
);
