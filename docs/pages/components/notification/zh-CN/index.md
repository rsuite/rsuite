# Notification 通知框

用于全局通知，悬浮在页面角落。

- `Notification.open` 打开一个默认通知。
- `Notification.info` 打开一个信息通知。
- `Notification.success` 打开一个表示成功信息的通知。
- `Notification.warning` 打开一个表示警告信息的通知。
- `Notification.error` 打开一个表示错误信息的通知。
- `Notification.close` 关闭一个通知。
- `Notification.closeAll` 关闭所有通知。

## 获取组件

```js
import { Notification } from 'rsuite';
```

## 演示

<!--{demo}-->

## Methods

### `Notification.open`

```ts
Notification.open(props: NotificationProps);
```

### `Notification.info`

```ts
Notification.info(props: NotificationProps);
```

### `Notification.success`

```ts
Notification.success(props: NotificationProps);
```

### `Notification.warning`

```ts
Notification.warning(props: NotificationProps);
```

### `Notification.error`

```ts
Notification.error(props: NotificationProps);
```

### `Notification.close`

```ts
Notification.close(key?: string);
```

### `Notification.closeAll`

```ts
Notification.closeAll();
```

## Types

```ts
interface NotificationProps {
  title: React.ReactNode;
  description: React.ReactNode;
  duration?: number;
  placement?: string;
  className?: string;
  style?: React.CSSProperties;
  top?: number;
  bottom?: number;
  key?: string;
  onClose?: () => void;
}
```

| 属性名称       | 类型 `(默认值)`                                   | 描述                                                 |
| -------------- | ------------------------------------------------- | ---------------------------------------------------- |
| bottom         | number `(24)`                                     | 消息框距离底部的距离                                 |
| description \* | React.Node                                        | 描述                                                 |
| duration       | number `(4500)`                                   | 消息框持续时间 (单位：毫秒)                          |
| key            | string                                            | 消息框唯一标识，如果要手动移除消息框，必须填写该字段 |
| onClose        | () => void                                        | 关闭回调函数                                         |
| placement      | enum: [NotificationPlacement](#types)`('topEnd')` | 消息框的位置                                         |
| style          | React.CSSProperties                               | 自定义样式                                           |
| title \*       | string                                            | 标题                                                 |
| top            | number `(24)`                                     | 消息框距离顶部的距离                                 |

## 相关组件

- [`<Popover>`](./popover) 弹出框
- [`<Tooltip>`](./tooltip) 文字提示
- [`<Message>`](./message) 消息框
- [`<Alert`>](./alert) 提醒框
