# Message

Used to show important tips on a page.

## Import

```js
import { Message, toaster } from 'rsuite';

// or
import Message from 'rsuite/lib/Message';
import toaster from 'rsuite/lib/toaster';
```

## Examples

<!--{demo}-->

## Props & Methods

### `<Message>`

| Property    | Type `(Default)`                            | Description                                                                                                        |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| children    | React.Node                                  | The description information for the message.                                                                       |
| classPrefix | string `('message')`                        | The prefix of the component CSS class.                                                                             |
| closable    | boolean                                     | Whether it is possible to close the message box                                                                    |
| duration    | number `(2000)`                             | Delay automatic removal of messages. When set to 0, the message is not automatically removed. (Unit: milliseconds) |
| full        | boolean                                     | Fill the container                                                                                                 |
| header      | React.Node                                  | The title of the message.                                                                                          |
| onClose     | (event?: React.MouseEvent) => void          | Called after the message is closed                                                                                 |
| showIcon    | boolean                                     | Whether to display an icon.                                                                                        |
| type        | enum: 'info', 'success', 'warning', 'error' | The type of the message box.                                                                                       |

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
