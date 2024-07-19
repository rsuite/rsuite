# 本地化语言 🌏

React Suite 组件中的语言默认为英语。 如果需要设置其他语言，可以使用 [`<CustomProvider>`](/zh/components/custom-provider/)进行配置。

## 使用

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

## 目前支持的语言环境

| 语言名称 | 描述              |
| -------- | ----------------- |
| ar_EG    | 阿拉伯语（埃及）  |
| ca_ES    | 加泰罗尼亚语      |
| cs_CZ    | 捷克语            |
| da_DK    | 丹麦语            |
| de_DE    | 德语              |
| en_GB    | 英语              |
| en_US    | 美式英语          |
| es_AR    | 西班牙语 (阿根廷) |
| es_ES    | 西班牙语 (西班牙) |
| fa_IR    | 波斯语 (伊朗)     |
| fi_FI    | 芬兰语            |
| fr_FR    | 法语              |
| hu_HU    | 匈牙利语          |
| it_IT    | 意大利语          |
| ja_JP    | 日语              |
| kk_KZ    | 哈萨克语          |
| ko_KR    | 韩语/朝鲜语       |
| ne_NP    | 尼泊尔语          |
| nl_NL    | 荷兰语            |
| pt_BR    | 葡萄牙语(巴西)    |
| ru_RU    | 俄罗斯语          |
| sv_SE    | 瑞典语            |
| tr_TR    | 土耳其语          |
| zh_CN    | 简体中文          |
| zh_TW    | 繁体中文          |

> [如何向 rsuite 添加新语言？](https://github.com/rsuite/rsuite/discussions/2927)

## 自定义本地语言包

React Suite 能够非常方便的定义语言环境。 您可以自己创建一个 locale 配置。

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

## 组件本地化

如果您只想调整当组件本地化的文本，可以直接通过组件的 `locale` 属性进行自定义。 以下以 Table 组件为例：

```jsx
const locale = {
  emptyMessage: '数据为空',
  loading: '数据加载中, 请稍候'
};

return <Table locale={locale} />;
```

<!--{include:(guide/i18n/fragments/locales.md)}-->

## 与 react-intl 同时使用

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

更多配置参考: [react-intl](https://github.com/yahoo/react-intl)
