# Notification 通知框

用于系统通知。 通常用于推送消息。

## 获取组件

```js
import { Notification, toaster } from 'rsuite';

// or
import Notification from 'rsuite/lib/Notification';
import toaster from 'rsuite/lib/toaster';
```

## 演示

<!--{demo}-->

## Props & Methods

### `<Notification>`

| Property    | Type `(Default)`                                       | Description                                                    |
| ----------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| children \* | React.Node                                             | 通知的内容                                                     |
| closable    | boolean                                                | 是否显示关闭按钮                                               |
| duration    | number `(4500)`                                        | 延迟自动关闭通知 .当设为 0 时候，则不自动关闭通知 (单位: 毫秒) |
| header \*   | string                                                 | 通知的标题                                                     |
| onClose     | () => void                                             | 通知被移除后的回调函数                                         |
| placement   | enum: [NotificationPlacement](#types)`('topCenter')`   | 通知出现的位置                                                 |
| type        | enum: 'info', 'success', 'warning', 'error' `('info')` | 通知类型                                                       |

### toaster

#### toaster.push

推送一个消息，并返回一个唯一的 key

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
