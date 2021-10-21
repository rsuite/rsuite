# Use in Next.js

Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.

## Install and Initialization

```bash
$ npx create-next-app
```

If you use npm 5.1 or earlier, you cannot use npx. Execute the following command instead:

```
$ npm install -g create-next-app
$ create-next-app
```

Then execute

```bash
$ yarn dev
```

Open the browser at `http://localhost:3000/`. It renders a header saying "Welcome to Next.js!" on the page.

## Applying RSuite Styles
Next.js has droped the support for [`@zeit/next-less`](https://www.npmjs.com/package/@zeit/next-less) in versions 10 and 11 and only supports [SASS](https://sass-lang.com/) (`*.scss` file extention), however, RSuite styles are written in [Less](https://lesscss.org/). There are two approaches you can take for applying `rsuite` styles in your Next.js project, chose only one.

### Approach 1: importing compiled RSuite CSS
This is the simplest way of applying rsuite styles to your project. Simply go to the `_app.js` or `_app.tsx` in your project directory (if you want the styles applied globally) and import them:

```tsx
import "rsuite/dist/rsuite.min.css"; // The compiled less styles for rsuite
import "../styles/globals.scss"; // Your global styles in the Next.js app
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;

```


> **_NOTE:_**  The order of the `import`s matters! In case there are conflicting styles, the second `import` is applied.

If you wish to apply the styles only in parts of the app in which you use RSuite, you can do so as well.

This approach is best for those who want to keep the [built-in Next CSS and SASS support](https://nextjs.org/docs/basic-features/built-in-css-support) and not configure Webpack.


### Approach 2: Setting up less-loader through next.config.js

The second way of doing things is to compile less style files through the less-loader of webpack using [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction). Keep in mind that this approach will disable the [built-in Next CSS and SASS support](https://nextjs.org/docs/basic-features/built-in-css-support).

Installing devDependencies:

```
$ yarn add webpack less less-loader css-loader mini-css-extract-plugin --dev
```

Paste the following configuration into `next.config.js`:

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
Now your project supports `less` files instead of `scss`.

## Use rsuite
After taking one of the approaches above you can install RSuite:

```
$ yarn add rsuite
```

Then edit the `./pages/index.js` file and change it to:

```js
import React from 'react';
import Head from 'next/head';
import { Button } from 'rsuite';
import 'rsuite/styles/index.less'; // If you took the first approach (applying compiled less) there is no need to do this.

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

Then re-execute

```bash
$ yarn dev
```

Open the browser and visit `http://localhost:3000/`, you can see the application of React Suite page, and then start your development journey.

## Navigation component and Link combination

There are some navigation components in the rsuite component, such as `Dropdown`, `Nav`, `Breadcrumb`, which are used in conjunction with the `Link` component of `Next.js` to use the `renderItem` method.

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

## Examples

- [Use in Next.js](https://github.com/rsuite/rsuite/tree/next/examples/with-nextjs)
- [Use in Next.js and Typescript](https://github.com/rsuite/rsuite/tree/next/examples/with-nextjs-typescript)
