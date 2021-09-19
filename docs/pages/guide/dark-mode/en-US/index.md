# Dark mode 🌘

React Suite has built-in support for dark mode and is enabled by default.

Simply add `.rs-theme-dark` class on any container element, and its children will turn dark.

If you want to apply dark mode style to your entire page, add the class on `<body>` or root `<html>` element.

## Disabling dark mode

You can change the global LESS variable `@enable-dark-mode` to `false` to disable dark mode.

Disabling dark mode will remove all dark mode related styles from your compiled CSS.

```less
// I don't want dark mode.
@enable-dark-mode: false;
```
