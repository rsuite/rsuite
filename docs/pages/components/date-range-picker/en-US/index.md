# DateRangePicker

DateRangePicker is used to quickly enter or pick a date and time range.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Customize the date format

<!--{include:`format.md`}-->

### Size

<!--{include:`size.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Block

<!--{include:`block.md`}-->

### Placeholder

<!--{include:`placeholder.md`}-->

### Select Whole Week, Whole Month

<!--{include:`hover-range.md`}-->

### One tap

<!--{include:`one-tap.md`}-->

### Show Week Numbers

<!--{include:`show-week-numbers.md`}-->

### Show One Calendar

<!--{include:`show-only-calendar.md`}-->

### Disabled and Readonly

<!--{include:`disabled.md`}-->

`shouldDisableDate` is a function type property that is called when the calendar is rendered and the date is selected, and the options that need to be disabled can be customized according to the business. The syntax is as follows:

```ts
shouldDisableDate(
 date: Date,              // Date used to determine if disabling is required.
 selectDate: Array<Date>, // Date selected.
 selectedDone: boolean,     // Whether to choose to finish now. If `false`, only the start date is selected, waiting for the selection end date.
 target: 'CALENDAR' | 'TOOLBAR_BUTTON_OK' | 'TOOLBAR_SHORTCUT' | 'INPUT',   // Call the target of the `shouldDisableDate` function
) => boolean
```

To make it easier to set the date you want to disable, `DateRangePicker` provides some methods for easy calling, examples:

```tsx
import { DateRangePicker } from 'rsuite';

const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

<DateRangePicker shouldDisableDate={combine(allowedMaxDays(7), beforeToday())} />;
```

| Method         | Type                                                            | Description                                                          |
| -------------- | --------------------------------------------------------------- | -------------------------------------------------------------------- |
| after          | (date?: string \| Date) => boolean                              | Disable dates after the specified date                               |
| afterToday     | () => boolean                                                   | Disable dates after today                                            |
| allowedDays    | (days: number) => boolean                                       | Only allowed days are specified, other dates are disabled            |
| allowedMaxDays | (days: number) => boolean                                       | Allow the maximum number of days specified, other dates are disabled |
| allowedRange   | (startDate: string \| Date, endDate: string \| Date) => boolean | Allow specified date range, other dates are disabled                 |
| before         | (date?: string \| Date) => boolean                              | Disable dates before the specified date                              |
| beforeToday    | () => boolean                                                   | Disable dates before today                                           |
| combine        | (...args) => boolean                                            | Used to combine multiple conditions                                  |

### Disable input

`DateRangePicker` allows date and time input via keyboard by default, if you wish to disable it, you can disable editing by setting `editable={false}`.

<!--{include:`editable.md`}-->

### Loading state

<!--{include:`loading.md`}-->

### With a label

<!--{include:`with-label.md`}-->

### Predefined Date Ranges

<!--{include:`custom-shortcut-options.md`}-->

### Controlled vs. uncontrolled value

<!--{include:`controlled.md`}-->

### Custom Calendar Icon

<!--{include:`caret.md`}-->

### Custom render value

<!--{include:`render-value.md`}-->

### Hide Header

<!--{include:`hide-header.md`}-->

## Accessibility

### ARIA properties

Has all ARIA properties of the DateRangeInput component by default.

- The `aria-invalid="true"` attribute is added to the `<input>` element when the value is invalid.
- When `label` is set, the `aria-labelledby` attribute is added to the `<input>` element and the `dialog` element and is set to the value of the `id` attribute of `label`.
- Has the `aria-haspopup="dialog"` attribute to indicate that the component has an interactive dialog.

### Keyboard interactions

Has keyboard interaction for the DateRangeInput component by default.

## Props

### `<DateRangePicker>`

| Property             | Type`(default)`                                                 | Description                                                                                                                       |
| -------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| appearance           | 'default' \| 'subtle' `('default')`                             | Set picker appearence                                                                                                             |
| block                | boolean                                                         | Blocking an entire row                                                                                                            |
| calendarSnapping     | boolean                                                         | If the user selects a date on the right calendar first, it will automatically switch to the left calendar <br/>![][5.69.0]        |
| caretAs              | ElementType                                                     | Custom component for the caret icon                                                                                               |
| character            | string `(' ~ ')`                                                | The character that separates two dates                                                                                            |
| cleanable            | boolean `(true)`                                                | Whether the selected value can be cleared                                                                                         |
| container            | HTMLElement \| (() => HTMLElement)                              | Sets the rendering container                                                                                                      |
| defaultCalendarValue | [Date, Date]                                                    | Default calendar panel date                                                                                                       |
| defaultOpen          | boolean                                                         | Default value of open property                                                                                                    |
| defaultValue         | [Date, Date]                                                    | The default value (uncontrolled)                                                                                                  |
| disabled             | boolean                                                         | Whether disabled the component                                                                                                    |
| ~disabledDate~       | (date:Date) => boolean                                          | ⚠️`[Deprecated]` Use `shouldDisableDate` instead                                                                                  |
| editable             | boolean `(true)`                                                | Rendered as an input, the date can be entered via the keyboard                                                                    |
| format               | string `('dd/MM/yyyy')`                                         | Format of the date when rendered in the input                                                                                     |
| hideHours            | (hour:number, date:Date) => boolean                             | Hide specific hour options<br/>![][5.71.0]                                                                                        |
| hideMinutes          | (minute:number, date:Date) => boolean                           | Hide specific minute options<br/>![][5.71.0]                                                                                      |
| hideSeconds          | (second:number, date:Date) => boolean                           | Hide specific second options<br/>![][5.71.0]                                                                                      |
| hoverRange           | unions: 'week', 'month' or (date: Date) => [Date, Date]         | The date range that will be selected when you click on the date                                                                   |
| isoWeek              | boolean                                                         | [ISO 8601 standard][iso-8601], each calendar week begins on Monday and Sunday on the seventh day                                  |
| label                | ReactNode                                                       | A label displayed at the beginning of toggle button                                                                               |
| limitEndYear         | number `(1000)`                                                 | Sets the upper limit of the available year relative to the current selection date                                                 |
| limitStartYear       | number                                                          | Sets the lower limit of the available year relative to the current selection date                                                 |
| loading              | boolean `(false)`                                               | Whether to display a loading state indicator                                                                                      |
| locale               | [DateTimeFormats](/guide/i18n/#date-time-formats)               | Define localization settings to show component text in the user's regional language                                               |
| monthDropdownProps   | [MonthDropdownProps][month-dropdown-props]                      | Props for the month dropdown                                                                                                      |
| onChange             | (value: [Date, Date]) => void                                   | Callback fired when value changed                                                                                                 |
| onClean              | (event) => void                                                 | Callback fired when value clean                                                                                                   |
| onClose              | () => void                                                      | Callback fired when close component                                                                                               |
| onEnter              | () => void                                                      | Callback fired before the overlay transitions in                                                                                  |
| onEntered            | () => void                                                      | Callback fired after the overlay finishes transitioning in                                                                        |
| onEntering           | () => void                                                      | Callback fired as the overlay begins to transition in                                                                             |
| oneTap               | boolean                                                         | Whether to click once on selected date range，Can be used with hoverRange                                                         |
| onExit               | () => void                                                      | Callback fired right before the overlay transitions out                                                                           |
| onExited             | () => void                                                      | Callback fired after the overlay finishes transitioning out                                                                       |
| onExiting            | () => void                                                      | Callback fired as the overlay begins to transition out                                                                            |
| onOk                 | (value: [Date, Date]) => void                                   | Callback fired when clicked OK button                                                                                             |
| onOpen               | () => void                                                      | Callback fired when open component                                                                                                |
| onSelect             | (date:Date) => void                                             | Callback fired when date is selected                                                                                              |
| onShortcutClick      | (shortcut: Range, event) => void                                | Callback fired when shortcut clicked                                                                                              |
| open                 | boolean                                                         | whether open the component                                                                                                        |
| placeholder          | string                                                          | Setting placeholders                                                                                                              |
| placement            | [Placement](#code-ts-placement-code) `('bottomStart')`          | The placement of component                                                                                                        |
| preventOverflow      | boolean                                                         | Prevent floating element overflow                                                                                                 |
| ranges               | [Range[]](#code-ts-range-code) ([Ranges](#code-ts-ranges-code)) | Set predefined date ranges the user can select from. Default: `Today`,`Yesterday`，`Last 7 days`                                  |
| renderCell           | (date: Date) => ReactNode                                       | Custom calendar cell rendering <br/>![][5.77.0]                                                                                   |
| renderTitle          | (date: Date) => ReactNode                                       | Custom render for month's title                                                                                                   |
| renderValue          | (date: [Date, Date], format: string) => string                  | Custom render value                                                                                                               |
| shouldDisableDate    | [DisabledDateFunction](#code-ts-disabled-date-function-code)    | Disabled date                                                                                                                     |
| showHeader           | boolean `(true)`                                                | Whether to display the formatted date range at the header of the calendar<br/>![][5.52.0]                                         |
| showMeridiem         | boolean                                                         | Display hours in 12 format                                                                                                        |
| showOneCalendar      | boolen                                                          | Whether to show only one calendar                                                                                                 |
| showWeekNumbers      | boolean                                                         | Whether to show week numbers                                                                                                      |
| size                 | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                           | A picker can have different sizes                                                                                                 |
| value                | [Date, Date]                                                    | The current value (controlled)                                                                                                    |
| weekStart            | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `(0)`                           | The index of the first day of the week (0 - Sunday). If `isoWeek` is `true`, the value of `weekStart` is ignored <br/>![][5.62.0] |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->
<!--{include:(_common/types/month-dropdown-props.md)}-->

### `ts:ValueType`

```ts
type ValueType = [Date, Date];
```

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
