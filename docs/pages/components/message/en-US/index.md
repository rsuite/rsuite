# Message

Used to show important tips on a page.

* `<Message>`

## Usage

```js
import { Message } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Message>`

| Property    | Type `(Default)`                                       | Description                                     |
| ----------- | ------------------------------------------------------ | ----------------------------------------------- |
| classPrefix | string                                                 | The prefix of the component CSS class.          |
| closable    | boolean                                                | Whether it is possible to close the message box |
| closeLabel  | string `('Close')`                                     | Closes the prompt text on the button.           |
| description | React.Node                                             | The description information for the message.    |
| full        | boolean                                                | Fill the container                              |
| onClose     | () => void                                             | Called after the message is closed              |
| showIcon    | boolean                                                | Whether to display an icon.                     |
| title       | React.Node                                             | The title of the message.                       |
| type        | enum: 'info', 'success', 'warning', 'error' `('info')` | The type of the message box.                    |



## Related components

* [`<Popover>`](./popover)
* [`<Tooltip>`](./tooltip)
* [`<Alert`>](./alert)
* [`<Notification>`](./notification)
