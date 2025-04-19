# PasswordInput

A password input component.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Custom visibility icon

<!--{include:`custom-icon.md`}-->

### Start and end icons

You can use `startIcon` and `endIcon` to set the start and end icons, respectively.
When using `endIcon`, the password visibility toggle icon will be overridden.

### Password strength meter

<!--{include:`password-strength-meter.md`}-->

<!--{include:`icons.md`}-->

## Props

### `<PasswordInput>`

| Property             | Type `(Default)`                      | Description                                                      |
| -------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| classPrefix          | string `('password-input')`           | The prefix of the component CSS class.                           |
| defaultValue         | string                                | Default value (uncontrolled)                                     |
| defaultVisible       | boolean                               | Default visibility state of the password                         |
| disabled             | boolean                               | Render the component in a disabled state                         |
| endIcon              | ReactNode                             | End icon for the input field                                     |
| htmlSize             | number                                | Sets the native HTML size attribute.                             |
| onChange             | (value: string, event) => void        | Callback function when value changes                             |
| onVisibleChange      | (visible: boolean) => void            | Callback function triggered when the password visibility changes |
| readOnly             | boolean                               | Render the component in a read-only state                        |
| renderVisibilityIcon | (visible: boolean) => ReactNode       | Custom icon for visibility toggle                                |
| size                 | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | An input can have different sizes                                |
| startIcon            | ReactNode                             | Start icon for the input field                                   |
| value                | string                                | Current value (controlled)                                       |
| visible              | boolean                               | Controls whether the password is visible                         |

### `<PasswordStrengthMeter>`

| Property    | Type `(Default)`                     | Description                            |
| ----------- | ------------------------------------ | -------------------------------------- |
| classPrefix | string `('password-strength-meter')` | The prefix of the component CSS class. |
| label       | ReactNode                            | Label for the strength meter           |
| level       | number                               | Password strength level                |
| max         | number `(4)`                         | Maximum strength level                 |
