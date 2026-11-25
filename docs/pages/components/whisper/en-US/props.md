### `<Whisper>`

| Property        | Type `(Default)`                                       | Description                                                                                                  |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| container       | HTMLElement \| (() => HTMLElement)                     | Sets the rendering container                                                                                 |
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
| speaker \*      | Tooltip \| Popover \| ReactElement                     | Displayed component                                                                                          |
| trigger         | [Trigger](#code-ts-trigger-code) `(['hover','focus'])` | Triggering events                                                                                            |

### Whisper Methods

Whisper provides several methods available via `ref` to programmatically control the overlay display and positioning. These methods are useful when you need to manually trigger overlay actions, such as:

- Showing/hiding tooltips based on business logic
- Updating overlay position after content changes
- Creating custom interaction logic

Get the component instance using `ref`:

```jsx
const whisperRef = useRef();

<Whisper ref={whisperRef} {...}>
  <Button>Hover me</Button>
</Whisper>
```

| Method         | Type Definition            | Description                                                         |
| -------------- | -------------------------- | ------------------------------------------------------------------- |
| open           | `(delay?: number) => void` | Manually open the overlay with an optional `delay` in milliseconds  |
| close          | `(delay?: number) => void` | Manually close the overlay with an optional `delay` in milliseconds |
| updatePosition | `() => void`               | Manually update the overlay position when content changes           |

```jsx
// Open overlay on button click
<Button onClick={() => whisperRef.current?.open()}>Show Tooltip</Button>;

// Show overlay after data is loaded
useEffect(() => {
  if (dataLoaded) {
    whisperRef.current?.open(300); // Show after 300ms
  }
}, [dataLoaded]);

// Update overlay position when content changes
const handleResize = useCallback(() => {
  whisperRef.current?.updatePosition();
}, []);
```

### Type definitions

#### `ts:Trigger`

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
