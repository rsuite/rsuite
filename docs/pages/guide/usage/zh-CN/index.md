# 快速开始 ⚡️

在开始之前，您至少需要掌握前端开发基础知识以及 React 的核心概念，如果在学习过程中遇到问题，可以在[开发者社区][wechat-entry]与大家讨论。

## 1、安装

在终端中运行以下命令之一来安装 rsuite：

<!--{include:<install-guide>}-->

## 2、使用组件

以下是一个简单的例子，使用一个默认按钮组件。

```jsx
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function App() {
  return <Button>Hello World</Button>;
}
```

### 2.1、排除 CSS 重置（可选）

`rsuite.min.css` 包含了 [CSS 重置](/zh/guide/css-reset/)。如果你需要使用自己的样式，使用 `rsuite-no-reset.min.css` 文件代替。

```diff
- import 'rsuite/dist/rsuite.min.css';
+ import 'rsuite/dist/rsuite-no-reset.min.css';
```

### 2.2、按需导入组件样式（可选）

如果你只需要部分组件的样式，可以按需导入组件样式。

```jsx
// If you are using Less, import the `index.less` file.
import 'rsuite/Button/styles/index.css';
```

## 框架使用指南

React Suite 可以在您喜欢的框架中使用。我们为这些框架准备了逐步指南：

<!--{include:<framework-guide>}-->

[wechat-entry]: https://github.com/rsuite/rsuite/blob/master/README_zh.md#%E6%94%AF%E6%8C%81-react-suite
