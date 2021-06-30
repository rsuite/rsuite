# Installation

The locale in the React Suite component defaults to English. If you need to set another locale, you can configure it with `<CustomProvider>`.

## Usage

### Configure locale

```jsx
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/lib/locales/zh_CN';

return (
  <CustomProvider locale={zhCN}>
    <App />
  </CustomProvider>
);
```

<!--{include:`locales.md`}-->

### Supported locales

| Locale | Description         |
| ------ | ------------------- |
| ar_EG  | Arabic (Egypt)      |
| da_DK  | Danish              |
| de_DE  | German              |
| en_GB  | English             |
| en_US  | American English    |
| es_AR  | Spanish (Argentina) |
| es_ES  | Spanish (Spain)     |
| fi_FI  | Finnish             |
| it_IT  | Italian             |
| ko_KR  | Korean              |
| pt_BR  | Portuguese (Brazil) |
| ru_RU  | Russian             |
| sv_SE  | Swedish             |
| zh_CN  | Simplified Chinese  |
| zh_TW  | traditional Chinese |

### Extended locale

You can refer to the configuration in the [default locale](https://github.com/rsuite/rsuite/blob/master/src/locales/default.ts) file to make a new locale pack passed to the `<CustomProvider>` component via the locale property.

### Used with react-intl

```jsx
import { IntlProvider } from 'react-intl';
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/lib/locales/zh_CN';

return (
  <IntlProvider locale="zh">
    <CustomProvider locale={zhCN}>
      <App />
    </CustomProvider>
  </IntlProvider>
);
```

More Configuration references: [react-intl](https://github.com/yahoo/react-intl)

## Props

### `<CustomProvider>`

| Property   | Type`(Default)`                                                       | Description                                    |
| ---------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| formatDate | (date: Date ,format?: string, options?: {locale?: object;}) => string | Format date                                    |
| locale     | object`(rsuite/lib/locales/default)`                                  | Configure Language Pack                        |
| rtl        | boolean                                                               | Text and other elements go from left to right. |
