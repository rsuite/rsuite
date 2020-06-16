# Notification

For global notifications, suspended in the corner of the page.

- `Notification.open` Open a default notification.
- `Notification.info` Open a info notification.
- `Notification.success` Open a notification that means success information.
- `Notification.warning` Open a notification that means warning information.
- `Notification.error` Open a notification that means error information.
- `Notification.close` Close a notification.
- `Notification.closeAll` Close all notifications.

## Usage

```js
import { Notification } from 'rsuite';
```

## Examples

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

| Property       | Type `(Default)`                                  | Description                                                                                                             |
| -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| bottom         | number `(24)`                                     | The distance from the bottom of the message box                                                                         |
| description \* | React.Node                                        | The description of the message box                                                                                      |
| duration       | number `(4500)`                                   | message box duration (Unit: milliseconds)                                                                               |
| key            | string                                            | The message box is uniquely identified, and you must fill out the field if you want to manually remove the message box. |
| onClose        | () => void                                        | Closes the callback function.                                                                                           |
| placement      | enum: [NotificationPlacement](#types)`('topEnd')` | The placement of the message box.                                                                                       |
| title \*       | string                                            | The title of the message box                                                                                            |
| top            | number `(24)`                                     | The distance from the top of the message box                                                                            |

## Related components

- [`<Popover>`](./popover)
- [`<Tooltip>`](./tooltip)
- [`<Message>`](./message)
- [`<Alert`>](./alert)
