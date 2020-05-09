# Checkbox

Commonly used checkboxes

- `<Checkbox>`
- `<CheckboxGroup>`

## Usage

```js
import { Checkbox, CheckboxGroup } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Checkbox>`

| Property       | Type `(default)`                                                   | Description                                                             |
| -------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| checked        | boolean                                                            | Specifies whether the checkbox is selected                              |
| defaultChecked | boolean                                                            | Specifies the initial state: whether or not the checkbox is selected    |
| disabled       | boolean                                                            | Whether disabled                                                        |
| id             | React.ElementType                                                  | Custom element type for the component                                   |
| indeterminate  | boolean                                                            | When being a checkbox , setting styles after the child part is selected |
| inline         | boolean                                                            | Inline layout                                                           |
| inputRef       | React.Ref                                                          | Ref of input element                                                    |
| name           | string                                                             | Used for the name of the form                                           |
| onChange       | (value: any, checked: boolean, event: SyntheticInputEvent) => void | Callback fired when checkbox is triggered and state changes             |
| title          | string                                                             | HTML title                                                              |
| value          | any                                                                | Correspond to the value of CheckboxGroup, determine whether to select   |

### `<CheckboxGroup>`

| Property     | Type `(default)`          | Description                                                 |
| ------------ | ------------------------- | ----------------------------------------------------------- |
| defaultValue | Array                     | Default value                                               |
| inline       | boolean                   | Inline layout                                               |
| name         | string                    | Used for the name of the form                               |
| onChange     | (value:any,event) => void | Callback fired when checkbox is triggered and state changes |
| value        | Array                     | Value of checked box (Controlled)                           |
