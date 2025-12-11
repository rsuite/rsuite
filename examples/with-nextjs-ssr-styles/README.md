# RSuite with Next.js SSR Styles Example

This example demonstrates how to properly collect and inject RSuite styles during server-side rendering (SSR) with Next.js Pages Router.

## Features

- ✅ SSR style collection using `rsuite/ssr` helpers
- ✅ Proper style injection into HTML `<head>`
- ✅ Box component with dynamic CSS-in-JS styles
- ✅ No flash of unstyled content (FOUC)
- ✅ TypeScript support

## How it works

### 1. Style Collection in `_document.tsx`

The `pages/_document.tsx` file uses RSuite's SSR helpers to collect styles during server-side rendering:

```tsx
import { createStyleCollector, extractStyleHTML } from 'rsuite/ssr';

// Create a style collector
const collector = createStyleCollector();

// Wrap the app with CustomProvider and pass the collector
ctx.renderPage = () =>
  originalRenderPage({
    enhanceApp: (App) => (props) => (
      <CustomProvider styleCollector={collector}>
        <App {...props} />
      </CustomProvider>
    )
  });

// Extract and inject styles into <head>
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
```

### 2. Client-side App in `_app.tsx`

The `pages/_app.tsx` receives the `styleCollector` from `_document.tsx` during SSR and passes it to `CustomProvider`:

```tsx
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

interface CustomAppProps extends AppProps {
  styleCollector?: any;
}

export default function App({ Component, pageProps, styleCollector }: CustomAppProps) {
  return (
    <CustomProvider styleCollector={styleCollector}>
      <Component {...pageProps} />
    </CustomProvider>
  );
}
```

**How it works**:
- During SSR: `_document.tsx` passes `styleCollector` to App, which then passes it to `CustomProvider`
- On client: No `styleCollector` is passed, so `CustomProvider` works normally without creating duplicate styles

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for production

```bash
npm run build
npm start
```

## Verify SSR Styles

To verify that SSR styles are working correctly:

1. **View page source** (right-click → View Page Source)
2. Look for `<style data-rs-style-manager>` in the `<head>` section
3. Verify it contains CSS variables like `--rs-box-w`, `--rs-box-p`, etc.
4. Check that Box components render with correct styles immediately (no flash of unstyled content)

Example of what you should see in the HTML source:

```html
<head>
  <!-- ... other head elements ... -->
  <style data-rs-style-manager>
    .rs-box-abc123 {
      --rs-box-w: 100%;
      --rs-box-p: 20px;
      width: var(--rs-box-w);
      padding: var(--rs-box-p);
    }
    /* ... more styles ... */
  </style>
</head>
```

## Learn More

- [RSuite Documentation](https://rsuitejs.com)
- [RSuite SSR Guide](../../src/ssr/ssr-usage-guide.md)
- [Next.js Documentation](https://nextjs.org/docs)
