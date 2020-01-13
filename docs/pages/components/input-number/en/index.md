# InputNumber


## Usage

```js
import { InputNumber } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<InputNumber>`

| Property     | Type `(Default)`                                                   | Description                                                    |
| ------------ | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| classPrefix  | string `('input-number')`                                          | The prefix of the component CSS class                          |
| defaultValue | number                                                             | Default value                                                  |
| disabled     | boolean                                                            | Disabled component                                             |
| max          | number `(Infinity)`                                                | Maximum value                                                  |
| min          | number `(-Infinity)`                                               | Minimum value                                                  |
| onChange     | (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void | The callback function when value changes                       |
| postfix      | React.Node                                                         | Sets the element displayed on the right side of the component. |
| prefix       | React.Node                                                         | Sets the element displayed to the left of the component.       |
| size         | enum: 'lg', 'md', 'sm', 'xs' `('md')`                              | An input can have different sizes                              |
| step         | number `(1)`                                                       | The value of each step. can be decimal.                        |
| value        | number                                                             | Value （Controlled）                                           |
