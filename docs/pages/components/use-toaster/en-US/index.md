# useToaster

`useToaster` is a React Hook for creating and managing toast notifications.

## Usage

<div class="rs-doc-steps">

<h3 class="rs-doc-step-header">Install CustomProvider</h3>

<div class="rs-doc-step-body">

First, you need to install CustomProvider at the root of your application to manage the toast rendering container.

```jsx
import { CustomProvider } from 'rsuite';

function App({ children }) {
  return <CustomProvider>{children}</CustomProvider>;
}
```

</div>

<h3 class="rs-doc-step-header">Using useToaster</h3>

<div class="rs-doc-step-body">

```jsx
import { useToaster, Message, Notification } from 'rsuite';

function MyApp() {
  const toaster = useToaster();

  // Display a message
  toaster.push(<Message>message</Message>);


  // Display a notification
  toaster.push(<Notification>notification</Notification>);
}
```

</div>

</div>

## Examples

### With Message

Demonstrates how to use Toaster with the `Message` component to display temporary message notifications.

<!--{include:`with-message.md`}-->

### With Notification

Shows how to integrate Toaster with the `Notification` component for more detailed notifications.

<!--{include:`with-notification.md`}-->

### Custom Toast

Illustrates how to create custom-styled Toast messages, including custom content and styling.

<!--{include:`custom.md`}-->

### Custom Container

Demonstrates how to render Toast messages to a specified DOM container instead of the default body.

<!--{include:`custom-container.md`}-->

## API

### `useToaster()`

Returns an object with the following methods:

| Method  | Type                                                                 | Description                  |
| ------- | ------------------------------------------------------------------- | ---------------------------- |
| push    | (message: ReactNode, options?: [ToastOptions](#code-ts-toast-options-code)) => string | Display a toast message      |
| remove  | (toastId: string) => void                                          | Remove a message by ID       |
| clear   | () => void                                                         | Remove all messages          |


### Type Definitions

#### `ts:ToastOptions`

```ts
interface ToastOptions {
  /**
   * Set the container where the message appears
   * @default document.body
   */
  container?: HTMLElement | (() => HTMLElement);

  /**
   * The number of milliseconds to wait before automatically closing the message
   * @default 4500
   */
  duration?: number;

  /**
   * Reset the auto-close timer when the mouse enters the message
   * @default true
   * @version 5.65.0
   */
  mouseReset?: boolean;

  /**
   * Set the position of the message
   * @default 'topCenter'
   */
  placement?: 'topCenter' | 'topStart' | 'topEnd' | 'bottomCenter' | 'bottomStart' | 'bottomEnd';
}
```
