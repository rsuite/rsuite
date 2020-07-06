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

| Property        | Type `(Default)`                                                         | Description                                                 |
| --------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| container       | HTMLElement or (() => HTMLElement)                                       | Sets the rendering container                                |
| delay           | number                                                                   | Delay Time                                                  |
| delayHide       | number                                                                   | Hidden delay Time                                           |
| delayShow       | number                                                                   | Show Delay Time                                             |
| onBlur          | () => void                                                               | Lose Focus callback function                                |
| onClick         | () => void                                                               | Click on the callback function                              |
| onEnter         | () => void                                                               | Callback fired before the overlay transitions in            |
| onEntered       | () => void                                                               | Callback fired after the overlay finishes transitioning in  |
| onEntering      | () => void                                                               | Callback fired as the overlay begins to transition in       |
| onExit          | () => void                                                               | Callback fired right before the overlay transitions out     |
| onExited        | () => void                                                               | Callback fired after the overlay finishes transitioning out |
| onExiting       | () => void                                                               | Callback fired as the overlay begins to transition out      |
| onFocus         | () => void                                                               | Callback function to get focus                              |
| onMouseOut      | () => void                                                               | Mouse leave callback function                               |
| placement       | enum: [PlacementAll](#types) `('right')`                                 | Dispaly placement                                           |
| preventOverflow | boolean                                                                  | Prevent floating element overflow                           |
| speaker \*      | union: Tooltip, Popover                                                  | Displayed component                                         |
| trigger         | union: 'click', 'hover', 'focus', 'active', 'none' `(['hover','focus'])` | Triggering events                                           |

### Whisper methods

- open

Display a Tooltip.

```ts
open: (delay?: number) => void
```

- close

Hide a Tooltip.

```ts
close: (delay?: number) => void
```

## Related components

- [`<Popover>`](./popover)
- [`<Message>`](./message)
- [`<Alert`>](./alert)
- [`<Notification>`](./notification)
