### `<Whisper>`

```ts
type Trigger =
  | Array<'click' | 'hover' | 'focus' | 'active'>
  | 'click'
  | 'hover'
  | 'focus'
  | 'active'
  | 'none';
```

| Property        | Type `(Default)`                          | Description                                                                                                  |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| container       | HTMLElement &#124; (() => HTMLElement)    | Sets the rendering container                                                                                 |
| controlId       | string                                    | Set the `id` on `<Overlay>` and `aria-describedby` on `<Whisper>`                                            |
| delay           | number                                    | Delay time (ms) Time                                                                                         |
| delayClose      | number                                    | Delay close time (ms) Time                                                                                   |
| delayOpen       | number                                    | Delay open time (ms) Time                                                                                    |
| enterable       | boolean                                   | Whether mouse is allowed to enter the floating layer of popover,when the value of `trigger` is set to`hover` |
| full            | boolean                                   | The content full the container                                                                               |
| onBlur          | () => void                                | Lose Focus callback function                                                                                 |
| onClick         | () => void                                | Click on the callback function                                                                               |
| onClose         | () => void                                | Callback fired when close component                                                                          |
| onEnter         | () => void                                | Callback fired before the overlay transitions in                                                             |
| onEntered       | () => void                                | Callback fired after the overlay finishes transitioning in                                                   |
| onEntering      | () => void                                | Callback fired as the overlay begins to transition in                                                        |
| onExit          | () => void                                | Callback fired right before the overlay transitions out                                                      |
| onExited        | () => void                                | Callback fired after the overlay finishes transitioning out                                                  |
| onExiting       | () => void                                | Callback fired as the overlay begins to transition out                                                       |
| onFocus         | () => void                                | Callback function to get focus                                                                               |
| onOpen          | () => void                                | Callback fired when open component                                                                           |
| placement       | Placement `('right')`                     | Dispaly placement                                                                                            |
| preventOverflow | boolean                                   | Prevent floating element overflow                                                                            |
| speaker \*      | Tooltip &#124;Popover &#124; ReactElement | Displayed component                                                                                          |
| trigger         | Trigger `(['hover','focus'])`             | Triggering events                                                                                            |

### Whisper methods

- open

Open a overlay.

```ts
open: (delay?: number) => void
```

- close

Close a overlay.

```ts
close: (delay?: number) => void
```

Update overlay position

- updatePosition

```ts
updatePosition: () => void
```
