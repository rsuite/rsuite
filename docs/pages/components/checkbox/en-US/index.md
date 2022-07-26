# Checkbox

Check boxes are usually used in groups. Allow users to select one or more values ​​from a set.

## Import

<!--{include:(components/checkbox/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Indeterminate State

the `indeterminate` property is mainly used on the select all or tree structure checkbox.

<!--{include:`indeterminate.md`}-->

### Checkbox Group

<!--{include:`checkbox-group.md`}-->

### Checkbox Group With Horizontal Layout

<!--{include:`checkbox-groupinline.md`}-->

### Checkbox Group (Controlled)

<!--{include:`checkbox-group-controller.md`}-->

## Accessibility

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox

- When `checked`, Checkbox has `aria-checked` set to `true`.
- When not `checked`, Checkbox has `aria-checked` set to `false`.
- When partially `checked`, Checkbox has `aria-checked` set to `mixed`.
- If `children` is set, it will be wrapped in `<label>` together with `Checkbox`.

## Props

### `<Checkbox>`

| Property       | Type `(default)`                                                                | Description                                                             |
| -------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| checked        | boolean                                                                         | Specifies whether the checkbox is selected                              |
| defaultChecked | boolean                                                                         | Specifies the initial state: whether or not the checkbox is selected    |
| disabled       | boolean                                                                         | Whether disabled                                                        |
| id             | ElementType                                                                     | Custom element type for the component                                   |
| indeterminate  | boolean                                                                         | When being a checkbox , setting styles after the child part is selected |
| inline         | boolean                                                                         | Inline layout                                                           |
| inputRef       | Ref                                                                             | Ref of input element                                                    |
| name           | string                                                                          | Used for the name of the form                                           |
| onChange       | (value: [ValueType](#code-ts-value-type-code), checked: boolean, event) => void | Callback fired when checkbox is triggered and state changes             |
| title          | string                                                                          | HTML title                                                              |
| value          | [ValueType](#code-ts-value-type-code)                                           | Correspond to the value of CheckboxGroup, determine whether to select   |

### `<CheckboxGroup>`

| Property     | Type `(default)`                                               | Description                                                 |
| ------------ | -------------------------------------------------------------- | ----------------------------------------------------------- |
| defaultValue | [ValueType](#code-ts-value-type-code)[]                        | Default value                                               |
| inline       | boolean                                                        | Inline layout                                               |
| name         | string                                                         | Used for the name of the form                               |
| onChange     | (value:[ValueType](#code-ts-value-type-code)[], event) => void | Callback fired when checkbox is triggered and state changes |
| value        | [ValueType](#code-ts-value-type-code)[]                        | Value of checked box (Controlled)                           |

### `ts:ValueType`

```ts
type ValueType = string | number;
```
