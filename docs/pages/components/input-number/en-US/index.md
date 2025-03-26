# InputNumber

An input component that can only enter numbers.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Decimals

<!--{include:`decimals.md`}-->

### Decimal separator

A decimal separator is a symbol that separates the integer part from the fractional part of a number written in decimal form (e.g., "." in 12.45). Different countries officially designate different symbols for use as the separator.

<!--{include:`decimal-separator.md`}-->

### Formatter

<!--{include:`formatter.md`}-->

### Limits

limits: 10 - 100

<!--{include:`max-min.md`}-->

### Step

<!--{include:`step.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Combination

<!--{include:`combination.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

## Props

### `<InputNumber>`

| Property         | Type `(Default)`                      | Description                                                        |
| ---------------- | ------------------------------------- | ------------------------------------------------------------------ |
| classPrefix      | string `('input-number')`             | The prefix of the component CSS class.                             |
| decimalSeparator | string                                | The decimal separator <br/>![][5.69.0]                             |
| defaultValue     | number                                | Default value.                                                     |
| disabled         | boolean                               | Disabled component.                                                |
| formatter        | (value: number) => string             | A format string used to display the number value. <br/>![][5.55.0] |
| max              | number                                | Maximum value.                                                     |
| min              | number                                | Minimum value.                                                     |
| onChange         | (value: number , event) => void       | The callback function when value changes.                          |
| postfix          | ReactNode                             | Sets the element displayed on the right side of the component.     |
| prefix           | ReactNode                             | Sets the element displayed to the left of the component.           |
| scrollable       | boolean `(true)`                      | Whether the value can be changed through the wheel event.          |
| size             | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | An input can have different sizes.                                 |
| step             | number `(1)`                          | The value of each step. can be decimal.                            |
| value            | number                                | The current value (controlled).                                    |

[5.69.0]: https://img.shields.io/badge/>=-v5.69.0-blue
[5.55.0]: https://img.shields.io/badge/>=-v5.55.0-blue
