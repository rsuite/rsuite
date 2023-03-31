# 快速开始 ⚡️

在开始之前，您至少需要掌握前端开发基础知识以及 React 的核心概念，如果在学习过程中遇到问题，可以在[开发者社区][wechat-entry]与大家讨论。

## 安装

### 使用 npm 或 yarn 安装

推荐使用 npm 或 yarn 的方式安装。首先需要在本地正确安装 NPM 环境，通过 npm 安装 rsuite。

```bash
$ npm i rsuite --save
```

如果您在使用 yarn 也可以通过 yarn 安装:

```bash
$ yarn add rsuite
```

## 代码示例

以下是一个简单的例子，使用一个默认按钮组件。

```jsx
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function App() {
  return <Button appearance="primary">Hello World</Button>;
}
```

### 排除 CSS 样式重置

`rsuite.min.css` 包含了 CSS 样式重置。如果你需要使用自己的样式重置，使用 `rsuite-no-reset.min.css` 文件代替。

```diff
- import 'rsuite/dist/rsuite.min.css';
+ import 'rsuite/dist/rsuite-no-reset.min.css';
```

## 在线示例

<iframe src="https://codesandbox.io/embed/k9v972q3lr" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

- [在 create-react-app 中使用](/zh/guide/use-with-create-react-app/)
- [在 Next.js 中使用](/zh/guide/use-next-app/)

[wechat-entry]: https://github.com/rsuite/rsuite/blob/master/README_zh.md#%E6%94%AF%E6%8C%81-react-suite
