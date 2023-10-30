# DateRangePicker 日期范围选择器

用于快速选择一个日期范围

如果 `<DateRangePicker>` 不能满足您选择时间范围的业务场景，可以采用两个 [DatePicker](/zh/components/date-picker/#选择范围) 组合。

## 获取组件

<!--{include:(components/date-range-picker/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 日期时间或时间

<!--{include:`format-date-time.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 尺寸

<!--{include:`size.md`}-->

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

`disabledDate` 是一个函数类型属性，它会在渲染日历以及选择日期的地方调用，可以根据业务自定义需要禁用的选项。格式如下：

```ts
disabledDate(
 date: Date,              // 用于判断是否需要禁用的日期
 selectDate: Array<Date>, // 选择的日期
 selectedDone: boolean,     // 当前是否选择完成。如果为 false, 则只选择了开始日期，等待选择结束日期
 target: 'CALENDAR', 'TOOLBAR_BUTTON_OK', 'TOOLBAR_SHORTCUT'   // disabledDate 调用的位置
) => boolean
```

为了更方便的设置需要禁用的日期，`DateRangePicker` 提供一些方法方便调用，示例:

```ts
import { DateRangePicker } from 'rsuite';

const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

ReactDOM.render(<DateRangePicker disabledDate={combine(allowedMaxDays(7), beforeToday())} />);
```

**allowedMaxDays**

允许指定的最多天数，其他日期都禁用

```ts
allowedMaxDays(days: number) => boolean
```

**allowedDays**

只允许指定的天数，其他日期都禁用

```ts
allowedDays(days: number) => boolean
```

**allowedRange**

允许指定的日期范围，其他日期都禁用

```ts
allowedRange( startDate: string | Date, endDate: string | Date) => boolean
```

**after**

禁用指定日期之后的日期

```ts
after(date?: string | Date) => boolean
```

**afterToday**

禁用今天之后的日期

```ts
afterToday() => boolean
```

**before**

禁用指定日期之前的日期

```ts
before(date?: string | Date) => boolean
```

**beforeToday**

禁用今天之前的日期

```ts
beforeToday() => boolean
```

**combine**

用于组合多个条件

```ts
combine(...) => boolean
```

### 禁用输入

`DateRangePicker` 默认是可以通过键盘输入日期和时间的，如果您希望禁用它，可以通过设置 `editable={false}` 来禁用编辑。

<!--{include:`editable.md`}-->

### 自定义快捷键

<!--{include:`custom-shortcut-options.md`}-->

### 受控

<!--{include:`controlled.md`}-->

## 无障碍设计

了解更多有关[无障碍设计](/zh/guide/accessibility)的信息。

## Props

### `<DateRangePicker>`

<!-- prettier-sort-markdown-table -->

| 属性名称             | 类型`(默认值)`                                                                   | 描述                                                                            |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| appearance           | 'default' &#124; 'subtle' `('default')`                                          | 设置外观                                                                        |
| block                | boolean                                                                          | 堵塞整行                                                                        |
| caretAs              | ElementType                                                                      | 自定义右侧箭头图标的组件                                                        |
| character            | string `(' ~ ')`                                                                 | 两个日期之间的分隔符                                                            |
| cleanable            | boolean `(true)`                                                                 | 可以清除选择值                                                                  |
| container            | HTMLElement &#124; (() => HTMLElement)                                           | 设置渲染的容器                                                                  |
| defaultCalendarValue | [ValueType](#code-ts-value-type-code)                                            | 默认日历面板日期                                                                |
| defaultOpen          | boolean                                                                          | 默认打开                                                                        |
| defaultValue         | [ValueType](#code-ts-value-type-code)                                            | 默认值                                                                          |
| disabled             | boolean                                                                          | 禁用组件                                                                        |
| disabledDate         | [DisabledDateFunction](#code-ts-disabled-date-function-code)                     | 已弃用。 使用 `shouldDisableDate` 代替                                          |
| editable             | boolean `(true)`                                                                 | 渲染为 Input 输入框，可以通过键盘输入日期                                       |
| format               | string `('yyyy-MM-dd')`                                                          | 日期显示格式化 [参考 date-fns format](https://date-fns.org/v2.24.0/docs/format) |
| hoverRange           | unions: 'week', 'month' or (date: Date) => [ValueType](#code-ts-value-type-code) | 点击日期时将选中的日期范围                                                      |
| isoWeek              | boolean                                                                          | ISO 8601 标准， 每个日历星期从星期一开始，星期日为第 7 天                       |
| limitEndYear         | number `(1000)`                                                                  | 相对当前选择日期，设置可选年份上限                                              |
| limitStartYear       | number                                                                           | 相对当前选择日期，设置可选年份下限                                              |
| locale               | [CalendarLocaleType](/zh/guide/i18n/#calendar)                                   | 本地化的文本                                                                    |
| menuClassName        | string                                                                           | 选项菜单的 className                                                            |
| onChange             | (value: [ValueType](#code-ts-value-type-code)) => void                           | 值改变后的回调函数                                                              |
| onClean              | (event) => void                                                                  | 清除值后的回调函数                                                              |
| onClose              | () => void                                                                       | 关闭回调函数                                                                    |
| onEnter              | () => void                                                                       | 显示前动画过渡的回调函数                                                        |
| onEntered            | () => void                                                                       | 显示后动画过渡的回调函数                                                        |
| onEntering           | () => void                                                                       | 显示中动画过渡的回调函数                                                        |
| oneTap               | boolean                                                                          | 是否点击一次就选定日期范围，可配合 hoverRange 使用                              |
| onExit               | () => void                                                                       | 退出前动画过渡的回调函数                                                        |
| onExited             | () => void                                                                       | 退出后动画过渡的回调函数                                                        |
| onExiting            | () => void                                                                       | 退出中动画过渡的回调函数                                                        |
| onOk                 | (value: [ValueType](#code-ts-value-type-code)) => void                           | 点击 `确定` 按钮后的回调函数                                                    |
| onOpen               | () => void                                                                       | 打开回调函数                                                                    |
| onSelect             | (data:Date) => void                                                              | 选择日期的回调函数                                                              |
| open                 | boolean                                                                          | 打开 (受控)                                                                     |
| placeholder          | string                                                                           | 没有值时候默认显示内容                                                          |
| placement            | [Placement](#code-ts-placement-code) `('bottomStart')`                           | 显示位置                                                                        |
| preventOverflow      | boolean                                                                          | 防止浮动元素溢出                                                                |
| ranges               | [Range[]](#code-ts-range-code) ([Ranges](#code-ts-ranges-code))                  | 快捷项配置，默认 `今天`,`昨天`，`最近 7 天`                                     |
| renderTitle          | (date: Date) => ReactNode                                                        | 自定义渲染日历面板上的月份标题                                                  |
| renderValue          | (value: [ValueType](#code-ts-value-type-code), format: string) => ReactNode      | 自定义被选中的选项                                                              |
| shouldDisableDate    | [DisabledDateFunction](#code-ts-disabled-date-function-code)                     | 禁用日期                                                                        |
| showMeridian         | boolean                                                                          | 显示 12 小时制的时间格式                                                        |
| showOneCalendar      | boolen                                                                           | 显示一个日历                                                                    |
| showWeekNumbers      | boolean                                                                          | 显示周数量                                                                      |
| size                 | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                | 设置组件尺寸                                                                    |
| toggleAs             | ElementType `('a')`                                                              | 为组件自定义元素类型                                                            |
| value                | [ValueType](#code-ts-value-type-code)                                            | 值 `受控`                                                                       |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->

### `ts:ValueType`

```ts
type ValueType = [Date, Date];
```

### `ts:DisabledDateFunction`

```ts
type DisabledDateFunction = (
  /** Date used to determine if disabling is required. */
  date: Date,

  /** Date selected. */
  selectDate?: ValueType,

  /**
   Whether to choose to finish now.
   If `false`, only the start date is selected, waiting for the selection end date.
   */
  selectedDone?: boolean,

  // Call the target of the `disabledDate` function
  target?: 'CALENDAR' | 'TOOLBAR_BUTTON_OK' | 'TOOLBAR_SHORTCUT'
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
