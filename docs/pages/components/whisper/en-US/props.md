### `<Whisper>`

| Property        | Type `(Default)`                                       | Description                                                                                                  |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| container       | HTMLElement &#124; (() => HTMLElement)                 | Sets the rendering container                                                                                 |
| controlId       | string                                                 | Set the `id` on `<Overlay>` and `aria-describedby` on `<Whisper>`                                            |
| defaultOpen     | boolean                                                | Whether to open the overlay by default                                                                       |
| delay           | number                                                 | Delay time (ms) Time                                                                                         |
| delayClose      | number                                                 | Delay close time (ms) Time                                                                                   |
| delayOpen       | number                                                 | Delay open time (ms) Time                                                                                    |
| enterable       | boolean                                                | Whether mouse is allowed to enter the floating layer of popover,when the value of `trigger` is set to`hover` |
| followCursor    | boolean                                                | Whether enable `speaker` to follow the cursor                                                                |
| onBlur          | () => void                                             | Lose Focus callback function                                                                                 |
| onClick         | () => void                                             | Click on the callback function                                                                               |
| onClose         | () => void                                             | Callback fired when close component                                                                          |
| onEnter         | () => void                                             | Callback fired before the overlay transitions in                                                             |
| onEntered       | () => void                                             | Callback fired after the overlay finishes transitioning in                                                   |
| onEntering      | () => void                                             | Callback fired as the overlay begins to transition in                                                        |
| onExit          | () => void                                             | Callback fired right before the overlay transitions out                                                      |
| onExited        | () => void                                             | Callback fired after the overlay finishes transitioning out                                                  |
| onExiting       | () => void                                             | Callback fired as the overlay begins to transition out                                                       |
| onFocus         | () => void                                             | Callback function to get focus                                                                               |
| onOpen          | () => void                                             | Callback fired when open component                                                                           |
| open            | boolean                                                | Whether to open the overlay                                                                                  |
| placement       | [Placement](#code-ts-placement-code) `('right')`       | Dispaly placement                                                                                            |
| preventOverflow | boolean                                                | Prevent floating element overflow                                                                            |
| speaker \*      | Tooltip &#124; Popover &#124; ReactElement             | Displayed component                                                                                          |
| trigger         | [Trigger](#code-ts-trigger-code) `(['hover','focus'])` | Triggering events                                                                                            |

### Whisper methods

Whisper methods are available via `ref` on Whisper component.

```jsx
const whisperRef = useRef();

<Whisper ref={whisperRef} {...}>
  ...
</Whisper>
```

Available methods include

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

- updatePosition

Update overlay position

```ts
updatePosition: () => void
```

### `ts:Trigger`

```ts
type Trigger =
  | Array<'click' | 'contextMenu' | 'hover' | 'focus' | 'active'>
  | 'click'
  | 'contextMenu'
  | 'hover'
  | 'focus'
  | 'active'
  | 'none';
```
