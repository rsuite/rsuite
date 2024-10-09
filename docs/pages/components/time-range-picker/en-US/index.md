# TimeRangePicker

The TimeRangePicker component is used to select a time range.

## Usage

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Meridiem — 12h/24h format

<!--{include:`meridiem.md`}-->

### Time step

<!--{include:`time-step.md`}-->

### Size

<!--{include:`size.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Block

<!--{include:`block.md`}-->

### Placeholder

<!--{include:`placeholder.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Loading state

<!--{include:`loading.md`}-->

### Controlled vs. uncontrolled value

<!--{include:`controlled.md`}-->

## Accessibility

### ARIA properties

Has all ARIA properties of the DateRangeInput component by default.

- The `aria-invalid="true"` attribute is added to the `<input>` element when the value is invalid.
- When `label` is set, the `aria-labelledby` attribute is added to the `<input>` element and the `dialog` element and is set to the value of the `id` attribute of `label`.
- Has the `aria-haspopup="dialog"` attribute to indicate that the component has an interactive dialog.

## Props

### `<TimeRangePicker>`

| Property        | Type`(default)`                                        | Description                                                                               |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| appearance      | 'default' \| 'subtle' `('default')`                    | Set picker appearence                                                                     |
| block           | boolean                                                | Blocking an entire row                                                                    |
| caretAs         | ElementType                                            | Custom component for the caret icon                                                       |
| character       | string `(' ~ ')`                                       | The character that separates two dates                                                    |
| cleanable       | boolean `(true)`                                       | Whether the selected value can be cleared                                                 |
| container       | HTMLElement \| (() => HTMLElement)                     | Sets the rendering container                                                              |
| defaultOpen     | boolean                                                | Default value of open property                                                            |
| defaultValue    | [Date, Date]                                           | The default value (uncontrolled)                                                          |
| disabled        | boolean                                                | Whether disabled the component                                                            |
| editable        | boolean `(true)`                                       | Rendered as an input, the date can be entered via the keyboard                            |
| format          | string `('HH:mm')`                                     | Format of the date when rendered in the input                                             |
| hideHours       | (hour:number, date:Date) => boolean                    | Hide specific hour options                                                                |
| hideMinutes     | (minute:number, date:Date) => boolean                  | Hide specific minute options                                                              |
| hideSeconds     | (second:number, date:Date) => boolean                  | Hide specific second options                                                              |
| label           | ReactNode                                              | A label displayed at the beginning of toggle button                                       |
| loading         | boolean `(false)`                                      | Whether to display a loading state indicator                                              |
| locale          | [DateTimeFormats](/guide/i18n/#date-time-formats)      | Define localization settings to show component text in the user's regional language       |
| onChange        | (value: [Date, Date]) => void                          | Callback fired when value changed                                                         |
| onClean         | (event) => void                                        | Callback fired when value clean                                                           |
| onClose         | () => void                                             | Callback fired when close component                                                       |
| onEnter         | () => void                                             | Callback fired before the overlay transitions in                                          |
| onEntered       | () => void                                             | Callback fired after the overlay finishes transitioning in                                |
| onEntering      | () => void                                             | Callback fired as the overlay begins to transition in                                     |
| onExit          | () => void                                             | Callback fired right before the overlay transitions out                                   |
| onExited        | () => void                                             | Callback fired after the overlay finishes transitioning out                               |
| onExiting       | () => void                                             | Callback fired as the overlay begins to transition out                                    |
| onOk            | (value: [Date, Date]) => void                          | Callback fired when clicked OK button                                                     |
| onOpen          | () => void                                             | Callback fired when open component                                                        |
| onShortcutClick | (shortcut: Range, event) => void                       | Callback fired when shortcut clicked                                                      |
| open            | boolean                                                | whether open the component                                                                |
| placeholder     | string                                                 | Setting placeholders                                                                      |
| placement       | [Placement](#code-ts-placement-code) `('bottomStart')` | The placement of component                                                                |
| preventOverflow | boolean                                                | Prevent floating element overflow                                                         |
| ranges          | [Range[]](#code-ts-range-code) ([])                    | Set predefined date ranges the user can select from.                                      |
| renderValue     | (date: [Date, Date], format: string) => string         | Custom render value                                                                       |
| showHeader      | boolean `(true)`                                       | Whether to display the formatted date range at the header of the calendar<br/>![][5.52.0] |
| showMeridiem    | boolean                                                | Display hours in 12 format                                                                |
| size            | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                  | A picker can have different sizes                                                         |
| value           | [Date, Date]                                           | The current value (controlled)                                                            |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->
