# Splitter

Resizable panels for workspaces, master-detail views, and data-heavy dashboards.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

Drag the handle or focus it and use the arrow keys to resize the adjacent panels.

<!--{include:`basic.md`}-->

### Vertical

Set a height on a vertical splitter so its panels have available space to share.

<!--{include:`vertical.md`}-->

### Controlled Sizes

Keep sizes in application state with `sizes` and `onResize`. `onResizeEnd` runs on pointer release, `pointercancel`, loss of pointer capture, and after each keyboard resize step. An external size, orientation, constraint, or disabled-state change, a resize key taking over, or unmounting discards an active pointer gesture without its end callback. A keyboard resize has its own start and end callbacks when it changes the sizes.

<!--{include:`controlled.md`}-->

### Multiple Panels

Each handle resizes its two adjacent panels. Other panels keep their percentages.

<!--{include:`workspace.md`}-->

### Nested Splitters

<!--{include:`nested.md`}-->

## Accessibility

Resize handles are focusable `separator` elements. Each handle controls the preceding panel in child order and uses that panel's `aria-label` or `aria-labelledby` as its accessible name. Supply an accessible name for every panel. The separator's `aria-orientation` describes the handle, so it is vertical in a horizontal layout.

| Key           | Action                                                           |
| ------------- | ---------------------------------------------------------------- |
| Left / Right  | Move a handle left / right in a horizontal layout, including RTL |
| Up / Down     | Move a handle up / down in a vertical layout                     |
| Shift + Arrow | Resize by ten times `keyboardStep`                               |
| Home / End    | Set the primary panel to its minimum / maximum allowed size      |

`disabled` removes all handles from the tab order. `resizable={false}` disables both handles adjacent to a panel. A handle with no available resize range is also disabled. Use `CustomProvider rtl` or `dir="rtl"` for right-to-left layouts; server and client providers must use the same RTL setting when rendering on the server.

## Sizing

All size values are percentages of the space available to panels, excluding handles, gaps, and root padding. Pixel or CSS-unit sizes are not supported. Percentages are included in server markup and do not require container measurements.

At 0%, a panel's content stays mounted but is hidden from the focus order and accessibility tree. Its resize handle remains available to restore the panel, and the content's state is preserved.

Only direct `Splitter.Panel` children are supported; wrap content inside a panel rather than wrapping the panel itself in another component or a fragment. Sizes follow child order. Changing the panel count resets an uncontrolled layout to equal shares fitted to its constraints. In controlled mode, update `sizes` to match the new panel count.

`defaultSizes` are normalized to 100 and fitted to panel constraints on the initial render. Controlled `sizes` must contain one finite, nonnegative value per panel, add up to 100, and satisfy every panel's constraints. Each `minSize` / `maxSize` must be between 0 and 100, with the minimum no greater than the maximum; the combined minima must not exceed 100 and the combined maxima must be at least 100. Invalid layouts emit a development warning and disable resizing. Changing constraints never redistributes existing panel sizes automatically.

## Props

### `<Splitter>`

| Property      | Type (default)                                        | Description                                                        |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| defaultSizes  | number[]                                              | Initial percentages; defaults to equal shares                      |
| disabled      | boolean `(false)`                                     | Disable all resize handles                                         |
| keyboardStep  | number `(1)`                                          | Percentage points per arrow-key resize; Shift multiplies it by ten |
| onResize      | (sizes: number[], event: SplitterResizeEvent) => void | Called with the next percentages while resizing                    |
| onResizeEnd   | (sizes: number[], event: SplitterResizeEvent) => void | Called after a pointer gesture or keyboard step finishes           |
| onResizeStart | (sizes: number[], event: SplitterResizeEvent) => void | Called before a pointer gesture or keyboard step                   |
| orientation   | 'horizontal' \| 'vertical' `('horizontal')`           | Layout direction of the panels                                     |
| sizes         | number[]                                              | Controlled panel percentages                                       |

### `<Splitter.Panel>`

| Property        | Type (default)   | Description                                                           |
| --------------- | ---------------- | --------------------------------------------------------------------- |
| aria-label      | string           | Accessible name for the panel and its following resize handle         |
| aria-labelledby | string           | Id of the visible label for the panel and its following resize handle |
| id              | string           | Panel id; generated when omitted                                      |
| maxSize         | number `(100)`   | Maximum percentage of available panel space                           |
| minSize         | number `(0)`     | Minimum percentage of available panel space                           |
| resizable       | boolean `(true)` | Enable resizing from adjacent handles                                 |

Both components support [Box style props](/guide/style-props), `as`, `className`, `classPrefix`, and `style`. Panel style props, `style`, `showFrom`, and `hideFrom` apply to an inner content container, so padding and borders do not increase its allocated size, including at 0%. The panel ref, id, classes, DOM attributes, and ARIA properties belong to the outer layout frame. Splitter manages the frame's sizing; do not override its flex styles or add padding, borders, or margins to frames or handles. To style panel content through a class, target `.rs-splitter-panel-content`. Use root `gap` to add space around the handles.
