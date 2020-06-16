# Internationalization

The language in the React Suite component defaults to English. If you need to set another language, you can configure it with `<IntlProvider>`.

## Usage

```jsx
import { IntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

return (
  <IntlProvider locale={zhCN}>
    <App />
  </IntlProvider>
);
```

## Format date

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

## Supported languages

| Language name | Description         |
| ------------- | ------------------- |
| ar_EG         | Arabic              |
| da_DK         | Danish              |
| en_GB         | English             |
| en_US         | American English    |
| es_AR         | Spanish (Argentina) |
| es_ES         | Spanish (Spain)     |
| fi_FI         | Finnish             |
| it_IT         | Italian             |
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

More Configuration references: [react-intl](https://github.com/yahoo/react-intl)

## Props

### `<IntlProvider>`

| Property   | Type`(Default)`                                                       | Description                                    |
| ---------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| formatDate | (date: Date ,format?: string, options?: {locale?: object;}) => string | Format date                                    |
| locale     | object`(rsuite/lib/IntlProvider/locales/en_GB)`                       | Configure Language Pack                        |
| rtl        | boolean                                                               | Text and other elements go from left to right. |
