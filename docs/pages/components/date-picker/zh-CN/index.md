# DatePicker 日期选择器

DatePicker 是一个高度可定制的组件，用户可以输入或选择不同格式的日期和时间。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义日期格式

<!--{include:`format.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 一键选值

<!--{include:`one-tap.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 撑满

<!--{include:`block.md`}-->

### 占位符

<!--{include:`placeholder.md`}-->

### ISO week

国际标准 ISO 8601 定义，每个日历星期从星期一开始，星期日为第 7 天, [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date).

可以通过 `isoWeek` 属性设置以 ISO 标准显示日历面板。

<!--{include:`iso-week.md`}-->

### 一周的第一天

<!--{include:`week-start.md`}-->

### 显示周数

<!--{include:`show-week-numbers.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 加载中状态

<!--{include:`loading.md`}-->

### 具有标签

<!--{include:`with-label.md`}-->

### 禁用输入

`DatePicker` 默认是可以通过键盘输入日期和时间的，如果您希望禁用它，可以通过设置 `editable={false}` 来禁用输入。

<!--{include:`editable.md`}-->

### 设置本地语言

`DatePicker` 支持本地语言自定义配置，但是我们更推荐使用统一[本地化语言](/guide/i18n)配置。

<!--{include:`intl-zh-cn.md`}-->

### 位置

<!--{include:`placement.md`}-->

> 提示：设置为 `auto*`时， 尝试滚动页面，或者改变浏览器大小，会自动显示在合适的位置。

### 自定义快捷项

示例中点击“Prev Day”，不会关闭浮层，是因为配置 `closeOverlay=false` 参数，该参数用于设置点击快捷项以后是否关闭浮层，默认为 `true`。

<!--{include:`custom.md`}-->

### 受控与非受控的值

<!--{include:`controlled.md`}-->

### 选择范围

<!--{include:`range.md`}-->

### 自定义日历图标

<!--{include:`caret.md`}-->

### 自定义渲染单元格

<!--{include:`render-cell.md`}-->

### 自定义渲染值

<!--{include:`render-value.md`}-->

### 原生的选择器

如果您只需要满足简单的日期选择功能，完全可以使用浏览器支持的原生选择器。

<!--{include:`native-pickers.md`}-->

## 可访问性

### ARIA 属性

默认拥有 DateInput 组件的 ARIA 属性。

- 当值无效时，`aria-invalid="true"` 属性被添加到 `<input>` 元素。
- 当设置了 `label`, `aria-labelledby` 属性被添加到 `<input>` 元素和 `dialog` 元素上，并将值设置为 `label` 的 `id` 属性值。
- 拥有 `aria-haspopup="dialog"` 属性，用于指示组件拥有一个可交互的弹出层。

### 键盘交互

默认拥有 DateInput 组件的键盘交互。

- 当焦点在日历面板上时，使用 <kbd>→</kbd> <kbd>←</kbd> <kbd>↓</kbd> <kbd>↑</kbd> 键切切换日期。
- 当焦点在日历面板上时，使用 <kbd>Enter</kbd> 键选中日期。
- 当 DatePicker 组件设置了 `editable={false}` 来禁用输入，使用 <kbd>↓</kbd> 将焦点移到日历面板。

## Props

### `<DatePicker>`

| 属性名称              | 类型`(默认值)`                                         | 描述                                                                                |
| --------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| appearance            | 'default' \| 'subtle' `('default')`                    | 设置外观                                                                            |
| block                 | boolean                                                | 堵塞整行                                                                            |
| calendarDefaultDate   | Date                                                   | 日历面板默认呈现的日期时间                                                          |
| caretAs               | ElementType                                            | 自定义右侧箭头图标的组件                                                            |
| cleanable             | boolean `(true)`                                       | 可以清除                                                                            |
| container             | HTMLElement \| (() => HTMLElement)                     | 设置渲染的容器                                                                      |
| defaultOpen           | boolean                                                | 默认打开                                                                            |
| defaultValue          | Date                                                   | 默认值（非受控）                                                                    |
| disabled              | boolean                                                | 禁用组件                                                                            |
| editable              | boolean `(true)`                                       | 渲染为 Input 输入框，可以通过键盘输入日期                                           |
| format                | string `('dd/MM/yyyy')`                                | 日期显示格式化                                                                      |
| hideHours             | (hour:number, date:Date) => boolean                    | 隐藏指定的小时选项                                                                  |
| hideMinutes           | (minute:number, date:Date) => boolean                  | 隐藏指定的分钟选项                                                                  |
| hideSeconds           | (second:number, date:Date) => boolean                  | 隐藏指定的秒选项                                                                    |
| isoWeek               | boolean                                                | [ISO 8601 标准][iso-8601]， 每个日历星期从星期一开始，星期日为第 7 天               |
| label                 | ReactNode                                              | 在按钮开头显示的标签                                                                |
| limitEndYear          | number `(1000)`                                        | 相对当前选择日期，设置可选年份上限                                                  |
| limitStartYear        | number                                                 | 相对当前选择日期，设置可选年份下限                                                  |
| loading               | boolean `(false)`                                      | 是否显示一个加载中状态指示器                                                        |
| locale                | [DateTimeFormats](/zh/guide/i18n/#date-time-formats)   | 定义本地化设置，使组件文本根据用户地区显示相应语言                                  |
| menuClassName         | string                                                 | 选项菜单的 className                                                                |
| monthDropdownProps    | [MonthDropdownProps][month-dropdown-props]             | 月份下拉框属性                                                                      |
| onChange              | (date: Date) => void                                   | 值改变后的回调函数                                                                  |
| onChangeCalendarDate  | (date: Date, event) => void                            | 日历日期改变后的回调函数                                                            |
| onClean               | (event) => void                                        | 清除值后的回调函数                                                                  |
| onClose               | () => void                                             | 关闭回调函数                                                                        |
| onEnter               | () => void                                             | 显示前动画过渡的回调函数                                                            |
| onEntered             | () => void                                             | 显示后动画过渡的回调函数                                                            |
| onEntering            | () => void                                             | 显示中动画过渡的回调函数                                                            |
| oneTap                | boolean                                                | 一个点击完成选择日期                                                                |
| onExit                | () => void                                             | 退出前动画过渡的回调函数                                                            |
| onExited              | () => void                                             | 退出后动画过渡的回调函数                                                            |
| onExiting             | () => void                                             | 退出中动画过渡的回调函数                                                            |
| onNextMonth           | (date: Date) => void                                   | 切换到下一月的回调函数                                                              |
| onOk                  | (date: Date, event) => void                            | 点击确定后的回调函数                                                                |
| onOpen                | () => void                                             | 打开回调函数                                                                        |
| onPrevMonth           | (date: Date) => void                                   | 切换到上一月的回调函数                                                              |
| onSelect              | (date: Date) => void                                   | 选择日期或者时间的回调函数                                                          |
| onShortcutClick       | (shortcut: Range, event) => void                       | 点击快捷项的回调函数                                                                |
| onToggleMonthDropdown | (open: boolean) => void                                | 切换到月份视图的回调函数                                                            |
| onToggleTimeDropdown  | (open: boolean) => void                                | 切换到时间视图的回调函数                                                            |
| open                  | boolean                                                | 打开 (受控)                                                                         |
| placeholder           | string                                                 | 没有值时候默认显示内容                                                              |
| placement             | [Placement](#code-ts-placement-code) `('bottomStart')` | 显示位置                                                                            |
| preventOverflow       | boolean                                                | 防止浮动元素溢出                                                                    |
| ranges                | [Range[]](#code-ts-range-code)                         | 快捷项配置                                                                          |
| renderCell            | (date: Date) => ReactNode                              | 自定义渲染日历单元格 <br/>![][5.54.0]                                               |
| renderValue           | (date: Date) => ReactNode                              | 自定义渲染值                                                                        |
| shouldDisableDate     | (date:Date) => boolean                                 | 禁用日期                                                                            |
| shouldDisableHour     | (hour:number, date:Date) => boolean                    | 禁用小时                                                                            |
| shouldDisableMinute   | (minute:number, date:Date) => boolean                  | 禁用分钟                                                                            |
| shouldDisableSecond   | (second:number, date:Date) => boolean                  | 禁用秒                                                                              |
| showMeridiem          | boolean                                                | 显示 12 小时制的时间格式                                                            |
| showWeekNumbers       | boolean                                                | 显示周数量                                                                          |
| size                  | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                  | 组件设置尺寸                                                                        |
| value                 | Date                                                   | 值`受控                                                                             |
| weekStart             | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `(0)`                  | 一周的第一天索引 (0 - 星期日)。如果设置了 `isoWeek`，则忽略此属性。<br/>![][5.62.0] |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->
<!--{include:(_common/types/month-dropdown-props.md)}-->

[month-dropdown-props]: #code-ts-month-dropdown-props-code
[ISO-8601]: https://en.wikipedia.org/wiki/ISO_week_date
[5.54.0]: https://img.shields.io/badge/>=-v5.54.0-blue
[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
