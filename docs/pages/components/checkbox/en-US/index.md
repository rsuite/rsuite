# Checkbox

Check boxes are usually used in groups. Allow users to select one or more values ​​from a set.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Disabled and read only

Use the `disabled` prop to disable a checkbox or `readOnly` to make it read-only, preventing user interaction.

<!--{include:`disabled.md`}-->

### Indeterminate

The `indeterminate` property sets the Checkbox to an indeterminate state, mainly used in the select all or tree structure Checkbox.

<!--{include:`indeterminate.md`}-->

### Colors

Customize checkbox colors using the `color` property. Supports preset theme colors.

<!--{include:`colors.md`}-->

### Checkbox Group

Use `<CheckboxGroup>` to manage a group of checkboxes. The `value` prop controls which options are selected.

<!--{include:`checkbox-group.md`}-->

### Inline Layout

Add the `inline` prop to `<CheckboxGroup>` to arrange checkboxes horizontally instead of vertically.

<!--{include:`checkbox-groupinline.md`}-->

### Checkbox Group (Controlled)

Manage checkbox group state with the `value` and `onChange` props for controlled component behavior.

<!--{include:`checkbox-group-controlled.md`}-->

## Accessibility

### ARIA properties

- The `role` property of the CheckboxGroup is `group`.
- The `role` property of each Checkbox is `checkbox`.
- If the Checkbox is disabled, set `aria-disabled` to `true`.
- If the Checkbox is checked, set `aria-checked` to `true`, otherwise set it to `false`.
- When partially checked, it has state `aria-checked` set to mixed.
- A visible label referenced by the value of `aria-labelledby` set on the element with role `checkbox`.

### Keyboard interaction

- When the Checkbox has focus, pressing the <kbd>Space</kbd> key changes the state of the Checkbox.

## Props

### `<Checkbox>`

| Property       | Type `(default)`                                           | Description                                                             | Version     |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- | ----------- |
| as             | ElementType`(div)`                                         | Custom element type for the component                                   |             |
| checked        | boolean                                                    | Specifies whether the checkbox is selected                              |             |
| color          | [Color](#code-ts-color-code)                               | The color of the checkbox when checked or indeterminate                 | ![][5.56.0] |
| defaultChecked | boolean                                                    | Specifies the initial state: whether or not the checkbox is selected    |             |
| disabled       | boolean                                                    | Whether disabled                                                        |             |
| indeterminate  | boolean                                                    | When being a checkbox , setting styles after the child part is selected |             |
| inputRef       | Ref                                                        | Ref of input element                                                    |             |
| name           | string                                                     | Used for the name of the form                                           |             |
| onChange       | (value: string \| number, checked: boolean, event) => void | Callback fired when checkbox is triggered and state changes             |             |
| title          | string                                                     | HTML title                                                              |             |
| value          | string \| number                                           | Correspond to the value of CheckboxGroup, determine whether to select   |             |

### `<CheckboxGroup>`

| Property     | Type `(default)`                            | Description                                                 |
| ------------ | ------------------------------------------- | ----------------------------------------------------------- |
| defaultValue | string[] \| number[]                        | The default value                                           |
| inline       | boolean                                     | Inline layout                                               |
| name         | string                                      | Used for the name of the form                               |
| onChange     | (value:string[] \| number[], event) => void | Callback fired when checkbox is triggered and state changes |
| value        | string[] \| number[]                        | Value of checked box (Controlled)                           |

### Type Definitions

<!--{include:(_common/types/color.md)}-->
