/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const multipleThemesCompile = require('webpack-multiple-themes-compile');

module.exports = multipleThemesCompile({
  themesConfig: {
    default: {}
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
  cwd: path.resolve(__dirname, './'),
  cacheDir: './src/less/themes-cache',
  outputName: themeName => `css/${themeName}.css`
});
