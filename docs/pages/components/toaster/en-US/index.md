# Toaster

Toaster display brief, temporary notifications of actions, errors, or other events in an application. It is often used with the Message and Notification components.

## Import

<!--{include:<import-guide>}-->

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

## Hooks

### useToaster

`useToaster` is a React Hook for creating and managing toasts.

```ts
import { useToaster } from 'rsuite';

return () => {
  const toaster = useToaster();

  const handleClick = () => {
    // Push a message
    toaster.push(<Message>message</Message>);
  };

  return <Button onClick={handleClick}>Push</Button>;
};
```

The toaster instance created by `useToaster` needs to be used within a specified container. Therefore, we need to provide a `CustomProvider` component to wrap the application outside the App component. Here's an example:

```tsx
import { createRoot } from 'react-dom/client';
import { CustomProvider } from 'rsuite';

const root = createRoot(document.getElementById('root')!);

root.render(
  <CustomProvider>
    <App />
  </CustomProvider>
);
```

#### toaster.push

Push a message and return a unique toastId.

```
toaster.push(message: ReactNode, toastProps?: ToastProps): string;
```

##### ToastProps

| Property   | Type                                                                                                    | Description                                                                 | Version     |
| ---------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| container  | HTMLElement \| (() => HTMLElement)                                                                      | Set the container where the message appears                                 |             |
| duration   | number                                                                                                  | The number of milliseconds to wait before automatically closing the message |             |
| mouseReset | boolean `(true)`                                                                                        | Reset the auto-close timer when the mouse enters the message                | ![][5.65.0] |
| placement  | 'topCenter' \| 'topStart' \| 'topEnd' \| 'bottomCenter' \| 'bottomStart' \| 'bottomEnd' `('topCenter')` | Set the position of the message                                             |             |

#### toaster.remove

Remove a message by toastId.

```
toaster.remove(toastId: string): void;
```

#### toaster.clear

Remove all messages.

```
toaster.clear(): void;
```
