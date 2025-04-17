# PinInput

PinInput is used for entering one-time passwords (OTP), PIN codes, or any short fixed-length input. Each digit is entered in its own input box, and the component manages focus and value updates automatically.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Sizes

<!--{include:`size.md`}-->

### Length

Customize number of inputs with the `length` prop.

<!--{include:`length.md`}-->

### Mask

Mask inputs (password style) using the `mask` prop.

<!--{include:`mask.md`}-->

### Attached

Remove spacing between inputs with the `attached` prop.

<!--{include:`attached.md`}-->

### One time code

Use the `otp` prop to optimize for one-time password (OTP) input.

<!--{include:`otp.md`}-->

### Placeholder

Set placeholder text with the `placeholder` prop.

<!--{include:`placeholder.md`}-->

### Disabled

Disable inputs using the `disabled` prop.

<!--{include:`disabled.md`}-->

### Read Only

Set inputs to read-only via the `readOnly` prop.

<!--{include:`readonly.md`}-->

### Allowed Keys

Restrict allowed characters with the `allowedKeys` prop. e.g. `/^[A-Fa-f0-9]$/`

<!--{include:`allowed-keys.md`}-->

### Controlled

Controlled usage with `value`, `onChange`, and `onComplete` props.

<!--{include:`controlled.md`}-->

## Accessibility

### ARIA properties

- Each PIN input uses `role="textbox"` and a hidden `<input type="hidden"/>` for form submission.
- When `otp` is true, inputs have `autocomplete="one-time-code"`; otherwise `autocomplete="off"`.

### Keyboard interactions

- Typing a character into an input moves focus to the next input.
- Pressing <kbd>Backspace</kbd> clears the current input or moves focus to the previous input when empty.
- <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> navigate between input fields.
- Pasting content populates inputs sequentially, filtering based on `allowedKeys`.

## Props

### `<PinInput>`

| Property     | Type `(Default)`                      | Description                                    |
| ------------ | ------------------------------------- | ---------------------------------------------- |
| allowedKeys  | RegExp (`/\d/`)                       | Pattern for allowed input characters           |
| attached     | boolean                               | Whether input fields are attached              |
| autoFocus    | boolean                               | Auto-focus on the first input on mount         |
| classPrefix  | string `('pin-input')`                | The prefix of the component CSS class.         |
| defaultValue | string                                | Default PIN value (uncontrolled)               |
| disabled     | boolean                               | Whether to disable PIN input                   |
| length       | number `(4)`                          | Number of PIN digits.                          |
| mask         | boolean                               | Whether to mask PIN input (like password)      |
| name         | string                                | Name for form submission                       |
| onChange     | (value: string) => void               | Callback fired when the PIN value changes      |
| onComplete   | (value: string) => void               | Callback fired when the PIN input is completed |
| otp          | boolean                               | Optimize for one-time password (OTP) input     |
| placeholder  | string                                | Placeholder for input fields                   |
| readOnly     | boolean                               | Whether the input is read-only                 |
| size         | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | Input size                                     |
| value        | string                                | PIN value (controlled)                         |
