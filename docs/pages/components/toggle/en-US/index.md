# Toggle

Toggle switch, used for selection between two values.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Sizes

<!--{include:`size.md`}-->

### Colors

<!--{include:`color.md`}-->

### With label

<!--{include:`with-label.md`}-->

### Text and icon

You can set the content displayed in the two states of the switch through the `checkedChildren` and `unCheckedChildren` properties.

<!--{include:`inner.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Loading

<!--{include:`loading.md`}-->

## Accessibility

### ARIA Properties

- `Toggle` has role `switch`.
- Has `aria-checked` set to `true` when it is checked.
- Has `aria-checked` set to `false` when it is unchecked.
- Has `aria-busy` set to `true` when it is loading.
- Has `aria-disabled` set to `true` when it is disabled.
- Has `aria-labelledby` set to the id of `children` when it has `children`.

### Keyboard Interactions

- <kbd>Space</kbd> - Toggle the switch state.

## Props

### `<Toggle>`

| Property          | Type `(Default)`                        | Description                                     |
| ----------------- | --------------------------------------- | ----------------------------------------------- |
| checked           | boolean                                 | Whether the toggle is checked (Controlled)      |
| checkedChildren   | ReactNode                               | Checked display content                         |
| children          | ReactNode                               | The label of the toggle switch <br/>![][5.63.0] |
| classPrefix       | string `('toggle')`                     | The prefix of the component CSS class           |
| color             | [Color](#code-ts-color-code)            | Color of the toggle switch <br/>![][5.63.0]     |
| defaultChecked    | boolean                                 | Default checked state                           |
| disabled          | boolean                                 | Whether the switch is disabled                  |
| loading           | boolean                                 | Whether the switch is in loading state          |
| locale            | [ToggleLocaleType](/guide/i18n/#toggle) | Custom locale text                              |
| onChange          | (checked: boolean, event) => void       | Callback function when state changes            |
| size              | 'lg' \| 'md' \| 'sm'                    | Toggle size                                     |
| unCheckedChildren | ReactNode                               | Unchecked display content                       |

<!--{include:(_common/types/color.md)}-->

[5.63.0]: https://img.shields.io/badge/>=-v5.63.0-blue
