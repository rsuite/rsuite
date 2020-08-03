# Right-to-left

为支持阿拉伯语和希伯来语等语言的习惯，对从右到左（RTL）读取的语言的 UI。

## 使用步骤

### 1.HTML 设置

确保在 body 上设置了 dir 属性：

```html
<html dir="rtl"></html>
```

### 2.配置 IntlProvider

在 IntlProvider 组件上设置 rtl 属性，配置所有组件支持 RTL。

```jsx
function RTL(props) {
  return <IntlProvider rtl>{props.children}</IntlProvider>;
}
```

### 3.引入 RTL 样式文件

- 使用已编译的 RTL 版本的 CSS 文件

```less
@import '~rsuite/dist/styles/rsuite-default-rtl.css'; //or ~rsuite/dist/styles/rsuite-dark-rtl.css
```

- 如果使用 Less 版本，则通过 [rtlcss](https://rtlcss.com/) 处理最终成 CSS

```less
@import '~rsuite/lib/styles/themes/default/index.less'; // or ~rsuite/lib/styles/themes/dark/index.less
```
