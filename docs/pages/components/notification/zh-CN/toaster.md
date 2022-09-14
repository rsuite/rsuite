### useToaster

useToaster 是一个用于创建和管理 Toast 的 React Hook。

```ts
import { useToaster } from 'rsuite';

return () => {
  const toaster = useToaster();

  ...
};
```

#### toaster.push

推送一个消息，并返回一个唯一的 key

```ts
type PlacementType = 'topCenter' | 'bottomCenter' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';

interface ToastContainerProps{
  /** The placement of the message box */
  placement?: PlacementType;

  /** Set the message to appear in the specified container */
  container?: HTMLElement | (() => HTMLElement);
}

toaster.push(message: ReactNode, options?: ToastContainerProps): string;
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

通过 key 删除一个消息

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

删除所有消息

```ts
toaster.clear(): void;
```
