# 在 Next.js 中使用

Next.js 是一个轻量级的 React 服务端渲染应用框架。

## 初始化一个项目

```bash
$ npx create-next-app
```

如果您使用 npm 5.1 或更早版本，您不能使用 npx。执行以下命令代替：

```
$ npm install -g create-next-app
$ create-next-app
```

然后执行

```bash
$ yarn dev
```

浏览器打开 `http://localhost:3000/`，当您看到 `Welcome to Next.js!` 页面就是安装成功了。

## 引入 rsuite

React Suite 的样式依赖 less, 首先需要安装 less

```bash
$ yarn add @zeit/next-less less
```

添加一个 next.config.js 文件，配置如下：

```js
const withLess = require('@zeit/next-less');
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  }
});
```

安装 rsuite

```
$ yarn add rsuite
```

然后编辑`./pages/index.js` 文件，修改为:

```js
import React from 'react';
import Head from 'next/head';
import { Button } from 'rsuite';
import 'rsuite/lib/styles/index.less';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <div className="hero">
      <h1 className="title">Welcome to React Suite</h1>
      <p className="description">
        A suite of React components, intimate UI design, and a friendly
        development experience.
        <br />
      </p>
      <Button appearance="primary" href="https://rsuitejs.com/">
        Getting started
      </Button>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
        padding: 50px;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
    `}</style>
  </div>
);

export default Home;
```

然后重新执行

```bash
$ yarn dev
```

在浏览器中访问 `http://localhost:3000/`，就可以看到应用 React Suite 的页面了，接下来就开始您的开发之旅。

## 导航组件与 Link 组合

在 rsuite 组件中有一些导航组件，比如 `Dropdown`、`Nav`、`Breadcrumb`，在与 `Next.js` 的 `Link`组件组合使用的时候，需要用到 `renderItem` 方法。

```jsx
import Link from 'next/link';
import { Nav } from 'rsuite';

function Navigation() {
  return (
    <Nav>
      <Nav.Item
        renderItem={item => {
          return <Link href="/">{item}</Link>;
        }}
      >
        Home
      </Nav.Item>

      <Nav.Item
        renderItem={item => {
          return <Link href="/about">{item}</Link>;
        }}
      >
        About
      </Nav.Item>
    </Nav>
  );
}
```

## 示例

- [next-app](https://github.com/rsuite/rsuite/tree/master/examples/with-nextjs)
- [rsuite-management-system-ssr](https://github.com/rsuite/rsuite-management-system-ssr)
