# DateInput

The DateInput component lets users select a date with the keyboard.

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

- The DateInput component is the `<input type="text">` element.
- When the DateInput component is disabled, the `disabled` property is added to the `<input>` element.
- When the DateInput component is read only, the `readonly` property is added to the `<input>` element.

### Keyboard interactions

- Use <kbd>→</kbd> <kbd>←</kbd> keyboard to navigate to the previous or next date segment.
- Use <kbd>↓</kbd> <kbd>↑</kbd> keys to increase and decrease values.
- Use <kbd>Backspace</kbd> key to delete selected value.
- Use numeric key to update selected value.

## Props

### `<DateInput>`

| Property     | Type`(default)`                 | Description                                               |
| ------------ | ------------------------------- | --------------------------------------------------------- |
| defaultValue | Date                            | The default value (uncontrolled)                          |
| disabled     | boolean                         | Whether disabled the component                            |
| format       | string `('yyyy-MM-dd')`         | Format of the date when rendered in the input             |
| onChange     | (date: Date, event) => void     | Callback fired when value changed                         |
| plaintext    | boolean                         | Whether plaintext the component                           |
| readOnly     | boolean                         | Whether read only the component                           |
| size         | 'lg'〡'md'〡'sm'〡'xs' `('md')` | Date input can have different sizes                       |
| value        | Date                            | The selected value. Used when the component is controlled |
