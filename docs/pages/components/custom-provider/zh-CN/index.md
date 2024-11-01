# CustomProvider 个性化配置

支持本地化、Right to Left、主题等个性化配置。

## 获取组件

<!--{include:<import-guide>}-->

## 使用

### 国际化与本地化配置

```jsx
import zhCN from 'rsuite/locales/zh_CN';

return (
  <CustomProvider locale={zhCN}>
    <App />
  </CustomProvider>
);
```

### Right to Left

```jsx
return (
  <CustomProvider rtl>
    <App />
  </CustomProvider>
);
```

### 配置主题

```jsx
return (
  <CustomProvider theme="dark">
    <App />
  </CustomProvider>
);
```

### 全局配置组件的默认值

```jsx
const components = {
  Button: {
    defaultProps: { size: 'sm' }
  },
  Input: {
    defaultProps: { size: 'sm' }
  }
  // 更多组件...
};

return (
  <CustomProvider components={components}>
    <App />
  </CustomProvider>
);
```

### Content Security Policy

在 `@rsuite/icons` 中的图标动画使用了内联样式，如果您的项目启用了 [Content Security Policy][csp]，请确保配置了 [nonce][nonce] 值。

```jsx
return (
  <CustomProvider csp={{ nonce: 'xxxxxx' }}>
    <App />
  </CustomProvider>
);
```

## Props

### `<CustomProvider>`

| 属性名称            | 类型`(默认值)`                          | 描述                                                                      |
| ------------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| components          | [Components](#code-ts-components-code)  | 自定义组件默认配置 <br/>![][5.74.0]                                       |
| csp                 | { nonce: string }                       | 配置 [Content Security Policy][csp] 的 [nonce][nonce] 值 <br/>![][5.73.0] |
| disableInlineStyles | boolean                                 | 禁用内联样式 <br/>![][5.73.0]                                             |
| disableRipple       | boolean                                 | 禁用组件的涟漪效果，受影响的组件包括：`Button`、`Nav.Item`、 `Pagination` |
| formatDate          | (date: Date, format?: string) => string | 以给定格式返回格式化的日期字符串，结果可能因地区而异                      |
| locale              | [Locale][locale] [`(en-GB)`][en_gb]     | 语言包配置                                                                |
| parseDate           | (date: string, format: string) => Date  | 使用给定的格式字符串返回从字符串解析的日期                                |
| rtl                 | boolean                                 | 可设置文本和其他元素的默认方向是从左到右                                  |
| theme               | 'light' \| 'dark' \| 'high-contrast'    | 支持的主题                                                                |

<!--{include:(_common/types/react-suite-components.md)}-->

[csp]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP
[nonce]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/nonce
[5.73.0]: https://img.shields.io/badge/>=-v5.73.0-blue
[5.74.0]: https://img.shields.io/badge/>=-v5.74.0-blue
[en_gb]: https://github.com/rsuite/rsuite/blob/main/src/locales/en_GB.ts
[locale]: https://github.com/rsuite/rsuite/blob/main/src/locales/index.ts
