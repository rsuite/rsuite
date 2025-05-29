# CSS 变量

现在所有现代浏览器都支持 CSS 变量。 在 React Suite 中，我们使用 CSS 变量来定义组件的样式， 你可以通过覆盖 CSS 变量来自定义组件的样式。

## 全局变量

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

## 组件变量

组件的变量值默认继承全局变量，你可以通过覆盖组件变量来自定义组件的样式。

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

## 其他主题下的变量

如果你想在要 `dark` 或 `high-contrast` 主题下覆盖样式，你只需要将变量分别定义在 `.rs-theme-dark` 或 `.rs-theme-high-contrast` 内即可。

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
