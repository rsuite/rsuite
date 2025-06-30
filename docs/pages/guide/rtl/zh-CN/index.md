# 从右到左 (RTL)

为支持阿拉伯语和希伯来语等语言的习惯，对从右到左（RTL）读取的语言的 UI。

## 使用步骤

<div class="rs-doc-steps">
<h3 class="rs-doc-step-header">HTML 设置</h3>
<div class="rs-doc-step-body">

确保在 html 上设置了 dir 属性：

```html
<html dir="rtl"></html>
```

</div>

<h3 class="rs-doc-step-header">配置 CustomProvider (可选)</h3>
<div class="rs-doc-step-body">

这一步是可以选的, 默认情况下组件会根据 html 上的 dir 属性来判断是否启用 RTL 布局。如果需要自定义区域启用 RTL 布局，可以在 CustomProvider 组件上设置 `rtl` 属性，启用组件根据 RTL 布局渲染。

```jsx
import { CustomProvider } from 'rsuite';

function App({ children }) {
  return <CustomProvider rtl>{children}</CustomProvider>;
}
```

</div>
</div>
