# Notification

Used for system notifications. Generally used to push messages.

## Import

```js
import { Notification, toaster } from 'rsuite';

// or
import Notification from 'rsuite/lib/Notification';
import toaster from 'rsuite/lib/toaster';
```

## Examples

<!--{demo}-->

## Props & Methods

### `<Notification>`

| Property    | Type `(Default)`                                     | Description                                                                                                        |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| children \* | React.Node                                           | The description of the message box                                                                                 |
| closable    | boolean                                              | The remove button is displayed.                                                                                    |
| duration    | number `(4500)`                                      | Delay automatic removal of messages. When set to 0, the message is not automatically removed. (Unit: milliseconds) |
| header \*   | string                                               | The title of the message box                                                                                       |
| onClose     | () => void                                           | Callback after the message is removed                                                                              |
| placement   | enum: [NotificationPlacement](#types)`('topCenter')` | The placement of the message box.                                                                                  |
| type        | enum: 'info', 'success', 'warning', 'error'          | The type of the message box.                                                                                       |

### `toaster`

#### toaster.push

Push a message and return a unique key.

```ts

interface ToastContainerProps{
  /** The placement of the message box */
  placement?: PlacementType;

  /** Set the message to appear in the specified container */
  container?: HTMLElement | (() => HTMLElement);
}

toaster.push(message: React.ReactNode, options?: ToastContainerProps): string;
```

e.g:

```js
toaster.push(<Notification>message</Notification>, {
  placement: 'topEnd'
});
```

#### toaster.remove

Remove a message by key

```ts
toaster.remove(key: string): void;
```

e.g:

```js
const key = toaster.push(<Notification>message</Notification>, {
  placement: 'topEnd'
});

toaster.remove(key);
```

#### toaster.clear

Clear all messages

```ts
toaster.clear(): void;
```
