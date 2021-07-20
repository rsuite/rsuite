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

## 配置 next.config.js

Next.js 在 10，11 版本中不支持 [`@zeit/next-less`](https://www.npmjs.com/package/@zeit/next-less), 我们需要通过 webpack 的 less-loader 来编译 less 样式文件。

安装依赖:

```
$ yarn add webpack less less-loader css-loader mini-css-extract-plugin --dev
```

参考以下配置:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ]
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[contenthash].css'
      })
    );

    return config;
  }
};
```

### 使用 rsuite

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
        A suite of React components, intimate UI design, and a friendly development experience.
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

const NavLink = React.forwardRef((props, ref) => {
  const { as, href, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

return () => {
  return (
    <Nav>
      <Nav.Item componentClass={NavLink} href="/">
        Home
      </Nav.Item>

      <Nav.Item componentClass={NavLink} href="/about">
        About
      </Nav.Item>
    </Nav>
  );
};
```

## 示例

- [Use in Next.js](https://github.com/rsuite/rsuite/tree/next/examples/with-nextjs)
- [Use in Next.js and Typescript](https://github.com/rsuite/rsuite/tree/next/examples/with-nextjs-typescript)
