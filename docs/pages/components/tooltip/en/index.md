# Tooltip

A text tip for secondary, which replaces the default title property of an HTML element.

- `<Tooltip>` Text tip.
- `<Whisper>` Monitor triggers, wrap the outside of the listener object, and notify the `Tooltip` when the event is triggered.

## Usage

```js
import { Tooltip, Whisper } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Tooltip>`

| Property    | Type `(Default)`     | Description                           |
| ----------- | -------------------- | ------------------------------------- |
| children \* | React.Node           | The content of the component.         |
| classPrefix | string `('tooltip')` | The prefix of the component CSS class |
| visible     | boolean              | The component is visible by default   |

### `<Whisper>`

| Property        | Type `(Default)`                                                 | Description                       |
| --------------- | ---------------------------------------------------------------- | --------------------------------- |
| container       | HTMLElement or (() => HTMLElement)                               | Sets the rendering container      |
| delay           | number                                                           | Delay Time                        |
| delayHide       | number                                                           | Hidden delay Time                 |
| delayShow       | number                                                           | Show Delay Time                   |
| onBlur          | () => void                                                       | Lose Focus callback function      |
| onClick         | () => void                                                       | Click on the callback function    |
| onFocus         | () => void                                                       | Callback function to get focus    |
| onMouseOut      | () => void                                                       | Mouse leave callback function     |
| placement       | enum: [PlacementAll](#types) `('right')`                         | Dispaly placement                 |
| preventOverflow | boolean                                                          | Prevent floating element overflow |
| speaker \*      | union: Tooltip, Popover                                          | Displayed component               |
| trigger         | union: 'click', 'hover', 'focus', 'active' `(['hover','focus'])` | Triggering events                 |

## Related components

- [`<Popover>`](./popover)
- [`<Message>`](./message)
- [`<Alert`>](./alert)
- [`<Notification>`](./notification)
