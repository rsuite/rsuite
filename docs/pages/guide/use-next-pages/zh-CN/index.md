# Next.js (Pages)

Next.js 是一个用于构建全栈 Web 应用程序的 React 框架。以下将介绍如何在 Next.js Pages Router 中使用 rsuite。

> 此文档是基于 Next.js v14.x.x 编写的，如果您使用的是其他版本，可能会有所不同。

## 1、自动安装(可选)

通过 `create-next-app` 命令创建一个新的 Next.js 项目。如果您已经有一个 Next.js 项目，可以跳过这一步。

```
npx create-next-app@latest
```

安装时，您将看到以下提示：

```
✔ What is your project named? … with-nextjs-app
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … No
✔ Would you like to customize the default import alias (@/*)? … No
```

## 2、安装 rsuite

<!--{include:<install-guide>}-->

## 3、导入样式

编辑 `./src/pages/_app.tsx` 文件, 添加 `import 'rsuite/dist/rsuite-no-reset.min.css';`, 如下:

```diff
import '@/styles/globals.css';
+ import 'rsuite/dist/rsuite-no-reset.min.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

> `rsuite-no-reset.min.css` 是一个不包含 reset 样式的版本，如果您需要使用 reset 样式，可以使用 `rsuite.min.css`。

## 4、设置 Provider

继续编辑 `./src/pages/_app.tsx` 文件, 导入 `CustomProvider` , 并将其包裹在 `Component` 组件外部, 如下:

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

## 5、导航组件与 Link 组合

在 rsuite 组件中有一些导航组件，比如 `Nav`、`Breadcrumb`、`Dropdown`，在与 `Next.js` 的 `Link`组件组合使用的时候，需要将 `Link` 组件作为 `as` 属性传递给导航组件。

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

## 6、支持 Less（可选）

我们推荐您直接使用 CSS，但是如果您需要使用 Less 来自定义 rsuite 样式，您需要为您的 Next.js 项目添加 Less 支持。

Next.js v10 后版本已移除了对 [`@zeit/next-less`](https://www.npmjs.com/package/@zeit/next-less) 的支持，仅支持 [SASS/SCSS](https://sass-lang.com/) 作为 CSS 预处理器。 因此，需要使用 [next-with-less](https://github.com/elado/next-with-less) 来支持 Less。

### 6.1、安装 next-with-less

<!--{include:<install-next-with-less>}-->

### 6.2、配置 next.config.js

```js
// next.config.js

const withLess = require('next-with-less');

module.exports = withLess({
  reactStrictMode: true
});
```

### 6.3、自定义主题

在 `src/styles` 目录下创建 `globals.less` 文件，添加以下内容：

```less
@import 'rsuite/styles/index.less';

@primary-color: #00bcd4;
@enable-css-reset: false;
```

编辑 `./src/pages/_app.tsx` 文件, 将 `import 'rsuite/dist/rsuite-no-reset.min.css';` 替换为 `import '@/styles/globals.less';`，如下：

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

> **_注意:_** ⚠️ 谨慎使用 - Next.js 实现可能在任何版本中更改

## 示例项目

- [examples/with-nextjs-pages](https://github.com/rsuite/rsuite/tree/main/examples/with-nextjs-pages)
- [examples/with-nextjs-pages-and-less](https://github.com/rsuite/rsuite/tree/main/examples/with-nextjs-pages-and-less)
