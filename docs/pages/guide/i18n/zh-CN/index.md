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

| 语言环境              | IETF BCP 47 语言标签 | 导入名称 |
| --------------------- | -------------------- | -------- |
| 阿拉伯语（埃及）      | ar-EG                | `arEG`   |
| 加泰罗尼亚语          | ca-ES                | `caES`   |
| 捷克语                | cs-CZ                | `csCZ`   |
| 丹麦语                | da-DK                | `daDK`   |
| 德语                  | de-DE                | `deDE`   |
| 英语                  | en-GB                | `enGB`   |
| 美式英语              | en-US                | `enUS`   |
| 西班牙语 (阿根廷)     | es-AR                | `esAR`   |
| 西班牙语 (西班牙)     | es-ES                | `esES`   |
| 波斯语 (伊朗)         | fa-IR                | `faIR`   |
| 芬兰语                | fi-FI                | `fiFI`   |
| 法语                  | fr-FR                | `frFR`   |
| 匈牙利语              | hu-HU                | `huHU`   |
| 意大利语              | it-IT                | `itIT`   |
| 日语                  | ja-JP                | `jaJP`   |
| 哈萨克语              | kk-KZ                | `kkKZ`   |
| 韩语/朝鲜语           | ko-KR                | `koKR`   |
| 尼泊尔语              | ne-NP                | `neNP`   |
| 荷兰语                | nl-NL                | `nlNL`   |
| 葡萄牙语 (巴西)       | pt-BR                | `ptBR`   |
| 俄罗斯语              | ru-RU                | `ruRU`   |
| 瑞典语                | sv-SE                | `svSE`   |
| 土耳其语              | tr-TR                | `trTR`   |
| 简体中文              | zh-CN                | `zhCN`   |
| 繁体中文 （中国台湾） | zh-TW                | `zhTW`   |

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
