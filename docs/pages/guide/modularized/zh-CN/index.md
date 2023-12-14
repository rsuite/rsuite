# 最小化打包文件大小

我们应该使得的编译后的文件尽可能的小，来提升用户体验。

## Tree Shaking

Tree Shaking 是一种通过清除最终文件中未使用的代码来优化体积的方法。必须通过 ES modules 导入组件。

```js
import { Button, Input } from 'rsuite';
```

然后在打包构建工具中进行配置:

- [Tree Shaking in rollup.js](https://rollupjs.org/guide/en/#tree-shaking)
- [Tree Shaking in Webpack](https://webpack.js.org/guides/tree-shaking/)

⚠️ 如果您的开发环境不支持 `Tree Shaking`, 还可以通过以下方法来到达最小化打包文件大小。

## 使用路径导入

路径导入是在写代码的时候就只引入用到的文件，这样可以避免导入用不到的模块。比如 Button 组件：

```diff
- import { Button } from 'rsuite';
+ import Button from 'rsuite/Button';
```

导入对应的样式文件:

```diff
import Button from 'rsuite/Button';
+ import 'rsuite/Button/styles/index.less';
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
          modifyVars: { '@enable-css-reset': false }
        }
    }
}
```

[config-reset-import]: /zh/guide/customization-less/#禁用-reset-相关样式引用
