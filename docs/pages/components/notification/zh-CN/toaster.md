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
  /** 消息框的位置 */
  placement?: PlacementType;

  /** 设置消息出现在指定的容器中 */
  container?: HTMLElement | (() => HTMLElement);

  /** 自动关闭消息前等待的毫秒数 */
  duration?: number;
}

toaster.push(message: ReactNode, options?: ToastContainerProps): string;
```

e.g:

```js
// 弹出一个消息
toaster.push(<Message>message</Message>);

// 弹出一个消息，并设置自动关闭的时间
toaster.push(<Message>message</Message>, {
  duration: 1000
});

// 弹出一个通知, 并设置位置
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
