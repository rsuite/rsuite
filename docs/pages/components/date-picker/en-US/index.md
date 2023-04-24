# DatePicker

To select or input a date or time

> When you need to select a date range, it is recommended to use [DateRangePicker](/components/date-range-picker).

## Usage

<!--{include:(components/date-picker/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

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

### Date and time

<!--{include:`format.md`}-->

### Show month

<!--{include:`format-month.md`}-->

### Show time

<!--{include:`format-time.md`}-->

### Meridian format

Display hours in 12 format.

<!--{include:`format-time-meridian.md`}-->

### ISO week

International Standard ISO 8601 defines that each calendar week begins on Monday and Sunday is the seventh day, [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date).

The calendar panel can be displayed in ISO standard via the ʻisoWeek` property setting.

<!--{include:`iso-week.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Disable input

`DatePicker` allows date and time input via keyboard by default, if you wish to disable it, you can disable editing by setting `editable={false}`.

<!--{include:`editable.md`}-->

### Set the local language

`DatePicker` supports local language custom configuration, but we recommend using the unified [i18n](/guide/i18n) configuration.

<!--{include:`intl.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Custom short options

<!--{include:`custom.md`}-->

Clicking "The day before" in the example does not close the picker layer because the `closeOverlay:boolean` property is configured. This property is used to set whether to close the picker layer after clicking the shortcut item. The default value is `true`.

### Controlled

<!--{include:`control.md`}-->

### Selection range

<!--{include:`range.md`}-->

### Show week numbers

<!--{include:`show-week-numbers.md`}-->

### Native pickers

If you only need to meet the simple date selection function, you can use the native pickers supported by the browser.

<!--{include:`native-pickers.md`}-->

## Accessibility

Learn more in [Accessibility](/guide/accessibility).

## Props

### `<DatePicker>`

<!-- prettier-sort-markdown-table -->

| Property              | Type`(default)`                                                 | Description                                                                          |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| appearance            | 'default' &#124; 'subtle' `('default')`                         | Set picker appearence                                                                |
| block                 | boolean                                                         | Blocking an entire row                                                               |
| calendarDefaultDate   | Date                                                            | Calendar panel default presentation date and time                                    |
| caretAs               | ElementType                                                     | Custom component for the caret icon                                                  |
| cleanable             | boolean `(true)`                                                | Whether the selected value can be cleared                                            |
| container             | HTMLElement &#124; (() => HTMLElement)                          | Sets the rendering container                                                         |
| defaultOpen           | boolean                                                         | Default value of open property                                                       |
| defaultValue          | Date                                                            | Default value                                                                        |
| disabled              | boolean                                                         | Whether disabled the component                                                       |
| disabledDate          | (date:Date) => boolean                                          | Deprecated. Use `shouldDisableDate` instead                                          |
| disabledHours         | (hour:number, date:Date) => boolean                             | Deprecated. Use `shouldDisableHour` instead                                          |
| disabledMinutes       | (minute:number, date:Date) => boolean                           | Deprecated. Use `shouldDisableMinute` instead                                        |
| disabledSeconds       | (second:number, date:Date) => boolean                           | Deprecated. Use `shouldDisableSecond` instead                                        |
| editable              | boolean `(true)`                                                | Rendered as an input, the date can be entered via the keyboard                       |
| format                | string `('yyyy-MM-dd')`                                         | Format date                                                                          |
| hideHours             | (hour:number, date:Date) => boolean                             | Hidden hours                                                                         |
| hideMinutes           | (minute:number, date:Date) => boolean                           | Hidden minutes                                                                       |
| hideSeconds           | (second:number, date:Date) => boolean                           | Hidden seconds                                                                       |
| isoWeek               | boolean                                                         | ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day |
| limitEndYear          | number `(1000)`                                                 | Set the upper limit of the available year relative to the current selection date     |
| limitStartYear        | number                                                          | Set the lower limit of the available year relative to the current selection date     |
| locale                | [CalendarLocaleType](/guide/i18n/#calendar)                     | Locale text                                                                          |
| onChange              | (date: Date) => void                                            | Callback fired when value changed                                                    |
| onChangeCalendarDate  | (date: Date, event) => void                                     | Callback function that changes the calendar date.                                    |
| onClean               | (event) => void                                                 | Callback fired when value clean                                                      |
| onClose               | () => void                                                      | Callback fired when close component                                                  |
| onEnter               | () => void                                                      | Callback fired before the overlay transitions in                                     |
| onEntered             | () => void                                                      | Callback fired after the overlay finishes transitioning in                           |
| onEntering            | () => void                                                      | Callback fired as the overlay begins to transition in                                |
| oneTap                | boolean                                                         | One click to complete the selection date                                             |
| onExit                | () => void                                                      | Callback fired right before the overlay transitions out                              |
| onExited              | () => void                                                      | Callback fired after the overlay finishes transitioning out                          |
| onExiting             | () => void                                                      | Callback fired as the overlay begins to transition out                               |
| onNextMonth           | (date: Date) => void                                            | Switch to the callback function for the next Month                                   |
| onOk                  | (date: Date, event) => void                                     | Click the OK callback function                                                       |
| onOpen                | () => void                                                      | Callback fired when open component                                                   |
| onPrevMonth           | (date: Date) => void                                            | Switch to the callback function for the previous Month                               |
| onSelect              | (date: Date) => void                                            | Callback fired when date or time is selected                                         |
| onToggleMonthDropdown | (open: boolean) => void                                         | Callback function that switches to the month view                                    |
| onToggleTimeDropdown  | (open: boolean) => void                                         | Callback function that switches to the time view                                     |
| open                  | boolean                                                         | Whether open the component                                                           |
| placeholder           | string                                                          | Placeholder                                                                          |
| placement             | [Placement](#code-ts-placement-code) `('bottomStart')`          | The placement of component                                                           |
| preventOverflow       | boolean                                                         | Prevent floating element overflow                                                    |
| ranges                | [Range[]](#code-ts-range-code) ([Ranges](#code-ts-ranges-code)) | Shortcut config                                                                      |
| shouldDisableDate     | (date:Date) => boolean                                          | Disabled date                                                                        |
| shouldDisableHour     | (hour:number, date:Date) => boolean                             | Disabled hours                                                                       |
| shouldDisableMinute   | (minute:number, date:Date) => boolean                           | Disabled minutes                                                                     |
| shouldDisableSecond   | (second:number, date:Date) => boolean                           | Disabled seconds                                                                     |
| showMeridian          | boolean                                                         | Display hours in 12 format                                                           |
| showWeekNumbers       | boolean                                                         | Whether to show week numbers                                                         |
| size                  | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`               | A picker can have different sizes                                                    |
| toggleAs              | ElementType `('a')`                                             | You can use a custom element for this component                                      |
| value                 | Date                                                            | Value (Controlled)                                                                   |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->

### `ts:Ranges`

```js
import { addDays } from 'date-fns';

const Ranges = [
  {
    label: 'today',
    value: new Date(),
    closeOverlay: true
  },
  {
    label: 'yesterday',
    value: addDays(new Date(), -1),
    closeOverlay: true
  }
];
```
