# useDialog

`useDialog` is a React Hook that provides a declarative way to display different types of dialogs (alert, confirm, prompt) and custom dialogs.

## Usage

<div class="rs-doc-steps">

<h3 class="rs-doc-step-header">Install CustomProvider</h3>

<div class="rs-doc-step-body">

The first thing you need to do is install CustomProvider at the root of your application to manage the dialog rendering container.

```jsx
import { CustomProvider } from 'rsuite';

function App({ children }) {
  return <CustomProvider>{children}</CustomProvider>;
}
```

</div>

<h3 class="rs-doc-step-header">Using useDialog</h3>

<div class="rs-doc-step-body">

```jsx
import { useDialog } from 'rsuite';

function MyApp() {
  const dialog = useDialog();

  // Alert dialog
  dialog.alert('Hello, world!');

  // Confirm dialog
  dialog.confirm('Are you sure?');

  // Prompt dialog
  dialog.prompt('What is your name?');

  // Custom dialog
  dialog.open(CustomDialog);
}
```

</div>
</div>

## Examples

### Alert Dialog

Similar to `window.alert`, it opens a dialog to display a message to the user.

<!--{include:`alert.md`}-->

### Confirm Dialog

Similar to `window.confirm`, it opens a dialog to ask the user a question.

<!--{include:`confirm.md`}-->

### Prompt Dialog

Similar to `window.prompt`, it opens a dialog to ask the user to input some text.

<!--{include:`prompt.md`}-->

### Prompt Dialog with Validation

You can add validation to prompt dialogs to ensure the input meets certain criteria before allowing the user to proceed.

<!--{include:`prompt-validation.md`}-->

### Custom Dialog

Displays a custom dialog component.

<!--{include:`custom.md`}-->

### Stacked Dialogs

<!--{include:`stacked.md`}-->

## API

### `useDialog()`

Returns an object containing the following methods:

| Property | Type                                                                                                               | Description                 |
| -------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| alert    | (message: ReactNode, options?: [AlertOptions](#code-ts-alert-options-code)) => Promise&lt;void&gt;               | Shows an alert dialog       |
| confirm  | (message: ReactNode, options?: [ConfirmOptions](#code-ts-confirm-options-code)) => Promise&lt;boolean&gt;        | Shows a confirmation dialog |
| prompt   | (message: ReactNode, options?: [PromptOptions](#code-ts-prompt-options-code)) => Promise&lt;string&gt;           | Shows a prompt dialog       |
| open     | (component: ComponentType, payload?: P, options?: [OpenOptions](#code-ts-open-options-code)) => Promise&lt;T&gt; | Shows a custom dialog       |

### Type Definitions

#### `ts:AlertOptions`

```ts
interface AlertOptions {
  title?: string; // Dialog title, defaults to 'Alert'
  okText?: string; // Text for the OK button, defaults to 'OK'
  onClose?: () => void; // Callback when dialog is closed
}
```

#### `ts:ConfirmOptions`

```ts
interface ConfirmOptions {
  title?: string; // Dialog title, defaults to 'Confirm'
  okText?: string; // Text for the OK button, defaults to 'OK'
  cancelText?: string; // Text for the Cancel button
  severity?: 'info' | 'success' | 'warning' | 'error'; // Visual style of the dialog
  onClose?: (result: boolean) => void; // Callback when dialog is closed
}
```

#### `ts:PromptOptions`

```ts
interface PromptOptions {
  title?: string; // Dialog title, defaults to 'Confirm'
  okText?: string; // Text for the OK button, defaults to 'OK'
  cancelText?: string; // Text for the Cancel button
  defaultValue?: string; // Default value for the input field
  validate?: (value: string) => [isValid: boolean, errorMessage?: string]; // Validation function
  onClose?: (result: string) => void; // Callback when dialog is closed
}
```

#### `ts:OpenOptions`

```ts
interface OpenOptions<T> {
  onClose?: (result?: T) => void; // Callback when dialog is closed
}
```
