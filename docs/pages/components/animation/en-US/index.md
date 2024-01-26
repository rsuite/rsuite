# Animation

`Animation` component is a set of animation components. You can achieve animation effects by configuring related properties.

## Import

<!--{include:<import-guide>}-->

- `<Animation.Fade>`
- `<Animation.Collapse>`
- `<Animation.Bounce>`
- `<Animation.Slide>`
- `<Animation.Transition>`

## Examples

### Fade

<!--{include:`fade.md`}-->

### Collapse

<!--{include:`collapse.md`}-->

### Bounce

<!--{include:`bounce.md`}-->

### Slide

<!--{include:`slide.md`}-->

### Transition

Configure the following className in Transition and customize the related css animation.

```
exitedClassName="custom-exited"
exitingClassName="custom-exiting"
enteredClassName="custom-entered"
enteringClassName="custom-entering"
```

<!--{include:`transition.md`}-->

## Props

<!--{include:(_common/types/placement4.md)}-->

### `<Animation.Fade>`

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

### `<Animation.Collapse>`

| Property          | Type `(Default)`                                         | Description                                                       |
| ----------------- | -------------------------------------------------------- | ----------------------------------------------------------------- |
| dimension         | 'height'&#124;'width'&#124;() => ('height'&#124;'width') | Set fold size type                                                |
| enteredClassName  | string `('collapse in')`                                 | Adding a className after the component finished transtioning in   |
| enteringClassName | string `('collapsing')`                                  | Adding a className as the component begins to transition in       |
| exitedClassName   | string `('collapse')`                                    | Adding a className after the component finishes transitioning out |
| exitingClassName  | string `('collapsing')`                                  | Adding a className as the component begins to transition out      |
| getDimensionValue | () => number                                             | Custom size value                                                 |
| in                | boolean                                                  | When true The animation will show itself                          |
| onEnter           | (node?: null, Element, Text) => void                     | Callback fired before the component transitions in                |
| onEntered         | (node?: null, Element, Text) => void                     | Callback fired after the component finishes transitioning in      |
| onEntering        | (node?: null, Element, Text) => void                     | Callback fired as the component begins to transition in           |
| onExit            | (node?: null, Element, Text) => void                     | Callback fired right before the component transitions out         |
| onExited          | (node?: null, Element, Text) => void                     | Callback fired after the Modal finishes transitioning out         |
| onExiting         | (node?: null, Element, Text) => void                     | Callback fired as the component begins to transition out          |
| role              | string                                                   | HTML role                                                         |
| timeout           | number`(300)`                                            | Animation transition delay time                                   |
| transitionAppear  | boolean                                                  | Turn on transitions when initially displayed                      |
| unmountOnExit     | boolean                                                  | Unmount component on exit                                         |

### `<Animation.Bounce>`

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

### `<Animation.Slide>`

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
| placement         | Placement `('right')`                | The placement of component                                        |

### `<Animation.Transition>`

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
