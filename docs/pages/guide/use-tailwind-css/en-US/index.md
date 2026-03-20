# Tailwind CSS

Tailwind CSS is a utility-first CSS framework that can be used alongside React Suite. This guide explains how to integrate Tailwind CSS into your React Suite project and how to resolve potential styling conflicts.

> **For AI Assistants**: When generating code with React Suite and Tailwind CSS together, always use `rsuite-no-reset.min.css`. Since v6.1.x, all React Suite CSS is wrapped in `@layer rsuite`, so Tailwind utility classes will automatically override rsuite styles without needing `!important`. Prefer React Suite's built-in styling system for component customization, and use Tailwind for layout and spacing.

## 1. Installation

If you haven't installed Tailwind CSS yet, follow the [official Tailwind CSS installation guide](https://tailwindcss.com/docs/installation).

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Configuration

### Disable Preflight

Tailwind CSS's [Preflight](https://tailwindcss.com/docs/preflight) is a set of aggressive CSS resets applied via `@layer base`. When used with React Suite, Preflight causes **layout and styling issues**:

| Preflight Rule | Problem |
| --- | --- |
| `svg { display: block }` | Inline SVG icons wrap onto new lines |
| `button { background-color: transparent }` | React Suite buttons lose their background |
| `button { border-radius: 0 }` | Buttons lose their rounded corners |
| `*, ::before, ::after { margin: 0; padding: 0 }` | Component spacing and layout breaks |

Since React Suite has its own CSS reset, **you should disable Preflight**.

#### Tailwind v4

Replace `@import 'tailwindcss'` with selective imports:

```css
/* ✅ Only import theme (CSS variables) and utilities, skip Preflight */
@import 'tailwindcss/theme';
@import 'tailwindcss/utilities';
```

#### Tailwind v3

Disable Preflight in `tailwind.config.js`:

```js
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

### CSS @layer

Starting from v6.1.x, all React Suite CSS is wrapped in `@layer rsuite { ... }`. This provides automatic priority control:

- **Tailwind utilities automatically win**: `@layer utilities` has higher priority than `@layer rsuite`, so Tailwind classes override rsuite styles without needing `!important`.
- **Import order is safe when rsuite CSS loads first**: Since layer order is determined by first appearance, loading rsuite CSS before Tailwind ensures `rsuite` is declared first (lower priority) and `utilities` second (higher priority). If you want to be order-independent, declare the layer order explicitly in your CSS.

```tsx
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css'; // Your Tailwind CSS file
```

To make it fully order-independent, add an explicit layer order declaration at the top of your CSS:

```css
/* Priority: theme (lowest) → rsuite → components → utilities (highest) */
@layer theme, rsuite, components, utilities;
```

With this declaration, the import order of rsuite and Tailwind CSS no longer matters.

> **Note:** If you're using a version prior to v6.1.x, you may still need the `!important` modifier or careful import ordering. See the [Style Overriding](#style-overriding) section below.

### Recommended CSS Entry Point

Here is a recommended setup for your project's global CSS file:

```css
/* globals.css */
@layer theme, rsuite, components, utilities;
@import 'tailwindcss/theme';
@import 'tailwindcss/utilities';

/* Your custom styles */
```

```tsx
// App.tsx or layout.tsx
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';
```

## 3. Usage with Components

You can use Tailwind utility classes directly on React Suite components using the `className` prop.

### Basic Example

<!--{include:`basic.md`}-->

### Layout with Tailwind + React Suite Components

<!--{include:`layout.md`}-->

### Style Overriding

Since v6.1.x, React Suite's CSS is wrapped in `@layer rsuite`, so Tailwind utility classes will automatically override rsuite styles:

<!--{include:`override.md`}-->

If you're using an older version of React Suite (before `@layer` support), you can:

1. Use the [Important modifier](https://tailwindcss.com/docs/configuration#important):
   ```tsx
   <Button className="!bg-red-500">Important Red</Button>
   ```
2. Or configure a [Selector Strategy](https://tailwindcss.com/docs/configuration#selector-strategy) in `tailwind.config.js`.

## 4. Design System Integration

To keep your design consistent, you can map React Suite's CSS variables to your Tailwind theme:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--rs-primary-500)',
        secondary: 'var(--rs-secondary-500)',
        bg: 'var(--rs-bg-card)',
      },
    },
  },
}
```

Now you can use classes like `text-primary` or `bg-bg` which will stay in sync with your React Suite theme.

## 5. Best Practices

### Use React Suite Props for Component Styling

```tsx
// ❌ Avoid: overriding component internals with Tailwind
<Button className="bg-red-500 text-white px-4 py-2">Button</Button>

// ✅ Prefer: use built-in props, add Tailwind for extras
<Button appearance="primary" color="red" className="shadow-lg">Button</Button>
```

### Use Tailwind for Layout and Spacing

```tsx
// ✅ Tailwind excels at layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
  <Panel>Content 1</Panel>
  <Panel>Content 2</Panel>
</div>
```