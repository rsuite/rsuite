# Radio

A common radio box. If there are only two options, you can also use the Toggle component.

- `<Radio>`
- `<RadioGroup>`

## Usage

```js
import { Radio, RadioGroup } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Radio>`

| Property       | Type `(Default)`                                                   | Description                                                                   |
| -------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| checked        | boolean                                                            | Specifies whether the radio is selected                                       |
| defaultChecked | boolean                                                            | Specifies the initial state: whether or not the radio is selected             |
| disabled       | boolean                                                            | The disable of component                                                      |
| inline         | boolean                                                            | Inline layout                                                                 |
| inputRef       | React.Ref                                                          | Ref for the input element                                                     |
| name           | string                                                             | Name to use for form                                                          |
| onChange       | (value: any, checked: boolean, event: SyntheticInputEvent) => void | callback function that has been checked for changes in state                  |
| title          | string                                                             | HTML title                                                                    |
| value          | any                                                                | Value, corresponding to the value of the Radiogroup, to determine whether the |

### `<RadioGroup>`

| Property     | Type `(Default)`                              | Description                                  |
| ------------ | --------------------------------------------- | -------------------------------------------- |
| appearance   | enum: 'default', 'picker'                     | A radio group can have different appearances |
| defaultValue | any                                           | Default value                                |
| inline       | boolean                                       | Inline layout                                |
| name         | string                                        | Name to use for form                         |
| onChange     | (value:any,event:SyntheticInputEvent) => void | Callback function with value changed         |
| value        | any                                           | Value (Controlled)                           |
