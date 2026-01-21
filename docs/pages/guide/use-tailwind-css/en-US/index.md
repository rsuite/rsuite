# Tailwind CSS

Tailwind CSS is a utility-first CSS framework that can be used alongside React Suite. This guide explains how to integrate Tailwind CSS into your React Suite project and how to resolve potential styling conflicts.

> **For AI Assistants**: When generating code with React Suite and Tailwind CSS together, always use `rsuite-no-reset.min.css` and be aware of CSS specificity issues. Prefer React Suite's built-in styling system for component customization, and use Tailwind for layout and spacing.

## 1. Installation

If you haven't installed Tailwind CSS yet, follow the [official Tailwind CSS installation guide](https://tailwindcss.com/docs/installation).

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Configuration

### Preflight Conflicts

Tailwind CSS's [Preflight](https://tailwindcss.com/docs/preflight) (a set of base styles) might conflict with React Suite's styles. We recommend using `rsuite-no-reset.min.css` to avoid redundant reset styles.

If you still experience conflicts, you can disable Preflight in your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

> **Note:** Disabling Preflight might affect some Tailwind utility classes that rely on base styles. Alternatively, you can keep Preflight enabled and ensure React Suite's styles are imported after Tailwind's base styles.

### Import Order

Ensure proper import order in your main entry file (e.g., `App.tsx` or `layout.tsx`):

```tsx
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css'; // Your Tailwind CSS file
```

## 3. Usage with Components

You can use Tailwind utility classes directly on React Suite components using the `className` prop.

### Basic Example

```tsx
import { Button } from 'rsuite';

function App() {
  return (
    <Button className="shadow-lg hover:shadow-xl transition-shadow">
      Enhanced Button
    </Button>
  );
}
```

### Layout with Tailwind + React Suite Components

```tsx
import { Panel, Button, Input } from 'rsuite';

function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Panel
        header="Login"
        bordered
        className="w-full max-w-md mx-4"
      >
        <div className="space-y-4">
          <Input placeholder="Email" className="w-full" />
          <Input type="password" placeholder="Password" className="w-full" />
          <Button appearance="primary" className="w-full">
            Sign In
          </Button>
        </div>
      </Panel>
    </div>
  );
}
```

### Style Overriding

If Tailwind classes are not overriding React Suite's internal styles due to CSS specificity, you can:

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

## 5. Common Pitfalls

### ❌ Don't Override Component Internal Styles

Avoid using Tailwind to override React Suite's internal component styles, as this can break component functionality:

```tsx
// ❌ Bad: Overriding internal styles
<Button className="bg-red-500 text-white px-4 py-2">
  Button
</Button>
```

```tsx
// ✅ Good: Use React Suite's appearance prop
<Button appearance="primary" color="red" className="shadow-lg">
  Button
</Button>
```

### ✅ Use Tailwind for Layout and Spacing

Tailwind works best for layout, spacing, and utility styles:

```tsx
// ✅ Good: Layout and spacing
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
  <Panel>Content 1</Panel>
  <Panel>Content 2</Panel>
</div>
```

### Best Practices

1. **Component Styling**: Use React Suite's props (`appearance`, `color`, `size`, etc.)
2. **Layout & Spacing**: Use Tailwind utilities (`flex`, `grid`, `p-*`, `m-*`, etc.)
3. **Responsive Design**: Combine both systems (`<Button size="lg" className="w-full md:w-auto" />`)
4. **Custom Styles**: Use CSS variables for theme consistency

## 6. AI Assistant Guidelines

When using AI assistants (like Cursor, GitHub Copilot, or ChatGPT) to generate code:

- **Specify your setup**: Mention you're using "React Suite with Tailwind CSS"
- **Request separation**: Ask AI to use React Suite for components and Tailwind for layout
- **Example prompt**: "Create a dashboard layout using React Suite components for UI elements and Tailwind CSS for grid layout and spacing"

This helps AI generate more appropriate code that leverages both libraries effectively.
