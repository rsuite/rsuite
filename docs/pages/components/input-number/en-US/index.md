# InputNumber

An input component that can only enter numbers.

## Import

<!--{include:(components/input-number/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Decimals

<!--{include:`decimals.md`}-->

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

| Property     | Type `(Default)`                                  | Description                                                    |
| ------------ | ------------------------------------------------- | -------------------------------------------------------------- |
| classPrefix  | string `('input-number')`                         | The prefix of the component CSS class.                         |
| defaultValue | number                                            | Default value.                                                 |
| disabled     | boolean                                           | Disabled component.                                            |
| max          | number `(Infinity)`                               | Maximum value.                                                 |
| min          | number `(-Infinity)`                              | Minimum value.                                                 |
| onChange     | (value: number , event) => void                   | The callback function when value changes.                      |
| postfix      | ReactNode                                         | Sets the element displayed on the right side of the component. |
| prefix       | ReactNode                                         | Sets the element displayed to the left of the component.       |
| scrollable   | boolean `(true)`                                  | Whether the value can be changed through the wheel event.      |
| size         | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | An input can have different sizes.                             |
| step         | number `(1)`                                      | The value of each step. can be decimal.                        |
| value        | number                                            | Value (Controlled).                                            |
