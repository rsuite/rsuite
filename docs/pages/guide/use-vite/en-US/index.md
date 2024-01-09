# Vite

Vite is a Web development build tool driven by native ESM. The following will introduce how to use rsuite in Vite React project.

> This document is written based on Vite v5.x.x. If you are using other versions, it may be different.

## 1. Install

In Vite React project, install rsuite by running either of the following commands:

<!--{include:<install-guide>}-->

## 2. Import CSS

Edit `src/main.tsx` and add the following code:

```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
+ import 'rsuite/dist/rsuite.min.css';  // or 'rsuite/styles/index.less';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

If you use Less as CSS preprocessor, you can import styles via `rsuite/styles/index.less`.

## 3. Provider Setup

Continue editing `src/main.tsx`, import the `CustomProvider` component and wrap it outside the `<App />` component.

```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
+ import { CustomProvider } from 'rsuite';
import App from './App.tsx';
import 'rsuite/styles/index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
+   <CustomProvider theme="dark">
      <App />
+   </CustomProvider>
  </React.StrictMode>
);
```

## Example projects

- [examples/with-vite](https://github.com/rsuite/rsuite/tree/main/examples/with-vite)
