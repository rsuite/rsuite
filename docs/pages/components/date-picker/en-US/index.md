# DatePicker

DatePicker is a highly customizable component that allows users to enter and pick dates and times in different formats.

## Usage

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Customize the date format

<!--{include:`format.md`}-->

### Size

<!--{include:`size.md`}-->

### One tap

<!--{include:`one-tap.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Block

<!--{include:`block.md`}-->

### Placeholder

<!--{include:`placeholder.md`}-->

### ISO week

International Standard ISO 8601 defines that each calendar week begins on Monday and Sunday is the seventh day, [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date).

The calendar panel can be displayed in ISO standard via the `isoWeek` property setting.

<!--{include:`iso-week.md`}-->

### Week start

The calendar panel can be displayed in different week start days via the `weekStart` property setting.

<!--{include:`week-start.md`}-->

### Show week numbers

<!--{include:`show-week-numbers.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Loading state

<!--{include:`loading.md`}-->

### With a label

<!--{include:`with-label.md`}-->

### Disable input

`DatePicker` allows date and time input via keyboard by default, if you wish to disable it, you can disable input by setting `editable={false}`.

<!--{include:`editable.md`}-->

### Set the local language

`DatePicker` supports local language custom configuration, but we recommend using the unified [i18n](/guide/i18n) configuration.

<!--{include:`intl.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Custom short options

Clicking "Prev Day" in the example does not close the picker layer because the `closeOverlay=false` property is configured. This property is used to set whether to close the picker layer after clicking the shortcut item. The default value is `true`.

<!--{include:`custom.md`}-->

### Controlled vs. uncontrolled value

<!--{include:`controlled.md`}-->

### Selection range

<!--{include:`range.md`}-->

### Custom Calendar Icon

<!--{include:`caret.md`}-->

### Custom Calendar Cell

<!--{include:`render-cell.md`}-->

### Custom render value

<!--{include:`render-value.md`}-->

### Native pickers

If you only need to meet the simple date selection function, you can use the native pickers supported by the browser.

<!--{include:`native-pickers.md`}-->

## Accessibility

### ARIA properties

Has all ARIA properties of the DateInput component by default.

- The `aria-invalid="true"` attribute is added to the `<input>` element when the value is invalid.
- When `label` is set, the `aria-labelledby` attribute is added to the `<input>` element and the `dialog` element and is set to the value of the `id` attribute of `label`.
- Has the `aria-haspopup="dialog"` attribute to indicate that the component has an interactive dialog.

### Keyboard interactions

Has keyboard interaction for the DateInput component by default.

- When the focus is on the calendar, use the <kbd>→</kbd> <kbd>←</kbd> <kbd>↓</kbd> <kbd>↑</kbd> keys to switch dates.
- When the focus is on the calendar, use the <kbd>Enter</kbd> key to select a date.
- When the DatePicker component has `editable={false}` set to disable input, use <kbd>↓</kbd> to move focus to the calendar.

## Props

### `<DatePicker>`

| Property              | Type`(default)`                                        | Description                                                                                                                       |
| --------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| appearance            | 'default' \| 'subtle' `('default')`                    | Set picker appearence                                                                                                             |
| block                 | boolean                                                | Blocking an entire row                                                                                                            |
| calendarDefaultDate   | Date                                                   | Calendar panel default presentation date and time                                                                                 |
| caretAs               | ElementType                                            | Custom component for the caret icon                                                                                               |
| cleanable             | boolean `(true)`                                       | Whether the selected value can be cleared                                                                                         |
| container             | HTMLElement \| (() => HTMLElement)                     | Sets the rendering container                                                                                                      |
| defaultOpen           | boolean                                                | Default value of open property                                                                                                    |
| defaultValue          | Date                                                   | The default value (uncontrolled)                                                                                                  |
| disabled              | boolean                                                | Whether disabled the component                                                                                                    |
| editable              | boolean `(true)`                                       | Rendered as an input, the date can be entered via the keyboard                                                                    |
| format                | string `('dd/MM/yyyy')`                                | Format of the date when rendered in the input                                                                                     |
| hideHours             | (hour:number, date:Date) => boolean                    | Hide specific hour options                                                                                                        |
| hideMinutes           | (minute:number, date:Date) => boolean                  | Hide specific minute options                                                                                                      |
| hideSeconds           | (second:number, date:Date) => boolean                  | Hide specific second options                                                                                                      |
| isoWeek               | boolean                                                | [ISO 8601 standard][iso-8601], each calendar week begins on Monday and Sunday on the seventh day                                  |
| label                 | ReactNode                                              | A label displayed at the beginning of toggle button                                                                               |
| limitEndYear          | number `(1000)`                                        | Set the upper limit of the available year relative to the current selection date                                                  |
| limitStartYear        | number                                                 | Set the lower limit of the available year relative to the current selection date                                                  |
| loading               | boolean `(false)`                                      | Whether to display a loading state indicator                                                                                      |
| locale                | [DateTimeFormats](/guide/i18n/#date-time-formats)      | Define localization settings to show component text in the user's regional language                                               |
| monthDropdownProps    | [MonthDropdownProps][month-dropdown-props]             | Props for the month dropdown                                                                                                      |
| onChange              | (date: Date) => void                                   | Callback fired when value changed                                                                                                 |
| onChangeCalendarDate  | (date: Date, event) => void                            | Callback function that changes the calendar date.                                                                                 |
| onClean               | (event) => void                                        | Callback fired when value clean                                                                                                   |
| onClose               | () => void                                             | Callback fired when close component                                                                                               |
| onEnter               | () => void                                             | Callback fired before the overlay transitions in                                                                                  |
| onEntered             | () => void                                             | Callback fired after the overlay finishes transitioning in                                                                        |
| onEntering            | () => void                                             | Callback fired as the overlay begins to transition in                                                                             |
| oneTap                | boolean                                                | One click to complete the selection date                                                                                          |
| onExit                | () => void                                             | Callback fired right before the overlay transitions out                                                                           |
| onExited              | () => void                                             | Callback fired after the overlay finishes transitioning out                                                                       |
| onExiting             | () => void                                             | Callback fired as the overlay begins to transition out                                                                            |
| onNextMonth           | (date: Date) => void                                   | Switch to the callback function for the next Month                                                                                |
| onOk                  | (date: Date, event) => void                            | Click the OK callback function                                                                                                    |
| onOpen                | () => void                                             | Callback fired when open component                                                                                                |
| onPrevMonth           | (date: Date) => void                                   | Switch to the callback function for the previous Month                                                                            |
| onSelect              | (date: Date) => void                                   | Callback fired when date or time is selected                                                                                      |
| onShortcutClick       | (shortcut: Range, event) => void                       | Callback fired when shortcut clicked                                                                                              |
| onToggleMonthDropdown | (open: boolean) => void                                | Callback function that switches to the month view                                                                                 |
| onToggleTimeDropdown  | (open: boolean) => void                                | Callback function that switches to the time view                                                                                  |
| open                  | boolean                                                | Whether open the component                                                                                                        |
| placeholder           | string                                                 | Placeholder                                                                                                                       |
| placement             | [Placement](#code-ts-placement-code) `('bottomStart')` | The placement of component                                                                                                        |
| preventOverflow       | boolean                                                | Prevent floating element overflow                                                                                                 |
| ranges                | [Range[]](#code-ts-range-code)                         | Custom shortcut options                                                                                                           |
| renderCell            | (date: Date) => ReactNode                              | Custom calendar cell rendering <br/>![][5.54.0]                                                                                   |
| renderValue           | (date: Date, format: string) => string                 | Custom render value                                                                                                               |
| shouldDisableDate     | (date:Date) => boolean                                 | Disabled date                                                                                                                     |
| shouldDisableHour     | (hour:number, date:Date) => boolean                    | Disabled hours                                                                                                                    |
| shouldDisableMinute   | (minute:number, date:Date) => boolean                  | Disabled minutes                                                                                                                  |
| shouldDisableSecond   | (second:number, date:Date) => boolean                  | Disabled seconds                                                                                                                  |
| showMeridiem          | boolean                                                | Display hours in 12 format                                                                                                        |
| showWeekNumbers       | boolean                                                | Whether to show week numbers                                                                                                      |
| size                  | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                  | A picker can have different sizes                                                                                                 |
| value                 | Date                                                   | The current value (controlled)                                                                                                    |
| weekStart             | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `(0)`                  | The index of the first day of the week (0 - Sunday). If `isoWeek` is `true`, the value of `weekStart` is ignored <br/>![][5.62.0] |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->
<!--{include:(_common/types/month-dropdown-props.md)}-->

[month-dropdown-props]: #code-ts-month-dropdown-props-code
[ISO-8601]: https://en.wikipedia.org/wiki/ISO_week_date
[5.54.0]: https://img.shields.io/badge/>=-v5.54.0-blue
[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
