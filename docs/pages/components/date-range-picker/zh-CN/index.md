# DateRangePicker 日期范围选择器

DateRangePicker 用于快速输入或选择一个日期和时间范围。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义日期格式

<!--{include:`format.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 撑满

<!--{include:`block.md`}-->

### 占位符

<!--{include:`placeholder.md`}-->

### 选择整周、整月

<!--{include:`hover-range.md`}-->

如果使用 `isoWeek` 选择整周，会根据 ISO 8601 标准，每个日历星期从星期一开始，星期日为第 7 天，请参考第二个示例。

### 一键选值

<!--{include:`one-tap.md`}-->

### 显示周数

<!--{include:`show-week-numbers.md`}-->

### 显示一个日历

<!--{include:`show-only-calendar.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

`shouldDisableDate` 是一个函数类型属性，它会在渲染日历以及选择日期的地方调用，可以根据业务自定义需要禁用的选项。格式如下：

```ts
shouldDisableDate(
 date: Date,              // 用于判断是否需要禁用的日期
 selectDate: Array<Date>, // 选择的日期
 selectedDone: boolean,     // 当前是否选择完成。如果为 false, 则只选择了开始日期，等待选择结束日期
 target: 'CALENDAR' | 'TOOLBAR_BUTTON_OK' | 'TOOLBAR_SHORTCUT' | 'INPUT'   // shouldDisableDate 调用的位置
) => boolean
```

为了更方便的设置需要禁用的日期，`DateRangePicker` 提供一些方法方便调用，示例:

```tsx
import { DateRangePicker } from 'rsuite';

const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

<DateRangePicker shouldDisableDate={combine(allowedMaxDays(7), beforeToday())} />)
```

| 方法             | 类型                                                            | 描述                               |
| ---------------- | --------------------------------------------------------------- | ---------------------------------- |
| `after`          | (date?: string \| Date) => boolean                              | 禁用指定日期之后的日期             |
| `afterToday`     | () => boolean                                                   | 禁用今天之后的日期                 |
| `allowedDays`    | (days: number) => boolean                                       | 只允许指定的天数，其他日期都禁用   |
| `allowedMaxDays` | (days: number) => boolean                                       | 允许指定的最多天数，其他日期都禁用 |
| `allowedRange`   | (startDate: string \| Date, endDate: string \| Date) => boolean | 允许指定的日期范围，其他日期都禁用 |
| `before`         | (date?: string \| Date) => boolean                              | 禁用指定日期之前的日期             |
| `beforeToday`    | () => boolean                                                   | 禁用今天之前的日期                 |
| `combine`        | (...args) => boolean                                            | 用于组合多个条件                   |

### 禁用输入

`DateRangePicker` 默认是可以通过键盘输入日期和时间的，如果您希望禁用它，可以通过设置 `editable={false}` 来禁用编辑。

<!--{include:`editable.md`}-->

### 加载中状态

<!--{include:`loading.md`}-->

### 具有标签

<!--{include:`with-label.md`}-->

### 自定义快捷键

<!--{include:`custom-shortcut-options.md`}-->

### 受控与非受控的值

<!--{include:`controlled.md`}-->

### 自定义日历图标

<!--{include:`caret.md`}-->

### 自定义渲染值

<!--{include:`render-value.md`}-->

### 不显示头部

<!--{include:`hide-header.md`}-->

## 可访问性

### ARIA 属性

默认拥有 DateRangeInput 组件的 ARIA 属性。

- 当值无效时，`aria-invalid="true"` 属性被添加到 `<input>` 元素。
- 当设置了 `label`, `aria-labelledby` 属性被添加到 `<input>` 元素和 `dialog` 元素上，并将值设置为 `label` 的 `id` 属性值。
- 拥有 `aria-haspopup="dialog"` 属性，用于指示组件拥有一个可交互的弹出层。

### 键盘交互

默认拥有 DateRangeInput 组件的键盘交互。

## Props

### `<DateRangePicker>`

| 属性名称             | 类型`(默认值)`                                                  | 描述                                                                                          |
| -------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| appearance           | 'default' \| 'subtle' `('default')`                             | 设置外观                                                                                      |
| block                | boolean                                                         | 堵塞整行                                                                                      |
| calendarSnapping     | boolean                                                         | 当设置为 `true` 时，用户如果先选择右侧日历上的日期，则会自动切换到左侧日历上 <br/>![][5.69.0] |
| caretAs              | ElementType                                                     | 自定义右侧箭头图标的组件                                                                      |
| character            | string `(' ~ ')`                                                | 两个日期之间的分隔符                                                                          |
| cleanable            | boolean `(true)`                                                | 可以清除选择值                                                                                |
| container            | HTMLElement \| (() => HTMLElement)                              | 设置渲染的容器                                                                                |
| defaultCalendarValue | [Date, Date]                                                    | 默认日历面板日期                                                                              |
| defaultOpen          | boolean                                                         | 默认打开                                                                                      |
| defaultValue         | [Date, Date]                                                    | 默认值（非受控）                                                                              |
| disabled             | boolean                                                         | 禁用组件                                                                                      |
| editable             | boolean `(true)`                                                | 渲染为 Input 输入框，可以通过键盘输入日期                                                     |
| format               | string `('dd/MM/yyyy')`                                         | 日期显示格式化                                                                                |
| hideHours            | (hour:number, date:Date) => boolean                             | 隐藏指定的小时选项<br/>![][5.71.0]                                                            |
| hideMinutes          | (minute:number, date:Date) => boolean                           | 隐藏指定的分钟选项<br/>![][5.71.0]                                                            |
| hideSeconds          | (second:number, date:Date) => boolean                           | 隐藏指定的秒选项<br/>![][5.71.0]                                                              |
| hoverRange           | unions: 'week', 'month' or (date: Date) => [Date, Date]         | 点击日期时将选中的日期范围                                                                    |
| isoWeek              | boolean                                                         | [ISO 8601 标准][iso-8601]， 每个日历星期从星期一开始，星期日为第 7 天                         |
| label                | ReactNode                                                       | 在按钮开头显示的标签                                                                          |
| limitEndYear         | number `(1000)`                                                 | 相对当前选择日期，设置可选年份上限                                                            |
| limitStartYear       | number                                                          | 相对当前选择日期，设置可选年份下限                                                            |
| loading              | boolean `(false)`                                               | 是否显示一个加载中状态指示器                                                                  |
| locale               | [DateTimeFormats](/zh/guide/i18n/#date-time-formats)            | 定义本地化设置，使组件文本根据用户地区显示相应语言                                            |
| menuClassName        | string                                                          | 选项菜单的 className                                                                          |
| monthDropdownProps   | [MonthDropdownProps][month-dropdown-props]                      | 月份下拉框属性                                                                                |
| onChange             | (value: [Date, Date]) => void                                   | 值改变后的回调函数                                                                            |
| onClean              | (event) => void                                                 | 清除值后的回调函数                                                                            |
| onClose              | () => void                                                      | 关闭回调函数                                                                                  |
| onEnter              | () => void                                                      | 显示前动画过渡的回调函数                                                                      |
| onEntered            | () => void                                                      | 显示后动画过渡的回调函数                                                                      |
| onEntering           | () => void                                                      | 显示中动画过渡的回调函数                                                                      |
| oneTap               | boolean                                                         | 是否点击一次就选定日期范围，可配合 hoverRange 使用                                            |
| onExit               | () => void                                                      | 退出前动画过渡的回调函数                                                                      |
| onExited             | () => void                                                      | 退出后动画过渡的回调函数                                                                      |
| onExiting            | () => void                                                      | 退出中动画过渡的回调函数                                                                      |
| onOk                 | (value: [Date, Date]) => void                                   | 点击 "确定" 按钮后的回调函数                                                                  |
| onOpen               | () => void                                                      | 打开回调函数                                                                                  |
| onSelect             | (data:Date) => void                                             | 选择日期的回调函数                                                                            |
| onShortcutClick      | (shortcut: Range, event) => void                                | 点击快捷项的回调函数                                                                          |
| open                 | boolean                                                         | 打开 (受控)                                                                                   |
| placeholder          | string                                                          | 没有值时候默认显示内容                                                                        |
| placement            | [Placement](#code-ts-placement-code) `('bottomStart')`          | 显示位置                                                                                      |
| preventOverflow      | boolean                                                         | 防止浮动元素溢出                                                                              |
| ranges               | [Range[]](#code-ts-range-code) ([Ranges](#code-ts-ranges-code)) | 快捷项配置，默认 `今天`,`昨天`，`最近 7 天`                                                   |
| renderCell           | (date: Date) => ReactNode                                       | 自定义渲染日历面板上的日期单元格<br/>![][5.77.0]                                              |
| renderTitle          | (date: Date) => ReactNode                                       | 自定义渲染日历面板上的月份标题                                                                |
| renderValue          | (date: [Date, Date], format: string) => string                  | 自定义渲染值                                                                                  |
| shouldDisableDate    | [DisabledDateFunction](#code-ts-disabled-date-function-code)    | 禁用日期                                                                                      |
| showHeader           | boolean `(true)`                                                | 是否在日历面板的头部显示格式化的日期范围<br/>![][5.52.0]                                      |
| showMeridiem         | boolean                                                         | 显示 12 小时制的时间格式                                                                      |
| showOneCalendar      | boolen                                                          | 显示一个日历                                                                                  |
| showWeekNumbers      | boolean                                                         | 显示周数量                                                                                    |
| size                 | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                           | 设置组件尺寸                                                                                  |
| value                | [Date, Date]                                                    | 当前值（受控）                                                                                |
| weekStart            | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `(0)`                           | 一周的第一天索引 (0 - 星期日)。如果设置了 `isoWeek`，则忽略此属性 <br/>![][5.62.0]            |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->
<!--{include:(_common/types/month-dropdown-props.md)}-->

### `ts:DisabledDateFunction`

```ts
type DisabledDateFunction = (
  /**
   * Date used to determine if disabling is required.
   */
  date: Date,

  /**
   * Date selected.
   */
  selectDate?: ValueType,

  /**
   * Whether to choose to finish now.
   * If `false`, only the start date is selected, waiting for the selection end date.
   */
  selectedDone?: boolean,

  /**
   * Call the target of the `shouldDisableDate` function.
   */
  target?: DATERANGE_DISABLED_TARGET
) => boolean;
```

### `ts:Ranges`

```js
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';

const Ranges = [
  {
    label: 'today',
    value: [startOfDay(new Date()), endOfDay(new Date())]
  },
  {
    label: 'yesterday',
    value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))]
  },
  {
    label: 'last7Days',
    value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())]
  }
];
```

[month-dropdown-props]: #code-ts-month-dropdown-props-code
[ISO-8601]: https://en.wikipedia.org/wiki/ISO_week_date
[5.52.0]: https://img.shields.io/badge/>=-v5.52.0-blue
[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
[5.69.0]: https://img.shields.io/badge/>=-v5.69.0-blue
[5.71.0]: https://img.shields.io/badge/>=-v5.71.0-blue
[5.77.0]: https://img.shields.io/badge/>=-v5.77.0-blue
