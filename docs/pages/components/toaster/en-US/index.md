# Toaster

Toaster display brief, temporary notifications of actions, errors, or other events in an application. It is often used with the Message and Notification components.

## Import

<!--{include:<import-guide>}-->

## Examples

### With Message

<!--{include:`with-message.md`}-->

### With Notification

<!--{include:`with-notification.md`}-->

### Custom Toast

<!--{include:`custom.md`}-->

### Custom Container

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

#### toaster.push

Push a message and return a unique toastId.

```
toaster.push(message: ReactNode, toastProps?: ToastProps): string;
```

##### ToastProps

| Property   | Type`(Default)`                                                                                         | Description                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| container  | HTMLElement \| (() => HTMLElement)                                                                      | Set the container where the message appears                                  |
| duration   | number                                                                                                  | The number of milliseconds to wait before automatically closing the message  |
| mouseReset | boolean `(true)`                                                                                        | Reset the auto-close timer when the mouse enters the message<br/>![][5.65.0] |
| placement  | 'topCenter' \| 'topStart' \| 'topEnd' \| 'bottomCenter' \| 'bottomStart' \| 'bottomEnd' `('topCenter')` | Set the position of the message                                              |

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

[5.65.0]: https://img.shields.io/badge/>=-v5.65.0-blue
