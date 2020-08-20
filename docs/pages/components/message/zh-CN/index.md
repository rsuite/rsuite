# Message 消息框

用于页面中展示重要的提示信息。

## 获取组件

```js
import { Message, toaster } from 'rsuite';

// or
import Message from 'rsuite/lib/Message';
import toaster from 'rsuite/lib/toaster';
```

## 演示

<!--{demo}-->

## Props & Methods

### `<Message>`

| 属性名称    | 类型 `(默认值)`                                        | 描述                                                           |
| ----------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| children    | React.Node                                             | 消息描述信息                                                   |
| classPrefix | string `('message')`                                   | 组件 CSS 类的前缀                                              |
| closable    | boolean                                                | 可以关闭消息框                                                 |
| duration    | number `(2000)`                                        | 延迟自动关闭通知 .当设为 0 时候，则不自动关闭通知 (单位: 毫秒) |
| full        | boolean                                                | 撑满容器                                                       |
| header      | React.Node                                             | 消息标题                                                       |
| onClose     | (event?: React.MouseEvent) => void                     | 消息关闭后调用                                                 |
| showIcon    | boolean                                                | 显示图标                                                       |
| type        | enum: 'info', 'success', 'warning', 'error' `('info')` | 消息框类型                                                     |

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
