# Radio

Radio buttons allow the user to select one option from a set.

## Import

<!--{include:(components/radio/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Radio Group

<!--{include:`radio-group.md`}-->

### Radio Group - Inline layout

<!--{include:`radio-group-inline.md`}-->

### Radio Group - Picker

<!--{include:`radio-group-inline-picker.md`}-->

### Controlled Radio Group

<!--{include:`radio-group-controller.md`}-->

### Accessibility

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton

- `Radio` has aria-checked set to `true` when it's checked. Otherwise, aria-checked is set to `false`.

## Props

### `<Radio>`

| Property       | Type `(Default)`                                 | Description                                                                   |
| -------------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| checked        | boolean                                          | Specifies whether the radio is selected                                       |
| defaultChecked | boolean                                          | Specifies the initial state: whether or not the radio is selected             |
| disabled       | boolean                                          | The disable of component                                                      |
| inline         | boolean                                          | Inline layout                                                                 |
| inputProps     | object                                           | Attributes applied to the input element                                       |
| inputRef       | ref                                              | Pass a ref to the input element.                                              |
| name           | string                                           | Name to use for form                                                          |
| onChange       | (value: string, checked: boolean, event) => void | callback function that has been checked for changes in state                  |
| title          | string                                           | HTML title                                                                    |
| value          | string                                           | Value, corresponding to the value of the Radiogroup, to determine whether the |

### `<RadioGroup>`

| Property     | Type `(Default)`              | Description                                  |
| ------------ | ----------------------------- | -------------------------------------------- |
| appearance   | enum: 'default', 'picker'     | A radio group can have different appearances |
| defaultValue | string                        | Default value                                |
| inline       | boolean                       | Inline layout                                |
| name         | string                        | Name to use for form                         |
| onChange     | (value:string, event) => void | Callback function with value changed         |
| value        | string                        | Value (Controlled)                           |
