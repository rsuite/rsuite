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
+ import 'rsuite/Button/styles/index.css';
```
