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

| IETF BCP 47 语言标签 | 语言                  | 导入名称 |
| -------------------- | --------------------- | -------- |
| ar-EG                | 阿拉伯语（埃及）      | `arEG`   |
| ca-ES                | 加泰罗尼亚语          | `caES`   |
| cs-CZ                | 捷克语                | `csCZ`   |
| da-DK                | 丹麦语                | `daDK`   |
| de-DE                | 德语                  | `deDE`   |
| en-GB                | 英语                  | `enGB`   |
| en-US                | 美式英语              | `enUS`   |
| es-AR                | 西班牙语 (阿根廷)     | `esAR`   |
| es-ES                | 西班牙语 (西班牙)     | `esES`   |
| fa-IR                | 波斯语 (伊朗)         | `faIR`   |
| fi-FI                | 芬兰语                | `fiFI`   |
| fr-FR                | 法语                  | `frFR`   |
| gu-IN                | 古吉拉特语            | `guIN`   |
| hu-HU                | 匈牙利语              | `huHU`   |
| it-IT                | 意大利语              | `itIT`   |
| ja-JP                | 日语                  | `jaJP`   |
| kk-KZ                | 哈萨克语              | `kkKZ`   |
| ko-KR                | 韩语/朝鲜语           | `koKR`   |
| nb-NO                | 挪威博克马尔语        | `nbNO`   |
| ne-NP                | 尼泊尔语              | `neNP`   |
| nl-NL                | 荷兰语                | `nlNL`   |
| pl-PL                | 波兰语（波兰）        | `plPL`   |
| pt-BR                | 葡萄牙语 (巴西)       | `ptBR`   |
| ru-RU                | 俄罗斯语              | `ruRU`   |
| sv-SE                | 瑞典语                | `svSE`   |
| th-TH                | 泰语                  | `thTH`   |
| tr-TR                | 土耳其语              | `trTR`   |
| uk-UA                | 乌克兰语              | `ukUA`   |
| zh-CN                | 简体中文              | `zhCN`   |
| zh-TW                | 繁体中文 （中国台湾） | `zhTW`   |

> [如何向 rsuite 添加新语言？](https://github.com/rsuite/rsuite/discussions/2927)

## 自定义本地语言包

React Suite 能够非常方便的定义语言环境。 您可以自己创建一个 locale 配置。

```jsx
import { zhCN } from 'date-fns/locale/zh-CN';

const DateTimeFormats = {
  sunday: '日',
  monday: '一',
  tuesday: '二',
  wednesday: '三',
  thursday: '四',
  friday: '五',
  saturday: '六',
  ok: '确定',
  today: '今天',
  yesterday: '昨天',
  now: '此刻',
  hours: '时',
  minutes: '分',
  seconds: '秒',
  formattedMonthPattern: 'yyyy年MM月',
  formattedDayPattern: 'yyyy年MM月dd日',
  shortDateFormat: 'yyyy-MM-dd',
  shortTimeFormat: 'aa hh:mm',
  dateLocale: zhCN as any
};

const Combobox = {
  noResultsText: '无匹配选项',
  placeholder: '选择',
  searchPlaceholder: '搜索',
  checkAll: '全部'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: '新选项',
  createOption: '新建选项 "{0}"'
};

const locale = {
  code: 'zh-CN',
  common: {
    loading: '加载中...',
    emptyMessage: '数据为空',
    remove: '移除',
    clear: '清除'
  },
  Plaintext: {
    unfilled: '未填写',
    notSelected: '未选择',
    notUploaded: '未上传'
  },
  Pagination: {
    more: '更多',
    prev: '上一页',
    next: '下一页',
    first: '第一页',
    last: '最后一页',
    limit: '{0} 条/页',
    total: '共 {0} 条数据',
    skip: '跳至{0}页'
  },
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: '最近 7 天'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: '初始状态',
    progress: '上传中',
    error: '上传出错',
    complete: '上传完成',
    emptyFile: '无文件',
    upload: '上传',
    removeFile: '删除文件'
  },
  CloseButton: {
    closeLabel: '关闭'
  },
  Breadcrumb: {
    expandText: '显示路径'
  },
  Toggle: {
    on: '开启',
    off: '关闭'
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
