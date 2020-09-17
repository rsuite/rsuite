# 国际化

React Suite 组件中的语言默认为英语。 如果需要设置其他语言，可以使用 `<IntlProvider>`进行配置。

## 使用示例

```jsx
import { IntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

return (
  <IntlProvider locale={zhCN}>
    <App />
  </IntlProvider>
);
```

## 日期格式化

```jsx
import { IntlProvider } from 'rsuite';
import ruRU from 'rsuite/lib/IntlProvider/locales/ru_RU';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

function formatDate(data, formatStr) {
  return format(data, formatStr, { locale: ru });
}

return (
  <IntlProvider locale={ruRU} formatDate={formatDate}>
    <App />
  </IntlProvider>
);
```

## 目前支持的语言

| 语言名称 | 描述              |
| -------- | ----------------- |
| ar_EG    | 阿拉伯语          |
| da_DK    | 丹麦语            |
| en_GB    | 英语              |
| en_US    | 美式英语          |
| es_AR    | 西班牙语 (阿根廷) |
| es_ES    | 西班牙语 (西班牙) |
| fi_FI    | 芬兰语            |
| it_IT    | 意大利语          |
| ko_KR    | 韩语/朝鲜语       |
| pt_BR    | 葡萄牙语(巴西)    |
| ru_RU    | 俄罗斯语          |
| sv_SE    | 瑞典语            |
| zh_CN    | 简体中文          |
| zh_TW    | 繁体中文          |

## 扩展或者修改语言

您可以参考 [默认语言文件](https://github.com/rsuite/rsuite/blob/master/src/IntlProvider/locales/default.ts) 中的配置，做一个新的语言包通过 `locale` 属性传递给 `<IntlProvider>` 组件。

## 与 react-intl 同时使用

```jsx
import { IntlProvider } from 'react-intl';
import LocaleProvider from 'rsuite/lib/IntlProvider';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

return (
  <IntlProvider locale="zh">
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </IntlProvider>
);
```

更多配置参考: [react-intl](https://github.com/yahoo/react-intl)

## Props

### `<IntlProvider>`

| 属性名称   | 类型`(默认值)`                                                        | 描述                                     |
| ---------- | --------------------------------------------------------------------- | ---------------------------------------- |
| formatDate | (date: Date ,format?: string, options?: {locale?: object;}) => string | 格式化日期                               |
| locale     | object`(rsuite/lib/IntlProvider/locales/en_GB)`                       | 语言包配置                               |
| rtl        | boolean                                                               | 可设置文本和其他元素的默认方向是从左到右 |
