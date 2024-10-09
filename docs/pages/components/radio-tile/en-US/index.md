# RadioTile

A series of selectable tile components that behave like Radio.

## Import

<!--{include:<import-guide>}-->

- `<RadioTile>`
- `<RadioTileGroup>`

## Examples

### Basic

<!--{include:`basic.md`}-->

### Inline layout

<!--{include:`inline.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Accessibility

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton

- `RadioTile` has aria-checked set to `true` when it's checked. Otherwise, aria-checked is set to `false`.

## Props

### `<RadioTile>`

| Property       | Type `(Default)`                             | Description                                                                    |
| -------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| checked        | boolean                                      | Specifies whether the radio is selected                                        |
| defaultChecked | boolean                                      | Specifies the initial state: whether or not the radio is selected              |
| disabled       | boolean                                      | The disable of component                                                       |
| name           | string                                       | Name to use for form                                                           |
| onChange       | (value: string &#124; number, event) => void | Callback function that has been checked for changes in state                   |
| value          | string &#124; number                         | Corresponding to the value of RadioTileGroup, determine whether it is selected |

### `<RadioTileGroup>`

| Property     | Type `(Default)`                            | Description                          |
| ------------ | ------------------------------------------- | ------------------------------------ |
| defaultValue | string &#124; number                        | The default value (uncontrolled)     |
| disabled     | boolean                                     | The disable of component             |
| inline       | boolean                                     | Inline layout                        |
| name         | string                                      | Name to use for form                 |
| onChange     | (value:string &#124; number, event) => void | Callback function with value changed |
| value        | string &#124; number                        | The current value (controlled)       |
