### useToaster

useToaster is a React Hook for creating and managing Toasts.

```ts
import { useToaster } from 'rsuite';

return () => {
  const toaster = useToaster();

  ...
};
```

#### toaster.push

Push a message and return a unique key.

```ts
type PlacementType = 'topCenter' | 'bottomCenter' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';

interface ToastContainerProps{
  /** The placement of the message box */
  placement?: PlacementType;

  /** Set the message to appear in the specified container */
  container?: HTMLElement | (() => HTMLElement);

  /** The number of milliseconds to wait before automatically closing a message */
  duration?: number;
}

toaster.push(message: ReactNode, options?: ToastContainerProps): string;
```

e.g:

```js
// Push a message
toaster.push(<Message>message</Message>);

// Push a message and set the duration
toaster.push(<Message>message</Message>, {
  duration: 1000
});

// Push notification and set placement
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
