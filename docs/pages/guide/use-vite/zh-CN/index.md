# Vite

Vite 是一个由原生 ESM 驱动的 Web 开发构建工具。以下将介绍如何在 Vite React 项目中使用 rsuite。

> 此文档是基于 Vite v5.x.x 编写的，如果您使用的是其他版本，可能会有所不同。

## 1、安装

在 Vite React 项目中，通过运行以下任一命令来安装 rsuite：

<!--{include:<install-guide>}-->

## 2、导入 CSS

编辑 `src/main.tsx`，添加以下代码：

```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
+ import 'rsuite/dist/rsuite.min.css';  // or 'rsuite/styles/index.less';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

如果您使用了 Less 作为 CSS 预处理，您可以通过 `rsuite/styles/index.less` 来引入样式。

## 3、设置 Provider

继续编辑 `src/main.tsx`，导入 `CustomProvider` 组件，并将其包裹在 `<App />` 组件外部。

```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
+ import { CustomProvider } from 'rsuite';
import App from './App.tsx';
import 'rsuite/styles/index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
+   <CustomProvider theme="dark">
      <App />
+   </CustomProvider>
  </React.StrictMode>
);
```

## 示例项目

- [examples/with-vite](https://github.com/rsuite/rsuite/tree/main/examples/with-vite)
