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
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';

// import default style
import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'

function App() {
  return <Button>Hello World</Button>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## 在线示例

<iframe src="https://codesandbox.io/embed/k9v972q3lr" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

- [在 create-react-app 中使用](use-with-create-react-app)
- [在 Next.js 中使用](use-next-app)

[wechat-entry]: https://github.com/rsuite/rsuite/blob/master/README_zh.md#%E6%94%AF%E6%8C%81-react-suite
