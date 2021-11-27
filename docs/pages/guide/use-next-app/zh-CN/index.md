# 在 Next.js 中使用

在你的 `_app.js` (或 `_app.tsx`) 中引入 rsuite 的样式。

```jsx
import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
```

> **_注意:_** 引入样式的顺序很重要！当有样式冲突时，后引入的样式会覆盖先引入的样式。

然后编辑`./pages/index.js` 文件，修改为:

```js
import React from 'react';
import Head from 'next/head';
import { Button } from 'rsuite';
import 'rsuite/styles/index.less';

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

## 导航组件与 Link 组合

在 rsuite 组件中有一些导航组件，比如 `Dropdown`、`Nav`、`Breadcrumb`，在与 `Next.js` 的 `Link`组件组合使用的时候，需要用到 `as` 属性

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
      <Nav.Item as={NavLink} href="/">
        Home
      </Nav.Item>

      <Nav.Item as={NavLink} href="/about">
        About
      </Nav.Item>
    </Nav>
  );
};
```

## 使用 Less

Next.js 在版本 10、11 中已移除了对 [`@zeit/next-less`](https://www.npmjs.com/package/@zeit/next-less) 的支持，仅支持 [Sass](https://sass-lang.com/) 作为 CSS 预处理器。
因此，如果你需要使用 Less 来自定义 rsuite 样式，你需要为你的 Next.js 项目添加 Less 支持。

首先，安装所需的 webpack loader 和插件。

```
$ npm i -D less less-loader css-loader mini-css-extract-plugin
```

接着，在 `next.config.js` 中更新 webpack 配置。

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
            sourceMap: true
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

> **_注意:_** 自定义与样式表有关的 webpack 配置会停用 Next.js [内建的 CSS 与 Sass 支持](https://nextjs.org/docs/basic-features/built-in-css-support)。
> 因此，如果你同时需要使用 Less 和 Sass，你必须自己设置 webpack 来支持 Sass。

## 示例

- [Use in Next.js](https://github.com/rsuite/rsuite/tree/next/examples/with-nextjs)
- [Use in Next.js and Typescript](https://github.com/rsuite/rsuite/tree/next/examples/with-nextjs-typescript)
