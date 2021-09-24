# CustomProvider

支持本地化、Right to Left、主题等个性化配置。

## 使用

### 国际化与本地化配置

```jsx
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/locales/zh_CN';

return (
  <CustomProvider locale={zhCN}>
    <App />
  </CustomProvider>
);
```

### Right to Left

```jsx
import { CustomProvider } from 'rsuite';

return (
  <CustomProvider rtl>
    <App />
  </CustomProvider>
);
```

### 配置主题

```jsx
import { CustomProvider } from 'rsuite';

return (
  <CustomProvider themes="dark">
    <App />
  </CustomProvider>
);
```

## Props

### `<CustomProvider>`

| 属性名称   | 类型`(默认值)`                                     | 描述                                                 |
| ---------- | -------------------------------------------------- | ---------------------------------------------------- |
| formatDate | (date: Date, format?: string) => string            | 以给定格式返回格式化的日期字符串，结果可能因地区而异 |
| locale     | object`(rsuite/locales/default)`               | 语言包配置                                           |
| parseDate  | (dateString: string, formatString: string) => Date | 使用给定的格式字符串返回从字符串解析的日期           |
| rtl        | boolean                                            | 可设置文本和其他元素的默认方向是从左到右             |
| theme      | 'light' &#124; 'dark' &#124; 'high-contrast'       | 支持的主题                                           |
