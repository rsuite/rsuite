# 个性化定制 🎨

React Suite 的样式使用了 [Less][less] 作为样式的预处理，并且定义了一系列的变量，可使用 [Modify Variables][modify variables] 的方式进行定制化。包括但不限定于[定制主题色](#定制主题色)、[调整组件圆角半径](#调整组件圆角半径)、[修改字体样式](#修改字体样式)、[替换辅助色](#替换辅助色)等。下面示例中的代码均为在`custom-theme.less`进行新增操作。

### 引入 less

新建一个单独的 Less 文件如下，再引入这个文件。

```less
@import '~rsuite/styles/index.less';
@import 'custom-theme.less'; // 进行样式定制
```

### 定制主题色

设置主题基色。

```less
@primary-color: #00bcd4;
```

配置主题基色以后，会生成一组色板（`@H050` - `@H900`， H 是 Hue 的缩写 ）参考: [light.less][light.less]。

#### 深色模式

如果你想同时自定义内建深色模式的颜色，你可以使用 `@primary-color-dark` 变量。

### 调整组件圆角半径

```less
@border-radius: 2px;
```

### 修改字体样式

```less
@font-family-base: 'Lucida Grande', 'Avenir Next', 'Helvetica Neue', Helvetica, Arial,
  'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', STXihei, sans-serif;
@font-size-base: 14px;
```

### 第二色板

第二色板用作辅助颜色，分别代表不同的状态——信息、成功、警告、错误。你可以自定义第二色板来修改 [Message](/zh/components/message)、[Notification](/zh/components/notification) 等需要显示状态的组件的外观。

| Color     | State     |
| --------- | --------- |
| `@green`  | `success` |
| `@blue`   | `info`    |
| `@yellow` | `warning` |
| `@red`    | `error`   |

<!-- prettier-ignore-start -->
```less
@green:  #4caf50;
@blue:   #2196f3;
@yellow: #ffb300;
@red:    #f44336;
```
<!-- prettier-ignore-end -->

#### 深色模式

如果你想同时自定义内建深色模式的颜色，你可以使用对应的 `@green-dark`, `@blue-dark`, `@yellow-dark`, `@red-dark` 变量。

### 禁用涟漪动画

React Suite 在 `<Button>` 等一些可点击的组件上添加了涟漪动画效果。如果您不想要这些效果，可以关闭如下标识。

```less
@enable-ripple-effect: false;
```

### 禁用 IE polyfill

React Suite 默认包含了一些用于兼容 IE 11 的样式。如果您不需要这些兼容，可以关闭如下标识。

```less
@enable-ie-polyfill: false;
```

### 禁用 reset 相关样式引用

```less
@enable-css-reset: false;
```

### 更多自定义配置

我们提供了[各种场景的变量][variables.less]，如果依然不能满足您的定制需求，欢迎给我们提 [issue][issue]。

## Webpack 编译多主题方案

React Suite 提供了一个 Webpack 辅助工具 [webpack-multiple-themes-compile][webpack-multiple-themes-compile]，
可以在项目编译时候根据配置生成多套 CSS 文件，然后在不同的主题环境引入不同的 CSS 文件，实现多主题切换效果。实现的原理是基于 Less 的变量替换方式，所以必须要依赖于 Less 编译，我们通过以下一个示例进行说明。

- **首先**，我们看一下默认情况下通过 Webpack 把 Less 编译成 CSS 的配置如下:

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
  // ...其他配置
};
```

- **然后**，将 Less 文件交由 `webpack-multiple-themes-compile` 处理，配置 `themesConfig` 参数定义主题下需要的变量。

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
        'primary-color': '#008000'
      },
      yellow: {
        'primary-color': '#ffff00'
      }
    }
  })
);
```

如果您使用了 `html-webpack-plugin`, 为了避免把所有的样式引入到 html 中，需要额外添加 `excludeChunks` 参数，排除主题相关 CSS。

```diff
 new HtmlwebpackPlugin({
   ...
+  excludeChunks: ['themes']
 })
```

- **最后**，在运行 Webpack 命令以后，就会生成多套 CSS，根据自己的业务要求，在不同的主题环境下引入对应的 CSS，就实现了多主题切换。具体详细的实现可以参考示例项目 [multiple-themes][multiple-themes]

```
├── theme-default.css
├── theme-green.css
└── theme-yellow.css
```

> 如果您使用了 [`create-react-app`][cra] 创建项目，可以通过 [`react-app-rewire-less`][rarl] 和 [`react-app-rewire-define-plugin`][rardp] 进行修改。详见[在 create-react-app 中使用][use-with-create-app]。

[cra]: https://github.com/facebook/create-react-app
[rarl]: https://www.npmjs.com/package/react-app-rewire-less
[rardp]: https://www.npmjs.com/package/react-app-rewire-define-plugin
[less]: http://lesscss.org/
[modify variables]: http://lesscss.org/usage/#using-less-in-the-browser-modify-variables
[rsuite-theme-pallete]: https://github.com/rsuite/rsuite/blob/main/src/styles/colors/light.less
[issue]: https://github.com/rsuite/rsuite/issues/new?assignees=&labels=&template=bug-report.yml
[variables.less]: https://github.com/rsuite/rsuite/blob/master/src/styles/variables.less
[use-with-create-app]: /guide/use-with-create-react-app#定制主题
[webpack-multiple-themes-compile]: https://github.com/rsuite/webpack-multiple-themes-compile
[multiple-themes]: https://github.com/rsuite/rsuite/tree/master/examples/custom-multiple-themes
