# NumberInput

An input component that can only enter numbers.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

Set different sizes for the NumberInput component using the `size` prop.

<!--{include:`size.md`}-->

### Decimals

Default supports decimal input, and the `step` property can be used to control the decimal precision.

<!--{include:`decimals.md`}-->

### Decimal separator

A decimal separator is a symbol that separates the integer part from the fractional part of a number written in decimal form (e.g., "." in 12.45). Different countries officially designate different symbols for use as the separator.

<!--{include:`decimal-separator.md`}-->

### Formatter

Format the displayed value using the `formatter` function.

<!--{include:`formatter.md`}-->

### Min and Max

Set minimum and maximum values using the `min` and `max` props.

<!--{include:`max-min.md`}-->

### Step

Customize the step size for value changes using the `step` prop.

<!--{include:`step.md`}-->

### Disabled and read only

Disable the component using the `disabled` prop or set it to read-only with the `readOnly` prop.

<!--{include:`disabled.md`}-->

### Controls

Show or hide step controls, or provide a function to render custom icons.

<!--{include:`controls.md`}-->

### Prefix and Suffix

Display elements before and after the input box.

<!--{include:`prefix-suffix.md`}-->

### With InputGroup

Use in combination with the InputGroup component.

<!--{include:`combination.md`}-->

### Controlled

Control the component state through the `value` and `onChange` props.

<!--{include:`controlled.md`}-->

## Props

### `<NumberInput>`

| Property         | Type `(Default)`                                             | Description                                                               |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| classPrefix      | string `('number-input')`                                    | The prefix of the component CSS class.                                    |
| controls         | boolean \| ((trigger: 'up' \| 'down') => ReactNode) `(true)` | Show or hide step controls, or provide a function to render custom icons. |
| decimalSeparator | string                                                       | The decimal separator                                                     |
| defaultValue     | number                                                       | Default value.                                                            |
| disabled         | boolean                                                      | Disabled component.                                                       |
| formatter        | (value: number) => string                                    | A format string used to display the number value.                         |
| max              | number                                                       | Maximum value.                                                            |
| min              | number                                                       | Minimum value.                                                            |
| onChange         | (value: number , event) => void                              | The callback function when value changes.                                 |
| prefix           | ReactNode                                                    | Sets the element displayed to the left of the component.                  |
| scrollable       | boolean `(true)`                                             | Whether the value can be changed through the wheel event.                 |
| size             | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                        | An input can have different sizes.                                        |
| step             | number `(1)`                                                 | The value of each step. can be decimal.                                   |
| suffix           | ReactNode                                                    | Sets the element displayed on the right side of the component.            |
| value            | number                                                       | The current value (controlled).                                           |
