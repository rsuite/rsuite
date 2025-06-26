# 主题

React Suite 官方默认提供了以下 3 种主题，您只需要简单的配置就可以使用。

- `light`: 浅色主题 (默认)。
- `dark`: 深色主题。 通常叫它夜间模式 🌘，在弱光环境下调暗色调，缓解视疲劳。
- `high-contrast`: 高对比度主题。 它会使用更少的、相互对比的颜色，以使界面更易使用。这对于有光敏或对比度问题的用户，以及在弱光环境下会有帮助。

<div class="grid-cols-3">
<!-- webpackIgnore: true -->
<img src="/images/themes/light-themes@2x.png" width="100%" alt="light"/>
<!-- webpackIgnore: true -->
<img src="/images/themes/dark-themes@2x.png" width="100%" alt="dark" />
<!-- webpackIgnore: true -->
<img src="/images/themes/high-contrast-themes@2x.png" width="100%" alt="high contrast"/>
</div>

---

## 使用步骤

### 1. 引入样式文件

```
@import '~rsuite/dist/rsuite.css';
```

### 2.配置 CustomProvider

您的应用程序如果已经被包含在[`<CustomProvider>`](/zh/components/custom-provider)容器中，那您只需要再添加一个 `theme` 属性，配置您对应的主题名称即可。

```jsx
function App(props) {
  return <CustomProvider theme="dark">{props.children}</CustomProvider>;
}
```

其实在组件渲染过程中，[`<CustomProvider>`](/zh/components/custom-provider)会在 `<body>` 元素上添加个全局的 `className`，从而让子级元素都作用于对应的主题样式。

如果您希望改变只一部分的组件的主题，只需在任何容器元素上添加 `.rs-theme-dark` 类或者 `.rs-theme-high-contrast` 类，即可在其中应用对应的主题样式。

---
