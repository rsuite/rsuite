# Checkbox

Check boxes are usually used in groups. Allow users to select one or more values ​​from a set.

## Import

```js
import { Checkbox, CheckboxGroup } from 'rsuite';

//or
import Checkbox from 'rsuite/lib/Checkbox';
import CheckboxGroup from 'rsuite/lib/CheckboxGroup';
```

## Examples

<!--{demo}-->

## Props

```ts
type ValueType = string | number;
```

### `<Checkbox>`

| Property       | Type `(default)`                                    | Description                                                             |
| -------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| checked        | boolean                                             | Specifies whether the checkbox is selected                              |
| defaultChecked | boolean                                             | Specifies the initial state: whether or not the checkbox is selected    |
| disabled       | boolean                                             | Whether disabled                                                        |
| id             | ElementType                                         | Custom element type for the component                                   |
| indeterminate  | boolean                                             | When being a checkbox , setting styles after the child part is selected |
| inline         | boolean                                             | Inline layout                                                           |
| inputRef       | Ref                                                 | Ref of input element                                                    |
| name           | string                                              | Used for the name of the form                                           |
| onChange       | (value: ValueType, checked: boolean, event) => void | Callback fired when checkbox is triggered and state changes             |
| title          | string                                              | HTML title                                                              |
| value          | ValueType                                           | Correspond to the value of CheckboxGroup, determine whether to select   |

### `<CheckboxGroup>`

| Property     | Type `(default)`                   | Description                                                 |
| ------------ | ---------------------------------- | ----------------------------------------------------------- |
| defaultValue | ValueType[]                        | Default value                                               |
| inline       | boolean                            | Inline layout                                               |
| name         | string                             | Used for the name of the form                               |
| onChange     | (value:ValueType[], event) => void | Callback fired when checkbox is triggered and state changes |
| value        | ValueType[]                        | Value of checked box (Controlled)                           |
