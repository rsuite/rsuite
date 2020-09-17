# 按需加载

为了解决在生产环境文件体积过大的问题， React Suite 支持 ES Module，您可以通过打包工具的 Tree Shaking 功能去掉文件中无用的代码。

- [Tree Shaking in rollup.js](https://rollupjs.org/guide/en/#tree-shaking)
- [Tree Shaking in Webpack](https://webpack.js.org/guides/tree-shaking/)

如果您当前的开发环境不支持 `Tree Shaking`, 可以采用以下两种方案。

## 方案一：手动引入

手动引入，需要在写代码的时候就只引入用到的文件，比如只使用 Button 组件：

```js
import Button from 'rsuite/lib/Button';
```

引入对应的样式文件:

```diff
import Button from 'rsuite/lib/Button';
+ import 'rsuite/lib/Button/styles';  // 引入默认样式 less
```

也可以引入指定主题样式:

```diff
import Button from 'rsuite/lib/Button';
+ import 'rsuite/lib/Button/styles/themes/dark';  // 引入 dark 主题的 less
```

## 方案二：使用 babel-preset-rsuite

使用 [babel-preset-rsuite](https://github.com/rsuite/babel-preset-rsuite) 可以在 Babel 编译阶段把代码转换成按需引入的方式。

### 安装 babel-preset-rsuite

```bash
$ npm install babel-preset-rsuite --save-dev
```

#### 使用

```json
// .babelrc or babel-loader option
{
  "presets": ["rsuite"]
}
```

示例：

```js
// Transforms:
import { Button } from 'rsuite';

// Roughly to:
var _Button = require('rsuite/lib/Button');
```

#### 参数配置

```json
// .babelrc or babel-loader option
{
  "presets": [["rsuite", { "style": true, "theme": "dark" }]]
}
```

- `style` (boolean) , 按需引入样式文件。
- `theme` ('default'|'dark'), 引入指定主题的样式文件，默认：'default'。

示例：

```js
// Transforms:
import { Button } from 'rsuite';

// Roughly to:
require('rsuite/lib/Button/styles/themes/dark.less');
var _Button = require('rsuite/lib/Button');
```

## 禁用 HTML 相关样式的 reset

在 rsuite 中我们默认修改了一些 HTML 样式，如果您不需要这些样式，则需要[配置不引入这些样式][config-reset-import]，这里以 `less-loader` 配置为例：

```
{
    test: /\.less$/,
    loader: 'less-loader',
    options: {
        // 如果使用 less-loader@5 或者更老的版本 ，请移除 lessOptions 这一级直接配置选项。
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: { '@reset-import': false }
        }
    }
}
```

[config-reset-import]: /guide/themes#禁用%20reset%20相关样式引用
