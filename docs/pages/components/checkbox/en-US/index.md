# Checkbox

Check boxes are usually used in groups. Allow users to select one or more values ​​from a set.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Indeterminate

The `indeterminate` property sets the Checkbox to an indeterminate state, mainly used in the select all or tree structure Checkbox.

<!--{include:`indeterminate.md`}-->

### Colors

<!--{include:`colors.md`}-->

### Checkbox Group

<!--{include:`checkbox-group.md`}-->

### Checkbox Group With Horizontal Layout

<!--{include:`checkbox-groupinline.md`}-->

### Checkbox Group (Controlled)

<!--{include:`checkbox-group-controlled.md`}-->

## Accessibility

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox

- When `checked`, Checkbox has `aria-checked` set to `true`.
- When not `checked`, Checkbox has `aria-checked` set to `false`.
- When partially `checked`, Checkbox has `aria-checked` set to `mixed`.
- If `children` is set, it will be wrapped in `<label>` together with `Checkbox`.

## Props

### `<Checkbox>`

| Property       | Type `(default)`                                           | Description                                                                                                     |
| -------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| as             | ElementType`(div)`                                         | Custom element type for the component                                                                           |
| checked        | boolean                                                    | Specifies whether the checkbox is selected                                                                      |
| color          | [Color](#code-ts-color-code)                               | The color of the checkbox when checked or indeterminate <br/>![](https://img.shields.io/badge/min-v5.56.0-blue) |
| defaultChecked | boolean                                                    | Specifies the initial state: whether or not the checkbox is selected                                            |
| disabled       | boolean                                                    | Whether disabled                                                                                                |
| indeterminate  | boolean                                                    | When being a checkbox , setting styles after the child part is selected                                         |
| inputRef       | Ref                                                        | Ref of input element                                                                                            |
| name           | string                                                     | Used for the name of the form                                                                                   |
| onChange       | (value: string \| number, checked: boolean, event) => void | Callback fired when checkbox is triggered and state changes                                                     |
| title          | string                                                     | HTML title                                                                                                      |
| value          | string \| number                                           | Correspond to the value of CheckboxGroup, determine whether to select                                           |

### `<CheckboxGroup>`

| Property     | Type `(default)`                            | Description                                                 |
| ------------ | ------------------------------------------- | ----------------------------------------------------------- |
| defaultValue | string[] \| number[]                        | Default value                                               |
| inline       | boolean                                     | Inline layout                                               |
| name         | string                                      | Used for the name of the form                               |
| onChange     | (value:string[] \| number[], event) => void | Callback fired when checkbox is triggered and state changes |
| value        | string[] \| number[]                        | Value of checked box (Controlled)                           |

<!--{include:(_common/types/color.md)}-->
