# TimePicker

TimePicker is a component that allows users to select a time value.

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

Has all ARIA properties of the DateInput component by default.

- The `aria-invalid="true"` attribute is added to the `<input>` element when the value is invalid.
- When `label` is set, the `aria-labelledby` attribute is added to the `<input>` element and the `dialog` element and is set to the value of the `id` attribute of `label`.
- Has the `aria-haspopup="dialog"` attribute to indicate that the component has an interactive dialog.

## Props

### `<TimePicker>`

| Property            | Type`(default)`                                                 | Description                                                                         |
| ------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| appearance          | 'default' \| 'subtle' `('default')`                             | Set picker appearence                                                               |
| block               | boolean                                                         | Blocking an entire row                                                              |
| caretAs             | ElementType                                                     | Custom component for the caret icon                                                 |
| cleanable           | boolean `(true)`                                                | Whether the selected value can be cleared                                           |
| container           | HTMLElement \| (() => HTMLElement)                              | Sets the rendering container                                                        |
| defaultOpen         | boolean                                                         | Default value of open property                                                      |
| defaultValue        | Date                                                            | The default value (uncontrolled)                                                    |
| disabled            | boolean                                                         | Whether disabled the component                                                      |
| editable            | boolean `(true)`                                                | Rendered as an input, the date can be entered via the keyboard                      |
| format              | string `('HH:mm')`                                              | Format of the date when rendered in the input                                       |
| hideHours           | (hour:number, date:Date) => boolean                             | Hide specific hour options                                                          |
| hideMinutes         | (minute:number, date:Date) => boolean                           | Hide specific minute options                                                        |
| hideSeconds         | (second:number, date:Date) => boolean                           | Hide specific second options                                                        |
| label               | ReactNode                                                       | A label displayed at the beginning of toggle button                                 |
| loading             | boolean `(false)`                                               | Whether to display a loading state indicator                                        |
| locale              | [DateTimeFormats](/guide/i18n/#date-time-formats)               | Define localization settings to show component text in the user's regional language |
| onChange            | (date: Date) => void                                            | Callback fired when value changed                                                   |
| onClean             | (event) => void                                                 | Callback fired when value clean                                                     |
| onClose             | () => void                                                      | Callback fired when close component                                                 |
| onEnter             | () => void                                                      | Callback fired before the overlay transitions in                                    |
| onEntered           | () => void                                                      | Callback fired after the overlay finishes transitioning in                          |
| onEntering          | () => void                                                      | Callback fired as the overlay begins to transition in                               |
| onExit              | () => void                                                      | Callback fired right before the overlay transitions out                             |
| onExited            | () => void                                                      | Callback fired after the overlay finishes transitioning out                         |
| onExiting           | () => void                                                      | Callback fired as the overlay begins to transition out                              |
| onOk                | (date: Date, event) => void                                     | Click the OK callback function                                                      |
| onOpen              | () => void                                                      | Callback fired when open component                                                  |
| onSelect            | (date: Date) => void                                            | Callback fired when time is selected                                                |
| onShortcutClick     | (shortcut: Range, event) => void                                | Callback fired when shortcut clicked                                                |
| open                | boolean                                                         | Whether open the component                                                          |
| placeholder         | string                                                          | Placeholder                                                                         |
| placement           | [Placement](#code-ts-placement-code) `('bottomStart')`          | The placement of component                                                          |
| preventOverflow     | boolean                                                         | Prevent floating element overflow                                                   |
| ranges              | [Range[]](#code-ts-range-code) ([Ranges](#code-ts-ranges-code)) | Shortcut config                                                                     |
| renderValue         | (date: Date, format: string) => string                          | Custom render value                                                                 |
| shouldDisableHour   | (hour:number, date:Date) => boolean                             | Disabled hours                                                                      |
| shouldDisableMinute | (minute:number, date:Date) => boolean                           | Disabled minutes                                                                    |
| shouldDisableSecond | (second:number, date:Date) => boolean                           | Disabled seconds                                                                    |
| showMeridiem        | boolean                                                         | Meridiem — 12h format                                                               |
| size                | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                           | A picker can have different sizes                                                   |
| value               | Date                                                            | The current value (controlled)                                                      |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->

### `ts:Ranges`

```js
const Ranges = [
  {
    label: 'Now',
    value: () => {
      return new Date();
    }
  }
];
```
