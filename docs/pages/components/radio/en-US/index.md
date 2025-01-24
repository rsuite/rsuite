# Radio

Radios are used when only one choice may be selected in a series of options.

## Import

<!--{include:<import-guide>}-->

- `<Radio>` A radio button is a checkable input that when associated with other radio buttons, only one of which can be checked at a time.
- `<RadioGroup>` Radio Group allow users to select a single option from a list of mutually exclusive options.

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

| Property       | Type `(Default)`                                 | Description                                                                   |
| -------------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| as             | ElementType`(div)`                               | Custom element type for the component                                         |
| checked        | boolean                                          | Specifies whether the radio is selected                                       |
| color          | [Color](#code-ts-color-code)                     | The color of the radio when checked <br/>![][5.56.0]                          |
| defaultChecked | boolean                                          | Specifies the initial state: whether or not the radio is selected             |
| disabled       | boolean                                          | The disable of component                                                      |
| inline         | boolean                                          | Inline layout                                                                 |
| inputProps     | object                                           | Attributes applied to the input element                                       |
| inputRef       | ref                                              | Pass a ref to the input element.                                              |
| name           | string                                           | Name to use for form                                                          |
| onChange       | (value: string, checked: boolean, event) => void | callback function that has been checked for changes in state                  |
| value          | string                                           | Value, corresponding to the value of the Radiogroup, to determine whether the |

### `<RadioGroup>`

| Property     | Type `(Default)`              | Description                                  |
| ------------ | ----------------------------- | -------------------------------------------- |
| appearance   | 'default' &#124; 'picker'     | A radio group can have different appearances |
| defaultValue | string                        | The default value (uncontrolled)             |
| inline       | boolean                       | Inline layout                                |
| name         | string                        | Name to use for form                         |
| onChange     | (value:string, event) => void | Callback function with value changed         |
| value        | string                        | The current value (controlled)               |

<!--{include:(_common/types/color.md)}-->

[5.56.0]: https://img.shields.io/badge/>=-v5.56.0-blue
