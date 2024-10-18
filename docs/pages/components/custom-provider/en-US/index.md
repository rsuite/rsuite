# CustomProvider

Support personalized configurations such as localization, Right to Left, and themes.

## Usage

### Localization

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

### Themes

```jsx
import { CustomProvider } from 'rsuite';

return (
  <CustomProvider theme="dark">
    <App />
  </CustomProvider>
);
```

### Content Security Policy

The icon animations in `@rsuite/icons` use inline styles. If your project enables [Content Security Policy][csp], make sure to configure the [nonce][nonce] value.

```jsx
import { CustomProvider } from 'rsuite';

return (
  <CustomProvider csp={{ nonce: 'xxxxxx' }}>
    <App />
  </CustomProvider>
);
```

## Props

### `<CustomProvider>`

| Property            | Type`(Default)`                         | Description                                                                                             |
| ------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| csp                 | { nonce: string }                       | Configure the [nonce][nonce] value of [Content Security Policy][csp] <br/>![][5.73.0]                   |
| disableInlineStyles | boolean                                 | Disable inline styles <br/>![][5.73.0]                                                                  |
| disableRipple       | boolean                                 | If true, the ripple effect is disabled. Affected components include: `Button`, `Nav.Item`, `Pagination` |
| formatDate          | (date: Date, format?: string) => string | Return the formatted date string in the given format. The result may vary by locale.                    |
| locale              | [Locale][locale] [`(en-GB)`][en_gb]     | Configure Language Pack                                                                                 |
| parseDate           | (date: string, format: string) => Date  | Return the date parsed from string using the given format string.                                       |
| rtl                 | boolean                                 | Text and other elements go from left to right.                                                          |
| theme               | 'light' \| 'dark' \| 'high-contrast'    | Supported themes                                                                                        |

[nonce]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce
[csp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
[5.73.0]: https://img.shields.io/badge/>=-v5.73.0-blue
[en_gb]: https://github.com/rsuite/rsuite/blob/main/src/locales/en_GB.ts
[locale]: https://github.com/rsuite/rsuite/blob/main/src/locales/index.ts
