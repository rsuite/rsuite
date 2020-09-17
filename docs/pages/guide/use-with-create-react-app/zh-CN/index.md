# 在 create-react-app 中使用

[create-react-app][create-react-app] 可以帮助快速建立一个 `react` 工程，本向导将介绍如何将 `rsuite` 于 `create-react-app` 结合使用。

## 初始化一个项目

在开始之前，您可能需要安装 [yarn][yarn]。

```bash
$ yarn create react-app test-app
```

执行后，工具将自动生成一个 `react` 开发脚手架，并安装开发 `react` 所必须的所有依赖。安装完成后执行

```bash
$ yarn start
```

浏览器会自动打开 `http://localhost:3000/`，当您看到 `Welcome to React` 页面就是安装成功了。

## 引入 rsuite

安装 rsuite

```
$ yarn add rsuite
```

然后编辑`./src/App.js`

```diff
  import React, { Component } from 'react';
- import logo from './logo.svg';
  import './App.css';

+ import 'rsuite/dist/styles/rsuite-default.css';
+ import { Button } from 'rsuite';

  class App extends Component {
    render() {
      return (
        <div className="App">
-         <header className="App-header">
-           <img src={logo} className="App-logo" alt="logo" />
-           <h1 className="App-title">Welcome to React</h1>
-         </header>
-         <p className="App-intro">
-           To get started, edit <code>src/App.js</code> and save to reload.
-         </p>
+         <Button appearance="primary"> Hello world </Button>
        </div>
      );
    }
  }

  export default App;
```

之后您会看到一个强调按钮 ，现在您可以继续进行开发了。如果您遇到其他的问题，可以查询 create-react-app 的 [官方文档][create-react-app-readme]。

## 定制主题

要使用定制主题功能，必须要修改 create-react-app 的默认配置。

1.  安装必要依赖。

```bash
yarn add react-app-rewired customize-cra less less-loader
```

2.  修改 `package.json` 中的脚本

```diff
    "scripts": {
-     "start": "react-scripts start",
+     "start": "react-app-rewired start",
-     "build": "react-scripts build",
+     "build": "react-app-rewired build",
-     "test": "react-scripts test --env=jsdom",
+     "test": "react-app-rewired test --env=jsdom",
-     "eject": "react-scripts eject"
+     "eject": "react-app-rewired eject"
    }
```

3.  编辑`./src/App.js`

```diff
- import 'rsuite/dist/styles/rsuite-default.css';
+ import 'rsuite/lib/styles/index.less';
  import { Button } from 'rsuite';
```

4.  在根目录新建 `config-overrides.js`，内容如下:

```javascript
/* config-overrides.js */
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    // 如果使用 less-loader@5 或者更老的版本 ，请移除 lessOptions 这一级直接配置选项。
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@base-color': '#f44336' }
    }
  })
);
```

重新执行 `yarn start`，看到红色按钮就是配置成功了。

这里使用 [react-app-rewired][react-app-rewired] 和 [customize-cra][customize-cra],配合 [less-loader][less-loader] 利用 `modifyVars` 配置实现定制主题。更多方法，详见[定制主题](/guide/themes)。

## 源码

- [create-react-app](https://github.com/rsuite/rsuite/tree/master/examples/create-react-app)

[yarn]: https://yarnpkg.com/
[nvm]: https://github.com/creationix/nvm#installation
[nvm-windows]: https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
[create-react-app]: https://github.com/facebook/create-react-app
[create-react-app-readme]: https://github.com/facebook/create-react-app/blob/next/README.md
[react-app-rewired]: https://github.com/timarney/react-app-rewired
[customize-cra]: https://github.com/arackaf/customize-cra
[less-loader]: https://github.com/webpack-contrib/less-loader
