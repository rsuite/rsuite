# Tailwind CSS

Use React Suite components together with Tailwind utilities for layout and customization. Choose the setup for your Tailwind version below.

## Tailwind CSS v4

This setup works with the published React Suite 6.2.5 styles. It places React Suite in a CSS cascade layer so normal Tailwind utilities can override component styles without `!important`.

### Install and configure PostCSS

For a PostCSS-based application, install:

```bash
npm install -D tailwindcss@4 @tailwindcss/postcss@4 postcss
```

Add the Tailwind plugin to `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};
```

If your framework already configures Tailwind, keep its integration. See the [official installation guides](https://tailwindcss.com/docs/installation) for Vite and other build tools.

### Set the layer order in one CSS entry

Create `globals.css`:

```css
@layer theme, base, rsuite, components, utilities;

@import 'tailwindcss';
@import 'rsuite/dist/rsuite-no-reset.min.css' layer(rsuite);
```

Import this file once from your application entry, such as `src/main.tsx`, Next.js `app/layout.tsx`, or `pages/_app.tsx`:

```tsx
import './globals.css';
```

The first line must appear before any of these layers are introduced. It places Tailwind Preflight in `base`, React Suite above that reset in `rsuite`, and normal utilities above component styles in `utilities`.

Keep the React Suite import inside this CSS entry. A separate JavaScript import of `rsuite/dist/rsuite-no-reset.min.css`, or an additional unlayered component stylesheet, would take precedence over normal layered utilities. The package's CSS files are unlayered; `layer(rsuite)` opts this application into the layer.

Tailwind v4 processes CSS imports itself. Use a plain `.css` entry for this configuration; see [Tailwind's preprocessor compatibility](https://tailwindcss.com/docs/compatibility#sass-less-and-stylus) when your application also uses Sass.

### Use utilities on components

```tsx
import { Button, Panel } from 'rsuite';

function Example() {
  return (
    <Panel bordered className="mx-auto max-w-md p-6">
      <Button appearance="primary" className="rounded-full px-8 shadow-lg">
        Save changes
      </Button>
    </Panel>
  );
}
```

Use component props such as `appearance`, `color`, and `size` for built-in variants. Utilities apply to the element receiving `className`; nested elements may require the component's styling API. Inline styles and declarations with `!important` follow their own cascade precedence.

### Share theme colors

Add this after the imports in `globals.css`:

```css
@theme inline {
  --color-primary: var(--rs-primary-500);
  --color-card: var(--rs-bg-card);
}
```

You can then use `bg-primary`, `text-primary`, and `bg-card`. These utilities read React Suite's CSS variables, including their values under the active theme.

### Use your own reset

If your application already provides its own reset, omit Tailwind Preflight while keeping the named layers:

```css
@layer theme, base, rsuite, components, utilities;

@import 'tailwindcss/theme.css' layer(theme);
@import 'rsuite/dist/rsuite-no-reset.min.css' layer(rsuite);
@import 'tailwindcss/utilities.css' layer(utilities);
```

Put your reset in `@layer base` so it stays below component styles. Check the utilities you use against that reset: some rely on base styles. See [Tailwind Preflight](https://tailwindcss.com/docs/preflight) for the changes it normally provides.

## Tailwind CSS v3

Tailwind v3 uses a JavaScript configuration and different PostCSS directives. Keep this setup for an existing v3 application:

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Configure the source files in `tailwind.config.js`:

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--rs-primary-500)',
        card: 'var(--rs-bg-card)'
      }
    }
  },
  plugins: []
};
```

Use the normal v3 directives in your CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import React Suite's styles and your compiled Tailwind CSS from the application entry:

```tsx
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';
```

In v3, selector specificity still affects overrides. If a utility loses to a component rule, use v3's [important modifier or selector strategy](https://v3.tailwindcss.com/docs/configuration#important), for example `className="!rounded-full"`. If your application supplies its own reset, you can disable v3 Preflight with `corePlugins: { preflight: false }` in `tailwind.config.js`.
