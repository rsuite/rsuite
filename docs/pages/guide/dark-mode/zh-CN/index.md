# 深色模式 🌘

React Suite 内建深色模式支持，并默认启用。

只需在任何容器元素上添加 `.rs-theme-dark` 类，即可在其中应用深色模式样式。

如果你想要在整个页面应用深色模式样式，将类添加在 `<body>` 元素或根 `<html>` 元素上。

## 停用深色模式

停用深色模式，你需要将全局 LESS 变量 `@enable-dark-mode` 设置为 `false`。

停用深色模式将会从你编译生成的 CSS 中移除所有与深色模式相关的样式。

```less
// 我不想要深色模式
@enable-dark-mode: false;
```
