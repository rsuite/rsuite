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
  <CustomProvider themes="dark">
    <App />
  </CustomProvider>
);
```

## Props

### `<CustomProvider>`

| Property   | Type`(Default)`                                    | Description                                                                          |
| ---------- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| formatDate | (date: Date, format?: string) => string            | Return the formatted date string in the given format. The result may vary by locale. |
| locale     | object`(rsuite/locales/default)`               | Configure Language Pack                                                              |
| parseDate  | (dateString: string, formatString: string) => Date | Return the date parsed from string using the given format string.                    |
| rtl        | boolean                                            | Text and other elements go from left to right.                                       |
| theme      | 'light' &#124; 'dark' &#124; 'high-contrast'       | Supported themes                                                                     |
