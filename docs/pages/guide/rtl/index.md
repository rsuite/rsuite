# Right-to-left

为支持阿拉伯语和希伯来语等语言的习惯，对从右到左（RTL）读取的语言的 UI。

## 使用步骤

### 1.HTML

确保在 body 上设置了 dir 属性：

```html
<body dir="rtl"></body>
```

## 2.IntlProvider

在 IntlProvider 组件上设置 rtl 属性，配置所有组件支持 RTL。

```jsx
ReactDOM.render(
  <IntlProvider rtl>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
```

## 3.postcss-rtl

您需要这个通过 `postcss-rtl`插件来翻转样式。

```
npm i postcss
npm i postcss-rtl
```

配置 `postcss.config.js`

```js
module.exports = {
  plugins: function() {
    return [require('postcss-rtl')(options)];
  }
};
```

关于 `postcss-rtl` 详细的使用说明，请前往[插件 README](https://github.com/vkalinichev/postcss-rtl)
