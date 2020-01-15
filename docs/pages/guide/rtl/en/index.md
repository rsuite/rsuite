# Right-to-left

In order to support the habits of languages ​​such as Arabic and Hebrew, the UI of the language read from right to left (RTL).

## Usage

### 1.HTML

Make sure the `dir` attribute is set on the body:

```html
<body dir="rtl"></body>
```

## 2.IntlProvider

Set the rtl attribute on the IntlProvider component to configure all components to support RTL.

```jsx
ReactDOM.render(
  <IntlProvider rtl>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
```

## 3.postcss-rtl

You need to flip the style with the `postcss-rtl` plugin.

```bash
npm i postcss
npm i postcss-rtl
```

Configure `postcss.config.js`

```js
module.exports = {
  plugins: function() {
    return [require('postcss-rtl')(options)];
  }
};
```

Head to the [plugin README](https://github.com/vkalinichev/postcss-rtl) to learn more about it.
