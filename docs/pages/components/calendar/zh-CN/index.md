# Calendar 日历

以日历的方式展示数据。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义单元格样式

使用 `cellClassName` 函数指定各单元格添加的自定义类名。例如，下面的代码中，我们指定周一、周三、周五添加 `.bg-gray` 类名，从而实现这三列的单元格背景色为灰色。

<!--{include:`custom-cell.md`}-->

### 紧凑型

<!--{include:`compact.md`}-->

## Props

### `<Calendar>`

<!-- prettier-sort-markdown-table -->

| 属性名称      | 类型`(默认值)`                                 | 描述                                                                                                     |
| ------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| bordered      | boolean                                        | 显示边框                                                                                                 |
| cellClassName | (date: Date) => string \| undefined            | 根据单元格日期自定义 class                                                                               |
| compact       | boolean                                        | 紧凑型显示                                                                                               |
| defaultValue  | Date                                           | 默认值                                                                                                   |
| isoWeek       | boolean                                        | [ISO 8601 标准](https://en.wikipedia.org/wiki/ISO_week_date)， 每个日历星期从星期一开始，星期日为第 7 天 |
| locale        | [CalendarLocaleType](/zh/guide/i18n/#calendar) | 本地化的文本                                                                                             |
| onChange      | (date:Date) => void                            | 值改变后的回调函数                                                                                       |
| onSelect      | (date:Date) => void                            | 选择日期后的回调函数                                                                                     |
| renderCell    | (date: Date) => ReactNode                      | 自定义渲染日历单元格                                                                                     |
| value         | Date                                           | 值 (`受控`)                                                                                              |
