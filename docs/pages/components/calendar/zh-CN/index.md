# Calendar 日历

以日历的方式展示数据。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 紧凑型

<!--{include:`compact.md`}-->

### 自定义单元格样式

使用 `cellClassName` 函数指定各单元格添加的自定义类名。例如，下面的代码中，我们指定周一、周三、周五添加 `.bg-gray` 类名，从而实现这三列的单元格背景色为灰色。

<!--{include:`custom-cell.md`}-->

### 自定义周

<!--{include:`week-start.md`}-->

- 使用 `weekStart` 指定一周的第一天。如果设置了 `isoWeek`，则忽略此属性。
- 使用 `isoWeek` 开启 [ISO 8601 标准][ISO-8601]， 每个日历星期从星期一开始，星期日为第 7 天。
- 使用 `showWeekNumbers` 显示周数。

### 农历

<!--{include:`lunar.md`}-->

## Props

### `<Calendar>`

| 属性名称           | 类型`(默认值)`                                       | 描述                                                                                |
| ------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| bordered           | boolean                                              | 显示边框                                                                            |
| cellClassName      | (date: Date) => string \| undefined                  | 根据单元格日期自定义 class                                                          |
| compact            | boolean                                              | 紧凑型显示                                                                          |
| defaultValue       | Date                                                 | 默认值（非受控）                                                                    |
| isoWeek            | boolean                                              | [ISO 8601 标准][ISO-8601]， 每个日历星期从星期一开始，星期日为第 7 天               |
| locale             | [DateTimeFormats](/zh/guide/i18n/#date-time-formats) | 本地化配置                                                                          |
| monthDropdownProps | [MonthDropdownProps][month-dropdown-props]           | 月份下拉框属性                                                                      |
| onChange           | (date: Date) => void                                 | 值改变后的回调函数                                                                  |
| onSelect           | (date: Date) => void                                 | 选择日期后的回调函数                                                                |
| renderCell         | (date: Date) => ReactNode                            | 自定义渲染日历单元格                                                                |
| value              | Date                                                 | 当前值 (受控)                                                                       |
| weekStart          | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `(0)`                | 一周的第一天索引 (0 - 星期日)。如果设置了 `isoWeek`，则忽略此属性。<br/>![][5.62.0] |

<!--{include:(_common/types/month-dropdown-props.md)}-->

[month-dropdown-props]: #code-ts-month-dropdown-props-code
[ISO-8601]: https://en.wikipedia.org/wiki/ISO_week_date
[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
