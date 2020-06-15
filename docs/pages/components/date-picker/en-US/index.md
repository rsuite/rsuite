# DatePicker

To select or input a date or time

- `<DatePicker>`

> When you need to select a date range, it is recommended to use [`<DateRangePicker>`](./date-range-picker)

## Usage

```js
import { DatePicker } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<DatePicker>`

| Property              | Type`(default)`                              | Description                                                                          |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| appearance            | enum: 'default', 'subtle' `('default')`      | Set picker appearence                                                                |
| block                 | boolean                                      | Blocking an entire row                                                               |
| calendarDefaultDate   | Date                                         | Calendar panel default presentation date and time                                    |
| cleanable             | boolean `(true)`                             | Whether the selected value can be cleared                                            |
| container             | HTMLElement or (() => HTMLElement)           | Sets the rendering container                                                         |
| defaultOpen           | boolean                                      | Default value of open property                                                       |
| defaultValue          | Date                                         | Default value                                                                        |
| disabled              | boolean                                      | Whether disabled the component                                                       |
| disabledDate          | (date:Date) => boolean                       | Disabled date                                                                        |
| disabledHours         | (hour:number, date:Date) => boolean          | Disabled hours                                                                       |
| disabledMinutes       | (minute:number, date:Date) => boolean        | Disabled minutes                                                                     |
| disabledSeconds       | (second:number, date:Date) => boolean        | Disabled seconds                                                                     |
| format                | string `('YYYY-MM-DD')`                      | Format date                                                                          |
| hideHours             | (hour:number, date:Date) => boolean          | Hidden hours                                                                         |
| hideMinutes           | (minute:number, date:Date) => boolean        | Hidden minutes                                                                       |
| hideSeconds           | (second:number, date:Date) => boolean        | Hidden seconds                                                                       |
| inline                | boolean                                      | Display date panel when component initial                                            |
| isoWeek               | boolean                                      | ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day |
| limitEndYear          | number `(1000)`                              | Set the lower limit of the available year relative to the current selection date     |
| locale                | Object [`(Locale)`](#Locale)                 | i18n config                                                                          |
| onChange              | (date: Date) => void                         | Callback fired when value changed                                                    |
| onChangeCalendarDate  | (date: Date, event?: SyntheticEvent) => void | Callback function that changes the calendar date.                                    |
| onClean               | (event:SyntheticEvent) => void               | Callback fired when value clean                                                      |
| onClose               | () => void                                   | Callback fired when close component                                                  |
| onEnter               | () => void                                   | Callback fired before the overlay transitions in                                     |
| onEntered             | () => void                                   | Callback fired after the overlay finishes transitioning in                           |
| onEntering            | () => void                                   | Callback fired as the overlay begins to transition in                                |
| onExit                | () => void                                   | Callback fired right before the overlay transitions out                              |
| onExited              | () => void                                   | Callback fired after the overlay finishes transitioning out                          |
| onExiting             | () => void                                   | Callback fired as the overlay begins to transition out                               |
| onNextMonth           | (date: Date) => void                         | Switch to the callback function for the next Month                                   |
| onOk                  | (date: Date, event: SyntheticEvent) => void  | Click the OK callback function                                                       |
| onOpen                | () => void                                   | Callback fired when open component                                                   |
| onPrevMonth           | (date: Date) => void                         | Switch to the callback function for the previous Month                               |
| onSelect              | (date: Date) => void                         | Callback fired when date or time is selected                                         |
| onToggleMonthDropdown | (open: boolean) => void                      | Callback function that switches to the month view                                    |
| onToggleTimeDropdown  | (open: boolean) => void                      | Callback function that switches to the time view                                     |
| oneTap                | boolean                                      | One click to complete the selection date                                             |
| open                  | boolean                                      | Whether open the component                                                           |
| placeholder           | string                                       | Placeholder                                                                          |
| placement             | enum: [Placement](#types) `('bottomStart')`  | The placement of component                                                           |
| preventOverflow       | boolean                                      | Prevent floating element overflow                                                    |
| ranges                | Array<[Range](#types)> [`(Ranges)`](#Ranges) | Shortcut config                                                                      |
| showMeridian          | boolean                                      | Display hours in 12 format                                                           |
| showWeekNumbers       | boolean                                      | Whether to show week numbers                                                         |
| toggleComponentClass  | React.ElementType `('a')`                    | You can use a custom element for this component                                      |
| value                 | Date                                         | Value (Controlled)                                                                   |

## Default

### Locale

```js
const Locale = {
  sunday: 'Su',
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Today',
  yesterday: 'Yesterday',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds'
};
```

### Ranges

```js
const Ranges = [
  {
    label: 'today',
    value: new Date(),
    closeOverlay: true
  },
  {
    label: 'yesterday',
    value: dateFns.addDays(new Date(), -1),
    closeOverlay: true
  }
];
```
