# Customize theme 🎨

Depending on the product's variability, React Suite provides flexible configurable parameters on the theme design.

## Light/Dark theme

React Suite offers Light and Dark 2 sets of themes that you can use depending on the needs of your product or the environment in which you operate.

**☀️ Light**

```less
@import '~rsuite/lib/styles/themes/default/index.less';
// @import '~rsuite/dist/styles/rsuite-default.css'
```

**🌙 Dark**

```less
@import '~rsuite/lib/styles/themes/dark/index.less';
// @import '~rsuite/dist/styles/rsuite-dark.css'
```

> Design standards that can be referenced in custom themes: [Light theme](/design/default/), [Dark theme](/design/dark/).

## For customization

The React Suite style uses [Less][less] as the development language and defines a series of variables that can be customized using [Modify Variables][modify variables]. This includes but is not limited to customizing theme colors, resizing component fillet radii, modifying font styles, replacing auxiliary colors, and so on. The code in the following example is a new action in `custom-theme.less`.

### Import less

Create a separate `.less` file as follows, and then introduce this file.

```less
@import '~rsuite/lib/styles/themes/default/index.less'; //The default style file.
@import 'custom-theme.less'; // Style customization.
```

### Custom Theme Colors

Sets the theme base color.

```less
@base-color: #00bcd4;
```

After you configure the theme base color, a set of swatches (`@H050` - `@H900`, H is Hue) reference is generated: [constants.less](rsuite-theme-pallete).

Now go to the [palette](/tools/palette) to select the appropriate color or upload your own Logo to preview.

### Adjusts the fillet radius of the assembly.

```less
@border-radius-base: 2px;
```

### Modify the font style.

```less
@font-family-base: 'Lucida Grande', 'Avenir Next', 'Helvetica Neue', Helvetica, Arial,
  'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', STXihei, sans-serif;
@font-size-base: 14px;
```

### Replace the auxiliary color.

Information, successes, warnings, errors, respectively, the corresponding color, modified to affect the [Message](/components/message), Notification](/components/notification) and other needs to display the status of the components.

```less
@info-color: #2196f3;
@info-light-color: #e9f5fe;

@success-color: #4caf50;
@success-light-color: #edfae1;

@warning-color: #ffb300;
@warning-light-color: #fff9e6;

@error-color: #f44336;
@error-light-color: #fde9ef;
```

### Disable ripple animation

```less
@button-ripple: false;
```

### Disable IE polyfill

```less
@ie-polyfill: false;
```

### Disable HTML styles reset

```less
@reset-import: false;
```

### More Custom Configurations

We provide a rich [variable][variables.less], if still unable to meet your customized needs, welcome to our [issue][issue].

## Webpack compiles multiple themes

React Suite provides a Webpack assist tool [webpack-multiple-themes-compile][webpack-multiple-themes-compile], which can generate multiple sets of CSS files according to the configuration when the project is compiled, and then introduce different CSS files in different theme environments to achieve multi-theme switching effect. The principle of implementation is based on the substitution of Less's variables, so it must rely on Less compilation, we will illustrate it by the following example.

- **First**, let's look at the configuration of compiling Less into CSS by Webpack by default:

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin(`style.[hash].css`);

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: extractLess.extract({
          use: [{ loader: 'css-loader' }, { loader: 'less-loader?javascriptEnabled=true' }]
        })
      }
    ]
  }
  // ...Other configurations.
};
```

- **Then**, hand the Less file to `webpack-multiple-themes-compile` and configure the `themesConfig` parameter to define the variables needed under the theme.

```js
const merge = require('webpack-merge');
const multipleThemesCompile = require('webpack-multiple-themes-compile');

const webpackConfigs = {
  // There is another options.
};

module.exports = merge(
  webpackConfigs,
  multipleThemesCompile({
    themesConfig: {
      default: {},
      green: {
        'base-color': '#008000'
      },
      yellow: {
        'base-color': '#ffff00'
      }
    }
  })
);
```

If you use `html-webpack-plugin`, in order to avoid introducing all styles into html, you need to add the `excludeChunks` parameter to exclude topic-related CSS.

```diff
 new HtmlwebpackPlugin({
   ...
+  excludeChunks: ['themes']
 })
```

- **Finally**, after running the Webpack command, multiple sets of CSS will be generated, and corresponding CSS will be introduced in different theme environments according to their own business requirements, thus implementing multi-topic switching. For detailed implementation, please refer to the example project [multiple-themes][multiple-themes]

```
├── theme-default.css
├── theme-green.css
└── theme-yellow.css
```

## FAQ

<a id="note"></a>

### How to configure font files locally?

The icon font files used in Rsuite are deployed in [jsDelivr CDN](http://cdn.jsdelivr.net/npm/rsuite-icon-font@3.0.0/fonts/),
If you want to deploy locally, you need to modify the path to the icon font:

```less
@icon-font-path: './fonts';
```

In addition, you will also need to configure `url-loader` in webpack to load icon font files, webpack 4 configuration example:

```js
{
  test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 1,
        size: 16,
        hash: 'sha512',
        digest: 'hex',
        name: '[hash].[ext]',
        publicPath: '/'
      }
    }
  ]
}
```

### How to globally modify the component's className prefix, `rs-` ?

First, define `@ns` in your `less` file to override the default configuration.

```less
@ns: custom-;
```

Then, the constant `__RSUITE_CLASSNAME_PREFIX__` is injected via webpack , and the className prefix of all components overrides the default `rs-` by the injected constant.

```js
plugins: [
  //...
  new webpack.DefinePlugin({
    __RSUITE_CLASSNAME_PREFIX__: JSON.stringify('custom-')
  })
];
```

If it is rendered through the server, add the following code in `server.js`:

```js
global.__RSUITE_CLASSNAME_PREFIX__ = 'custom-';
```

If you use [`create-react-app`][cra] to create a project, you can modify it with [`react-app-rewire-less`][rarl] and [`react-app-rewire-define-plugin`][rardp]. For more details, see [Use in create-react-app][use-with-create-app].

[cra]: https://github.com/facebook/create-react-app
[rarl]: https://www.npmjs.com/package/react-app-rewire-less
[rardp]: https://www.npmjs.com/package/react-app-rewire-define-plugin
[less]: http://lesscss.org/
[modify variables]: http://lesscss.org/usage/#using-less-in-the-browser-modify-variables
[rsuite-theme-pallete]: https://github.com/rsuite/rsuite/blob/master/src/styles/constants.less#L32
[issue]: https://github.com/rsuite/rsuite/issues/new?template=bug_report.md
[variables.less]: https://github.com/rsuite/rsuite/blob/master/src/styles/variables.less
[use-with-create-app]: /en/guide/use-with-create-react-app#Customize%20Theme
[webpack-multiple-themes-compile]: https://github.com/rsuite/webpack-multiple-themes-compile
[multiple-themes]: https://github.com/rsuite/rsuite/tree/master/examples/custom-multiple-themes
