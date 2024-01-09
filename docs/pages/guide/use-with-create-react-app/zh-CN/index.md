# Create React App

Create React App 是 React 官方支持的创建单页 React 应用的方式。以下将介绍如何在 Create React App 中使用 rsuite。

## 自动安装

Create React App 允许用户使用模板创建项目，rsuite 提供了两个模板，分别是 JavaScript 和 TypeScript。

### JavaScript 模版

生成 JavaScript 项目的入门模板，请运行以下命令：

<!--{include:<install-cra-js>}-->

### TypeScript 模版

生成 TypeScript 项目的入门模板，请运行以下命令：

<!--{include:<install-cra-ts>}-->

## 手动安装

如果您已经有了一个 Create React App 项目，您可以按照以下步骤安装 rsuite。

### 1、安装 rsuite

在 Create React App 项目目录中，通过运行以下任一命令来安装 rsuite：

<!--{include:<install-guide>}-->

### 2、使用 rsuite 组件

编辑`./src/App.js`，使用 `CustomProvider` 组件包裹根组件，设置默认主题为 `light`:

```tsx
import React from 'react';
import { Button, CustomProvider, Container } from 'rsuite';
import logo from './logo.svg';
import 'rsuite/dist/rsuite.min.css';
import './App.css';

function App() {
  return (
    <CustomProvider theme="light">
      <Container className="app">
        <header className="app-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <Button href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </Button>
        </header>
      </Container>
    </CustomProvider>
  );
}

export default App;
```

## 基于 Less 的定制 (可选)

默认情况下你可以通过修改 [CSS 变量来定制主题](https://rsuitejs.com/guide/css-variables/)，如果你的项目中使用了 Less，你可以通过以下步骤来定制主题。

### 1、安装 @craco/craco

<!--{include:<install-craco>}-->

### 2、craco.config.js

在项目的根目录中创建 CRACO 配置文件并配置：

```diff
  my-app
  ├── node_modules
+ ├── craco.config.js
  └── package.json
```

编辑 craco.config.js 文件如下

```js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#f44336' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
```

### 3、引入 rsuite 的 less 文件

修改 `./src/App.js`，引入 rsuite 的 less 文件：

```diff
- import 'rsuite/dist/rsuite.min.css';
+ import 'rsuite/styles/index.less';
```

### 4、使用 craco CLI

更新 package.json 脚本部分中对 react-scripts 的调用改为使用 craco CLI：

```diff

"scripts": {
-  "start": "react-scripts start"
+  "start": "craco start"
-  "build": "react-scripts build"
+  "build": "craco build"
-  "test": "react-scripts test"
+  "test": "craco test"
}
```

重启项目，即可看到定制后的主题。

## 示例项目

- [examples/create-react-app](https://github.com/rsuite/rsuite/tree/main/examples/create-react-app)
