# 国际化

React Suite 组件中的语言默认为英语。 如果需要设置其他语言，可以使用 `<IntlProvider>`进行配置。

## 使用示例

```jsx
import { IntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/zh_CN';

ReactDOM.render(
  <IntlProvider locale={zhCN}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
```

## 目前支持的语言

| 语言名称 | 描述           |
| -------- | -------------- |
| en_GB    | 英语           |
| en_US    | 美式英语       |
| ko_KR    | 韩语/朝鲜语    |
| pt_BR    | 葡萄牙语(巴西) |
| ru_RU    | 俄罗斯语       |
| zh_CN    | 简体中文       |
| zh_TW    | 繁体中文       |

## 扩展或者修改语言

您可以参考 [默认语言文件](https://github.com/rsuite/rsuite/blob/master/src/IntlProvider/locales/default.js) 中的配置，做一个新的语言包通过 `locale` 属性传递给 `<IntlProvider>` 组件。

## 与 react-intl 同时使用

```jsx
import { IntlProvider } from 'react-intl';
import RSIntlProvider from 'rsuite/lib/IntlProvider';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

ReactDOM.render(
  <IntlProvider locale="zh">
    <RSIntlProvider locale={zhCN}>
      <App />
    </RSIntlProvider>
  </IntlProvider>,
  document.getElementById('root')
);
```

更多配置参考: [react-intl](https://github.com/yahoo/react-intl)
