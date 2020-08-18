# Message

Used to show important tips on a page.

- `<Message>`

## Usage

```js
import { Message } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props & Methods

### `<Message>`

| Property    | Type `(Default)`                            | Description                                     |
| ----------- | ------------------------------------------- | ----------------------------------------------- |
| children    | React.Node                                  | The description information for the message.    |
| classPrefix | string `('message')`                        | The prefix of the component CSS class.          |
| closable    | boolean                                     | Whether it is possible to close the message box |
| full        | boolean                                     | Fill the container                              |
| header      | React.Node                                  | The title of the message.                       |
| onClose     | (event?: React.MouseEvent) => void          | Called after the message is closed              |
| showIcon    | boolean                                     | Whether to display an icon.                     |
| type        | enum: 'info', 'success', 'warning', 'error' | The type of the message box.                    |

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
