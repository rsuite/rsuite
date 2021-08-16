# i18n

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

## Customize

React Suite is very easy to customize. In general, you should create a locale setting with your customizations.

```jsx
import enGB from 'date-fns/locale/en-GB';

const Calendar = {
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
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: enGB
};

const locale = {
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
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
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
