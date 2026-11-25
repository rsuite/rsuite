# 从右到左 (RTL)

支持阿拉伯语、希伯来语等从右到左（RTL）阅读的语言。

## 使用

<div class="rs-doc-steps">
<h3 class="rs-doc-step-header">整个页面</h3>
<div class="rs-doc-step-body">

在 `<html>` 元素上设置 `dir="rtl"`，即可让整个页面采用从右到左的方向。RSuite 组件默认使用文档方向。

```html
<html dir="rtl"></html>
```

</div>

<h3 class="rs-doc-step-header">局部区域</h3>
<div class="rs-doc-step-body">

如果只在从左到右的页面中为某个区域启用 RTL，请在包裹该区域的 DOM 元素上设置 `dir="rtl"`，以控制文字方向和 CSS 布局。再在该元素内使用 `<CustomProvider rtl>`，让 RSuite 组件的交互（例如 Tabs 的方向键导航）也采用同一方向。

```jsx
import { CustomProvider } from 'rsuite';

function App({ children }) {
  return (
    <div dir="rtl">
      <CustomProvider rtl>{children}</CustomProvider>
    </div>
  );
}
```

</div>
</div>
