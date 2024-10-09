# Localization 🌏

The locale in the React Suite component defaults to English. If you need to set another locale, you can configure it with [`<CustomProvider>`](/components/custom-provider/).

## Usage

```jsx
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/locales/zh_CN';

return (
  <CustomProvider locale={zhCN}>
    <App />
  </CustomProvider>
);
```

<!--{include:`example.md`}-->

## Supported locales

| Locale | Description         |
| ------ | ------------------- |
| ar_EG  | Arabic (Egypt)      |
| ca_ES  | Catalan             |
| cs_CZ  | Czech               |
| da_DK  | Danish              |
| de_DE  | German              |
| en_GB  | English             |
| en_US  | American English    |
| es_AR  | Spanish (Argentina) |
| es_ES  | Spanish (Spain)     |
| fa_IR  | Persian (Iran)      |
| fi_FI  | Finnish             |
| fr_FR  | French              |
| hu_HU  | Hungarian           |
| it_IT  | Italian             |
| ja_JP  | Japanese            |
| kk_KZ  | Kazakh              |
| ko_KR  | Korean              |
| ne_NP  | Nepali              |
| nl_NL  | Dutch               |
| pt_BR  | Portuguese (Brazil) |
| ru_RU  | Russian             |
| sv_SE  | Swedish             |
| tr_TR  | Turkish             |
| zh_CN  | Simplified Chinese  |
| zh_TW  | traditional Chinese |

> [How to add new language to rsuite?](https://github.com/rsuite/rsuite/discussions/2927)

## Customize

React Suite is very easy to customize. In general, you should create a locale setting with your customizations.

```jsx
import enGB from 'date-fns/locale/en-GB';

const DateTimeFormats = {
  sunday: 'Su',
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Today',
  yesterday: 'Yesterday',
  now: 'Now',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  shortDateFormat: 'MM/dd/yyyy',
  shortTimeFormat: 'hh:mm aa',
  dateLocale: enUS as any
};

const locale = {
  code: 'en-US',
  common: {
    loading: 'Loading...',
    emptyMessage: 'No data found'
  },
  Plaintext: {
    unfilled: 'Unfilled',
    notSelected: 'Not selected',
    notUploaded: 'Not uploaded'
  },
  Pagination: {
    more: 'More',
    prev: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    limit: '{0} / page',
    total: 'Total Rows: {0}',
    skip: 'Go to{0}'
  },
  Calendar: { ...DateTimeFormats },
  DatePicker: { ...DateTimeFormats },
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Last 7 Days'
  },
  Picker: {
    noResultsText: 'No results found',
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    checkAll: 'All'
  },
  InputPicker: {
    newItem: 'New item',
    createOption: 'Create option "{0}"'
  },
  Uploader: {
    inited: 'Initial',
    progress: 'Uploading',
    error: 'Error',
    complete: 'Finished',
    emptyFile: 'Empty',
    upload: 'Upload'
  },
  CloseButton: {
    closeLabel: 'Close'
  },
  Breadcrumb: {
    expandText: 'Show path'
  },
  Toggle: {
    on: 'Open',
    off: 'Close'
  }
};

return (
  <CustomProvider locale={locale}>
    <App />
  </CustomProvider>
);
```

## Component localization

If you only want to adjust the localized text of the component, you can directly customize it through the `locale` property of the component. Take the Table component as an example:

```jsx
const locale = {
  emptyMessage: 'No data found.',
  loading: 'Loading, please wait.'
};

return <Table locale={locale} />;
```

<!--{include:(guide/i18n/fragments/locales.md)}-->

## Used with react-intl

```jsx
import { IntlProvider } from 'react-intl';
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/locales/zh_CN';

return (
  <IntlProvider locale="zh">
    <CustomProvider locale={zhCN}>
      <App />
    </CustomProvider>
  </IntlProvider>
);
```

More Configuration references: [react-intl](https://github.com/yahoo/react-intl)
