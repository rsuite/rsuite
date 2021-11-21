# Use in Next.js

Import rsuite style in your `_app.js` (or `_app.tsx`).

```jsx
import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
```

> **_NOTE:_** The order of the `import`s matters! In case there are conflicting styles, the second `import` is applied.

If you wish to apply the styles only in parts of the app in which you use rsuite, you can do so as well.

Then edit the `./pages/index.js` file and change it to:

```js
import React from 'react';
import Head from 'next/head';
import { Button } from 'rsuite';

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

## Navigation component and Link combination

There are some navigation components in the rsuite component, such as `Dropdown`, `Nav`, `Breadcrumb`, which are used in conjunction with the `Link` component of `Next.js` to use the `as` prop.

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

## Using Less

Next.js has droped the support for [`@zeit/next-less`](https://www.npmjs.com/package/@zeit/next-less) in versions 10 and 11 and only supports [Sass](https://sass-lang.com/) (`*.scss` file extention) as CSS pre-processor.
So if you want to use Less to customize rsuite styles, you have to
setup Less support for your Next.js project.

First, install needed webpack loaders and plugins.

```
$ npm i -D less less-loader css-loader mini-css-extract-plugin
```

Then update your webpack config in `next.config.js`:

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

> **_NOTE:_** By customizing webpack config for stylesheets, you have disabled [built-in Next CSS and SASS support](https://nextjs.org/docs/basic-features/built-in-css-support) of Next.js.
> Thus if you want to use Less and Sass at the same time,
> you have to setup Sass support in webpack config yourself.

## Examples

- [Use in Next.js](https://github.com/rsuite/rsuite/tree/next/examples/with-nextjs)
- [Use in Next.js and Typescript](https://github.com/rsuite/rsuite/tree/next/examples/with-nextjs-typescript)
