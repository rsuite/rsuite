# RSuite SSR Style Guide

This guide shows how to collect and inject RSuite styles when doing server-side rendering (SSR).

The key idea:

- Use `CustomProvider` with a `styleCollector`.
- Use helpers from `rsuite/ssr` to extract styles.
- Put the extracted styles into the HTML `<head>`.

## 1. Node.js / Express

### Option A: Convenience helper (recommended)

```tsx
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { CustomProvider } from 'rsuite';
import { renderWithStyles } from 'rsuite/ssr';
import App from './App';

const app = express();

app.get('*', (req, res) => {
  // Render app and collect styles in one step
  const { html: appHtml, styles } = renderWithStyles(collector =>
    renderToString(
      <CustomProvider styleCollector={collector}>
        <App />
      </CustomProvider>
    )
  );

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RSuite SSR App</title>
        ${styles}
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000);
```

### Option B: Manual control

```tsx
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { CustomProvider } from 'rsuite';
import { createStyleCollector, extractStyles } from 'rsuite/ssr';
import App from './App';

const app = express();

app.get('*', (req, res) => {
  const collector = createStyleCollector();

  const appHtml = renderToString(
    <CustomProvider styleCollector={collector}>
      <App />
    </CustomProvider>
  );

  const styles = extractStyles(collector);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RSuite SSR App</title>
        ${styles}
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000);
```

## 2. Next.js (Pages Router)

```tsx
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { CustomProvider } from 'rsuite';
import { createStyleCollector, extractStyleHTML } from 'rsuite/ssr';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const collector = createStyleCollector();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => (
          <CustomProvider styleCollector={collector}>
            <App {...props} />
          </CustomProvider>
        )
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-rs-style-manager
            dangerouslySetInnerHTML={extractStyleHTML(collector)}
          />
        </>
      )
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## 3. Remix (basic example)

```tsx
// app/root.tsx
import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react';
import { CustomProvider } from 'rsuite';
import { createStyleCollector, extractStyleHTML } from 'rsuite/ssr';

export default function App() {
  const collector = createStyleCollector();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <style
          data-rs-style-manager
          dangerouslySetInnerHTML={extractStyleHTML(collector)}
        />
      </head>
      <body>
        <CustomProvider styleCollector={collector}>
          <Outlet />
        </CustomProvider>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

## 4. SSR helpers API (from `rsuite/ssr`)

- `renderWithStyles(renderApp, options?)`
  - Renders your app and returns `{ html, styles, css, collector }`.
- `createStyleCollector(nonce?)`
  - Creates a `StyleCollector` instance.
- `extractStyles(collector)`
  - Returns HTML string with a `<style data-rs-style-manager>` tag.
- `extractStyleText(collector)`
  - Returns plain CSS text (no `<style>` tag).
- `extractStyleHTML(collector)`
  - Returns `{ __html: string }` for `dangerouslySetInnerHTML`.
