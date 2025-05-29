# CSS Variables

All modern browsers support CSS variables. In React Suite, we use CSS variables to define the styles of components, and you can customize the styles of components by overriding CSS variables.

## Global Variables

```less
:root {
  // Colors palette
  // See: https://rsuitejs.com/resources/palette/
  --rs-primary-50: #f2faff;
  --rs-primary-100: #cce9ff;
  --rs-primary-200: #a6d7ff;
  --rs-primary-300: #80c4ff;
  --rs-primary-400: #59afff;
  --rs-primary-500: #3498ff;
  --rs-primary-600: #2589f5;
  --rs-primary-700: #1675e0;
  --rs-primary-800: #0a5dc2;
  --rs-primary-900: #004299;

  // Spectrum
  --rs-color-red: #f44336;
  --rs-color-orange: #fa8900;
  --rs-color-yellow: #ffb300;
  --rs-color-green: #4caf50;
  --rs-color-cyan: #00bcd4;
  --rs-color-blue: #2196f3;
  --rs-color-violet: #673ab7;
}
```

## Component Variables

The variable value of the component inherits the global variable by default, and you can customize the style of the component by overriding the component variable.

```less
// Button
--rs-btn-default-bg: var(--rs-gray-50);
--rs-btn-default-text: var(--rs-gray-800);
--rs-btn-default-hover-bg: var(--rs-gray-200);
--rs-btn-default-active-bg: var(--rs-gray-300);
--rs-btn-default-active-text: var(--rs-gray-900);
--rs-btn-default-disabled-bg: var(--rs-gray-50);
--rs-btn-default-disabled-text: var(--rs-gray-400);
--rs-btn-primary-bg: var(--rs-primary-500);
--rs-btn-primary-text: var(--rs-gray-0);
--rs-btn-primary-hover-bg: var(--rs-primary-600);
--rs-btn-primary-active-bg: var(--rs-primary-700);
--rs-btn-subtle-text: var(--rs-gray-800);
--rs-btn-subtle-hover-bg: var(--rs-gray-200);
--rs-btn-subtle-hover-text: var(--rs-gray-800);
--rs-btn-subtle-active-bg: var(--rs-gray-200);
--rs-btn-subtle-active-text: var(--rs-gray-900);
--rs-btn-subtle-disabled-text: var(--rs-gray-400);
--rs-btn-ghost-border: var(--rs-primary-700);
--rs-btn-ghost-text: var(--rs-primary-700);
--rs-btn-ghost-hover-border: var(--rs-primary-800);
--rs-btn-ghost-hover-text: var(--rs-primary-800);
--rs-btn-ghost-active-border: var(--rs-primary-900);
--rs-btn-ghost-active-text: var(--rs-primary-900);
--rs-btn-link-text: var(--rs-primary-700);
--rs-btn-link-hover-text: var(--rs-primary-800);
--rs-btn-link-active-text: var(--rs-primary-900);

// Other Components
// See: https://github.com/rsuite/rsuite/blob/main/src/styles/color-modes/light.less
```

## Variables in other themes

If you want to override styles under a `dark` or `high-contrast` theme, you only need to define the variables in `.rs-theme-dark` or `.rs-theme-high-contrast` respectively.

```less
.rs-theme-dark {
  // dark mode
  // ...
}

.rs-theme-high-contrast {
  // high contrast mode
  // ...
}
```
