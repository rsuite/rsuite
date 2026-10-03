# Animation

`Animation` component is a set of animation components. You can achieve animation effects by configuring related properties.

## Import

<!--{include:<import-guide>}-->

- `Animation.Fade` Fade animation.
- `Animation.Collapse` Collapse animation.
- `Animation.Bounce` Bounce animation.
- `Animation.Slide` Slide animation.
- `Animation.Transition` Custom animation.

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

### Reduced motion

`Animation.Fade`, `Animation.Collapse`, `Animation.Bounce`, `Animation.Slide` and `Animation.Transition` respect the system's `prefers-reduced-motion` setting by default. Set `reduceMotion` to `true` to disable motion, or `false` to allow it explicitly, including when the system requests reduced motion.

```jsx
<Animation.Fade in><div>Use the system preference.</div></Animation.Fade>
<Animation.Bounce in reduceMotion><div>Reduce motion.</div></Animation.Bounce>
<Animation.Slide in reduceMotion={false}><div>Allow motion.</div></Animation.Slide>
```

The component setting takes precedence over `CustomProvider reduceMotion`, which takes precedence over the system preference. Component defaults configured through `CustomProvider components` follow the existing default-prop merge rules.

Reduced transitions still call `onEnter`, `onEntering`, `onEntered`, and the corresponding exit callbacks in order, without waiting for CSS completion events or `timeout`. Enabling reduced motion during a transition completes the current request. Restoring motion affects the next enter or exit; it does not replay a completed animation.

This policy removes CSS transition durations and reduces CSS animations to one zero-duration, zero-delay iteration on the animated node only. Keyframes, animation direction and fill mode still determine its final styles, including for custom looping animations. Nested content and unrelated animations are unaffected. Render-function children must forward the provided props and ref to that node. Server-rendered automatic transitions use the system preference through CSS before hydration.

## Props

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
| reduceMotion      | boolean                              | Reduce motion; omitted uses the provider or system preference      |
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
| reduceMotion      | boolean                              | Reduce motion; omitted uses the provider or system preference      |
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
| reduceMotion      | boolean                              | Reduce motion; omitted uses the provider or system preference      |
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
| reduceMotion      | boolean                              | Reduce motion; omitted uses the provider or system preference      |
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
| reduceMotion      | boolean                              | Reduce motion; omitted uses the provider or system preference      |
| timeout           | number`(1000)`                       | Animation transition delay time                                   |
| transitionAppear  | boolean                              | Turn on transitions when initially displayed                      |
| unmountOnExit     | boolean                              | Unmount component on exit                                         |

<!--{include:(_common/types/placement4.md)}-->
