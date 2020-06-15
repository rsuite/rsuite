# Use in Next.js

Production grade React applications that scale. The world's leading companies use Next.js to build server-rendered applications, static websites, and more.

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

## Install rsuite

React Suite style depends on less, first need to install less

```bash
$ yarn add @zeit/next-less less
```

Add a `next.config.js` file with the following configuration:

```js
const withLess = require('@zeit/next-less');
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  }
});
```

install rsuite

```
$ yarn add rsuite
```

Then edit the `./pages/index.js` file and change it to:

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

## Examples

- [next-app](https://github.com/rsuite/rsuite/tree/master/examples/with-nextjs)
- [rsuite-management-system-ssr](https://github.com/rsuite/rsuite-management-system-ssr)
