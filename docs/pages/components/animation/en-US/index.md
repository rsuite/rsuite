# Animation

Handling animation components

- `<Animation.Fade>`
- `<Animation.Collapse>`
- `<Animation.Bounce>`
- `<Animation.Slide>`
- `<Animation.Transition>`

When Transition fails to meet business needs，you can try [react-transition-group](https://github.com/reactjs/react-transition-group)

## Useage

```js
import { Animation } from 'rsuite';

const { Fade, Collapse, Transition } = Animation;
```

## Examples

<!--{demo}-->

## Props

### `<Fade>`

| Property          | Type `(Default)`                     | Description                                                       |
| ----------------- | ------------------------------------ | ----------------------------------------------------------------- |
| enteredClassName  | string                               | Adding a className after the component finished transtioning in   |
| enteringClassName | string                               | Adding a className as the component begins to transition in       |
| exitedClassName   | string                               | Adding a className after the component finishes transitioning out |
| exitingClassName  | string                               | Adding a className as the component begins to transition out      |
| in                | boolean                              | When true The animation will show itself                          |
| onEnter           | (node?: null, Element, Text) => void | Callback fired before the component transitions in                |
| onEntered         | (node?: null, Element, Text) => void | Callback fired after the component finishes transitioning in      |
| onEntering        | (node?: null, Element, Text) => void | Callback fired as the component begins to transition in           |
| onExit            | (node?: null, Element, Text) => void | Callback fired right before the component transitions out         |
| onExited          | (node?: null, Element, Text) => void | Callback fired after the Modal finishes transitioning out         |
| onExiting         | (node?: null, Element, Text) => void | Callback fired as the component begins to transition out          |
| timeout           | number `(300)`                       | Animation transition delay time                                   |
| transitionAppear  | boolean                              | Turn on transitions when initially displayed                      |
| unmountOnExit     | boolean                              | Unmount component on exit                                         |

### `<Collapse>`

| Property          | Type `(Default)`                                   | Description                                                       |
| ----------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| dimension         | union: 'height', 'width' () => ('height', 'width') | Set fold size type                                                |
| enteredClassName  | string `('collapse in')`                           | Adding a className after the component finished transtioning in   |
| enteringClassName | string `('collapsing')`                            | Adding a className as the component begins to transition in       |
| exitedClassName   | string `('collapse')`                              | Adding a className after the component finishes transitioning out |
| exitingClassName  | string `('collapsing')`                            | Adding a className as the component begins to transition out      |
| getDimensionValue | () => number                                       | Custom size value                                                 |
| in                | boolean                                            | When true The animation will show itself                          |
| onEnter           | (node?: null, Element, Text) => void               | Callback fired before the component transitions in                |
| onEntered         | (node?: null, Element, Text) => void               | Callback fired after the component finishes transitioning in      |
| onEntering        | (node?: null, Element, Text) => void               | Callback fired as the component begins to transition in           |
| onExit            | (node?: null, Element, Text) => void               | Callback fired right before the component transitions out         |
| onExited          | (node?: null, Element, Text) => void               | Callback fired after the Modal finishes transitioning out         |
| onExiting         | (node?: null, Element, Text) => void               | Callback fired as the component begins to transition out          |
| role              | string                                             | HTML role                                                         |
| timeout           | number`(300)`                                      | Animation transition delay time                                   |
| transitionAppear  | boolean                                            | Turn on transitions when initially displayed                      |
| unmountOnExit     | boolean                                            | Unmount component on exit                                         |

### `<Bounce>`

| Property          | Type `(Default)`                     | Description                                                       |
| ----------------- | ------------------------------------ | ----------------------------------------------------------------- |
| enteredClassName  | string                               | Adding a className after the component finished transtioning in   |
| enteringClassName | string                               | Adding a className as the component begins to transition in       |
| exitedClassName   | string                               | Adding a className after the component finishes transitioning out |
| exitingClassName  | string                               | Adding a className as the component begins to transition out      |
| in                | boolean                              | When true The animation will show itself                          |
| onEnter           | (node?: null, Element, Text) => void | Callback fired before the component transitions in                |
| onEntered         | (node?: null, Element, Text) => void | Callback fired after the component finishes transitioning in      |
| onEntering        | (node?: null, Element, Text) => void | Callback fired as the component begins to transition in           |
| onExit            | (node?: null, Element, Text) => void | Callback fired right before the component transitions out         |
| onExited          | (node?: null, Element, Text) => void | Callback fired after the Modal finishes transitioning out         |
| onExiting         | (node?: null, Element, Text) => void | Callback fired as the component begins to transition out          |
| timeout           | number `(300)`                       | Animation transition delay time                                   |
| transitionAppear  | boolean                              | Turn on transitions when initially displayed                      |
| unmountOnExit     | boolean                              | Unmount component on exit                                         |

### `<Slide>`

| Property          | Type `(Default)`                      | Description                                                       |
| ----------------- | ------------------------------------- | ----------------------------------------------------------------- |
| enteredClassName  | string                                | Adding a className after the component finished transtioning in   |
| enteringClassName | string                                | Adding a className as the component begins to transition in       |
| exitedClassName   | string                                | Adding a className after the component finishes transitioning out |
| exitingClassName  | string                                | Adding a className as the component begins to transition out      |
| in                | boolean                               | When true The animation will show itself                          |
| onEnter           | (node?: null, Element, Text) => void  | Callback fired before the component transitions in                |
| onEntered         | (node?: null, Element, Text) => void  | Callback fired after the component finishes transitioning in      |
| onEntering        | (node?: null, Element, Text) => void  | Callback fired as the component begins to transition in           |
| onExit            | (node?: null, Element, Text) => void  | Callback fired right before the component transitions out         |
| onExited          | (node?: null, Element, Text) => void  | Callback fired after the Modal finishes transitioning out         |
| onExiting         | (node?: null, Element, Text) => void  | Callback fired as the component begins to transition out          |
| timeout           | number `(300)`                        | Animation transition delay time                                   |
| transitionAppear  | boolean                               | Turn on transitions when initially displayed                      |
| unmountOnExit     | boolean                               | Unmount component on exit                                         |
| placement         | enum: [Placement4](#types)`('right')` | The placement of component                                        |

### `<Transition>`

| Property          | Type `(Default)`                     | Description                                                       |
| ----------------- | ------------------------------------ | ----------------------------------------------------------------- |
| enteredClassName  | string                               | Adding a className after the component finished transtioning in   |
| enteringClassName | string                               | Adding a className as the component begins to transition in       |
| exitedClassName   | string                               | Adding a className after the component finishes transitioning out |
| exitingClassName  | string                               | Adding a className as the component begins to transition out      |
| in                | boolean                              | When true The animation will show itself.                         |
| onEnter           | (node?: null, Element, Text) => void | Callback fired before the component transitions in                |
| onEntered         | (node?: null, Element, Text) => void | Callback fired after the component finishes transitioning in      |
| onEntering        | (node?: null, Element, Text) => void | Callback fired as the component begins to transition in           |
| onExit            | (node?: null, Element, Text) => void | Callback fired right before the component transitions out         |
| onExited          | (node?: null, Element, Text) => void | Callback fired after the Modal finishes transitioning out         |
| onExiting         | (node?: null, Element, Text) => void | Callback fired as the component begins to transition out          |
| timeout           | number`(1000)`                       | Animation transition delay time                                   |
| transitionAppear  | boolean                              | Turn on transitions when initially displayed                      |
| unmountOnExit     | boolean                              | Unmount component on exit                                         |
