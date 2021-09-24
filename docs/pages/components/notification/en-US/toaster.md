### `toaster`

#### toaster.push

Push a message and return a unique key.

```ts
type PlacementType = 'topCenter' | 'bottomCenter' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';

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
// Message
toaster.push(<Message>message</Message>);

// Notification
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
