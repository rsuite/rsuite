# DateRangeInput

The DateRangeInput components let the user select a date range with the keyboard.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Customize the date format

<!--{include:`format.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Controlled vs. uncontrolled value

<!--{include:`controlled.md`}-->

## Accessibility

### ARIA properties

- The DateRangeInput component is the `<input type="text">` element.
- When the DateRangeInput component is disabled, the `disabled` property is added to the `<input>` element.
- When the DateRangeInput component is read only, the `readonly` property is added to the `<input>` element.

### Keyboard interactions

- Use <kbd>→</kbd> <kbd>←</kbd> keyboard to navigate to the previous or next date segment.
- Use <kbd>↓</kbd> <kbd>↑</kbd> keys to increase and decrease values.
- Use <kbd>Backspace</kbd> key to delete selected value.
- Use numeric key to update selected value.

## Props

### `<DateRangeInput>`

| Property     | Type`(default)`                             | Description                                               |
| ------------ | ------------------------------------------- | --------------------------------------------------------- |
| character    | string `(' ~ ')`                            | The character between the start and end dates             |
| defaultValue | [Date, Date]〡 null                         | The default value (uncontrolled)                          |
| disabled     | boolean                                     | Whether disabled the component                            |
| format       | string `('dd/MM/yyyy')`                     | Format of the date when rendered in the input             |
| onChange     | (date: [Date, Date]〡 null , event) => void | Callback fired when value changed                         |
| plaintext    | boolean                                     | Whether plaintext the component                           |
| readOnly     | boolean                                     | Whether read only the component                           |
| size         | 'lg'〡'md'〡'sm'〡'xs' `('md')`             | Date input can have different sizes                       |
| value        | [Date, Date]〡 null                         | The selected value. Used when the component is controlled |
