# Internationalization

The language in the React Suite component defaults to English. If you need to set another language, you can configure it with `<IntlProvider>`.

## Usage

```jsx
import { IntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

ReactDOM.render(
  <IntlProvider locale={zhCN}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
```

## Supported languages

| Language name | Description         |
| ------------- | ------------------- |
| ar_EG         | Arabic              |
| da_DK         | Danish              |
| en_GB         | English             |
| en_US         | American English    |
| fi_FI         | Finnish             |
| ko_KR         | Korean              |
| pt_BR         | Portuguese (Brazil) |
| ru_RU         | Russian             |
| sv_SE         | Swedish             |
| zh_CN         | Simplified Chinese  |
| zh_TW         | traditional Chinese |

## Expand or modify language

You can refer to the configuration in the [default language](https://github.com/rsuite/rsuite/blob/master/src/IntlProvider/locales/default.ts) file to make a new language pack passed to the `<IntlProvider>` component via the locale property.

## Used with react-intl

```jsx
import { IntlProvider } from 'react-intl';
import { IntlProvider as RSIntlProvider } from 'rsuite';
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

More Configuration references: [react-intl](https://github.com/yahoo/react-intl)
