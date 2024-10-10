# 从右到左 (RTL)

为支持阿拉伯语和希伯来语等语言的习惯，对从右到左（RTL）读取的语言的 UI。

## 使用步骤

### 1.HTML 设置

确保在 html 上设置了 dir 属性：

```html
<html dir="rtl"></html>
```

### 2.配置 CustomProvider

在 CustomProvider 组件上设置 rtl 属性，及所有组件根据 RTL 布局渲染。

```jsx
function RTL(props) {
  return <CustomProvider rtl>{props.children}</CustomProvider>;
}
```

### 3.引入 RTL 样式文件

- 使用已编译的 RTL 版本的 CSS 文件

```less
@import '~rsuite/dist/rsuite-rtl.min.css';
```

- 如果使用 Less 版本，则通过 [rtlcss](https://rtlcss.com/) 处理最终成 CSS

```less
@import '~rsuite/styles/index.less';
```
