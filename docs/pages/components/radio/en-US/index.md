# Radio

Radio

## Import

<!--{include:<import-guide>}-->

- `<Radio>` Radio button.
- `<RadioGroup>` Radio group.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Colors

<!--{include:`colors.md`}-->

### Radio Group

<!--{include:`radio-group.md`}-->

### Radio Group - Inline layout

<!--{include:`radio-group-inline.md`}-->

### Radio Group - Picker

<!--{include:`radio-group-inline-picker.md`}-->

### Controlled Radio Group

<!--{include:`radio-group-controlled.md`}-->

## Accessibility

### ARIA properties

- RadioGroup `role` is `radiogroup`.
- Each Radio `role` is `radio`.
- If a Radio is checked, `aria-checked` is set to `true`.
- If a Radio is disabled, `aria-disabled` is set to `true`.

### Keyboard interaction

- <kbd>→</kbd> - Move focus to the next radio button. If focus is on the last radio button in the group, move to the first radio button.
- <kbd>←</kbd> - Move focus to the previous radio button. If focus is on the first radio button in the group, move to the last radio button.

## Props

### `<Radio>`

| Property       | Type `(Default)`                                 | Description                                                                                 |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| as             | ElementType`(div)`                               | Custom element type for the component                                                       |
| checked        | boolean                                          | Specifies whether the radio is selected                                                     |
| color          | [Color](#code-ts-color-code)                     | The color of the radio when checked <br/>![](https://img.shields.io/badge/min-v5.56.0-blue) |
| defaultChecked | boolean                                          | Specifies the initial state: whether or not the radio is selected                           |
| disabled       | boolean                                          | The disable of component                                                                    |
| inline         | boolean                                          | Inline layout                                                                               |
| inputProps     | object                                           | Attributes applied to the input element                                                     |
| inputRef       | ref                                              | Pass a ref to the input element.                                                            |
| name           | string                                           | Name to use for form                                                                        |
| onChange       | (value: string, checked: boolean, event) => void | callback function that has been checked for changes in state                                |
| title          | string                                           | HTML title                                                                                  |
| value          | string                                           | Value, corresponding to the value of the Radiogroup, to determine whether the               |

### `<RadioGroup>`

| Property     | Type `(Default)`              | Description                                  |
| ------------ | ----------------------------- | -------------------------------------------- |
| appearance   | 'default' &#124; 'picker'     | A radio group can have different appearances |
| defaultValue | string                        | Default value                                |
| inline       | boolean                       | Inline layout                                |
| name         | string                        | Name to use for form                         |
| onChange     | (value:string, event) => void | Callback function with value changed         |
| value        | string                        | Value (Controlled)                           |

<!--{include:(_common/types/color.md)}-->
