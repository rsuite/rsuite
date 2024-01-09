# Next.js (Pages)

Next.js is a React framework for building full-stack web applications. Here's how to use rsuite with Next.js Pages Router.

> This document is written based on Next.js v14.x.x. If you are using another version, it may be different.

## 1. Create Next.js App (Optional)

Create a new Next.js project with the `create-next-app` command. If you already have a Next.js project, you can skip this step.

```
npx create-next-app@latest
```

When installing, you will see the following prompt:

```
✔ What is your project named? … with-nextjs-app
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … No
✔ Would you like to customize the default import alias (@/*)? … No
```

## 2、Install rsuite

<!--{include:<install-guide>}-->

## 3、Import styles

Edit the `./src/pages/_app.tsx` file and add `import 'rsuite/dist/rsuite-no-reset.min.css';`, as follows:

```diff
import '@/styles/globals.css';
+ import 'rsuite/dist/rsuite-no-reset.min.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

> `rsuite-no-reset.min.css` is a version without reset styles. If you need to use reset styles, you can use `rsuite.min.css`.

## 4. Provider Setup

Continue editing the `./src/pages/_app.tsx` file, import `CustomProvider`, and wrap it outside the `Component` component, as follows:

```diff
import '@/styles/globals.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import type { AppProps } from 'next/app';
+ import { CustomProvider } from 'rsuite';

export default function App({ Component, pageProps }: AppProps) {
  return (
+    <CustomProvider>
      <Component {...pageProps} />
+    </CustomProvider>
  );
}

```

## 5. Navigation components with Link

In the rsuite component, there are some navigation components, such as `Nav`, `Breadcrumb`, `Dropdown`. When combined with the `Link` component of `Next.js`, you need to pass the `Link` component as the `as` property to the navigation component.

```jsx
import Link from 'next/link';
import { Nav } from 'rsuite';

<Nav.Item as={Link} href="/about">
  About
</Nav.Item>;

<Breadcrumb.Item as={Link} href="/about">
  About
</Breadcrumb.Item>;

<Dropdown.Item as={Link} href="/about">
  About
</Dropdown.Item>;
```

## 6. Support Less (Optional)

We recommend that you use CSS directly, but if you need to use Less to customize the rsuite style, you need to add Less support for your Next.js project.

Next.js v10 and later versions have removed support for [`@zeit/next-less`](https://www.npmjs.com/package/@zeit/next-less), and only support [SASS/SCSS](https://sass-lang.com/) as CSS preprocessor. Therefore, you need to use [next-with-less](https://github.com/elado/next-with-less) to support Less.

### 6.1 Install next-with-less

<!--{include:<install-next-with-less>}-->

### 6.2 Configure next.config.js

```js
// next.config.js

const withLess = require('next-with-less');

module.exports = withLess({
  reactStrictMode: true
});
```

### 6.3 Customize theme

Create a `./src/styles/globals.less` file and add the following content:

```less
@import 'rsuite/styles/index.less';

@primary-color: #00bcd4;
@enable-css-reset: false;
```

### 6.4 Edit \_app.tsx

Edit the `./src/pages/_app.tsx` file, replace `import 'rsuite/dist/rsuite-no-reset.min.css';` with `import '@/styles/globals.less';`, as follows:

```diff
import '@/styles/globals.css';
- import 'rsuite/dist/rsuite-no-reset.min.css';
+ import '@/styles/globals.less';
import type { AppProps } from 'next/app';
import { CustomProvider } from 'rsuite';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomProvider>
      <Component {...pageProps} />
    </CustomProvider>
  );
}
```

> **_Note:_** ⚠️ Use with caution - Next.js implementation can change in any version, and the monkey patching may not work anymore.

## Example projects

- [examples/with-nextjs-pages](https://github.com/rsuite/rsuite/tree/main/examples/with-nextjs-pages)
- [examples/with-nextjs-pages-and-less](https://github.com/rsuite/rsuite/tree/main/examples/with-nextjs-pages-and-less)
