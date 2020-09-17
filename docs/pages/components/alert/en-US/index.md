# Alert

The global prompt information used after the interaction in the page is suspended in the middle of the top of the page.

- `Alert.info` Information reminder.
- `Alert.success` Success information reminder.
- `Alert.warning` Warning message.
- `Alert.error` Error message.
- `Alert.close` Close the message.
- `Alert.closeAll` Close all messages.

## Usage

```js
import { Alert } from 'rsuite';
```

## Examples

<!--{demo}-->

## Methods

### `Alert.info`

```
Alert.info(content: string, duration?: number, onClose?: () => void);
```

### `Alert.success`

```
Alert.success(content: string, duration?: number, onClose?: () => void);
```

### `Alert.warning`

```
Alert.warning(content: string, duration?: number, onClose?: () => void);
```

### `Alert.error`

```
Alert.error(content: string, duration?: number, onClose?: () => void);
```

**props description**

| Property   | Type`(Default)` | Description                                                                                               |
| ---------- | --------------- | --------------------------------------------------------------------------------------------------------- |
| content \* | string          | The content of alert                                                                                      |
| duration   | number `(2000)` | The duration of the display, automatically closes the reminder box after the duration (unit:milliseconds) |
| onClose    | () => void      | Callback when Alert is closed                                                                             |

### `Alert.close`

```ts
Alert.close();
```

### `Alert.closeAll`

```ts
Alert.closeAll();
```

### `Alert.config`

Global config

```js
Alert.config(
  (options: {
    top?: number,
    duration?: number,
    getContainer?: () => HTMLElement
  })
);
```

- top - Distance from the top of the page (unit:px, default:5)
- duration - Alert duration (default:2000，unit: milliseconds)
- getContainer - The parent container of Alert

## Related components

- [`<Popover>`](./popover)
- [`<Tooltip>`](./tooltip)
- [`<Message>`](./message)
- [`<Notification>`](./notification)
