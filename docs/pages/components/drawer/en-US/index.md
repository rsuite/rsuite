# Drawer

A floating layer that slides out from the edge of the page can be used instead of Modal to put more content.

## Usage

```js
import { Drawer } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Drawer>`

| Property          | Type `(Default)`                               | Description                                                                                                                                                                               |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFocus         | boolean `(true)`                               | When set to true, the Drawer is opened and is automatically focused on its own, accessible to screen readers                                                                              |
| backdrop          | unions: boolean, 'static'                      | When set to true, the Drawer will display the background when it is opened. Clicking on the background will close the Drawer. If you do not want to close the Drawer, set it to 'static'. |
| backdropClassName | string                                         | Add an optional extra class name to .modal-backdrop It could end up looking like class="modal-backdrop foo-modal-backdrop in".                                                            |
| classPrefix       | string `('drawer')`                            | The prefix of the component CSS class                                                                                                                                                     |
| enforceFocus      | boolean `(true)`                               | When set to true, Drawer will prevent the focus from leaving when opened, making it easier for the secondary screen reader to access                                                      |
| full              | boolean                                        | Full screen                                                                                                                                                                               |
| keyboard          | boolean                                        | close Drawer when press `esc`                                                                                                                                                             |
| onEnter           | () => void                                     | Callback fired before the Drawer transitions in                                                                                                                                           |
| onEntered         | () => void                                     | Callback fired after the Drawer finishes transitioning in                                                                                                                                 |
| onEntering        | () => void                                     | Callback fired as the Drawer begins to transition in                                                                                                                                      |
| onExit            | () => void                                     | Callback fired right before the Drawer transitions out                                                                                                                                    |
| onExited          | () => void                                     | Callback fired after the Drawer finishes transitioning out                                                                                                                                |
| onExiting         | () => void                                     | Callback fired as the Drawer begins to transition out                                                                                                                                     |
| onHide            | () => void                                     | Callback fired when Drawer hide                                                                                                                                                           |
| onShow            | () => void                                     | Callback fired when Drawer display                                                                                                                                                        |
| placement         | enum: 'top','right','bottom', 'left' `(right)` | The placement of Drawer                                                                                                                                                                   |
| show \*           | boolean                                        | Show Drawer                                                                                                                                                                               |
| size              | enum: 'lg', 'md', 'sm', 'xs'                   | Set Drawer size                                                                                                                                                                           |
