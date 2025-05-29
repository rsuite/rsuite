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

| BCP 47 language tag | Locale                                           | Import name |
| ------------------- | ------------------------------------------------ | ----------- |
| ar-EG               | Arabic (Egypt)                                   | `arEG`      |
| ca-ES               | Catalan                                          | `caES`      |
| cs-CZ               | Czech                                            | `csCZ`      |
| da-DK               | Danish                                           | `daDK`      |
| de-DE               | German                                           | `deDE`      |
| en-GB               | British English                                  | `enGB`      |
| en-US               | American English                                 | `enUS`      |
| es-AR               | Spanish (Argentina)                              | `esAR`      |
| es-ES               | Spanish (Spain)                                  | `esES`      |
| fa-IR               | Persian (Iran)                                   | `faIR`      |
| fi-FI               | Finnish                                          | `fiFI`      |
| fr-FR               | French                                           | `frFR`      |
| hu-HU               | Hungarian                                        | `huHU`      |
| it-IT               | Italian                                          | `itIT`      |
| ja-JP               | Japanese                                         | `jaJP`      |
| kk-KZ               | Kazakh                                           | `kkKZ`      |
| ko-KR               | Korean                                           | `koKR`      |
| ne-NP               | Nepali                                           | `neNP`      |
| nl-NL               | Dutch                                            | `nlNL`      |
| pl-PL               | Polish (Poland)                                  | `plPL`      |
| pt-BR               | Portuguese (Brazil)                              | `ptBR`      |
| ru-RU               | Russian                                          | `ruRU`      |
| sv-SE               | Swedish                                          | `svSE`      |
| th-TH               | Thai                                             | `thTH`      |
| tr-TR               | Turkish                                          | `trTR`      |
| uk-UA               | Ukrainian                                        | `ukUA`      |
| zh-CN               | Simplified Chinese                               | `zhCN`      |
| zh-TW               | Traditional Chinese（Taiwan, Province of China） | `zhTW`      |

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
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: enGB as any
};

const Combobox = {
  noResultsText: 'No results found',
  placeholder: 'Select',
  searchPlaceholder: 'Search',
  checkAll: 'All'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'New item',
  createOption: 'Create option "{0}"'
};

const locale = {
  code: 'en-GB',
  common: {
    loading: 'Loading...',
    emptyMessage: 'No data found',
    remove: 'Remove',
    clear: 'Clear'
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
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Last 7 Days'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Initial',
    progress: 'Uploading',
    error: 'Error',
    complete: 'Finished',
    emptyFile: 'Empty',
    upload: 'Upload',
    removeFile: 'Remove file'
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
