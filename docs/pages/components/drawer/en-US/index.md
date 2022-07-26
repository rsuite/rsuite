# Drawer

A panel that slides out from the edge of the page can replace Modal to present more content.

## Import

<!--{include:(components/drawer/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Backdrop

<!--{include:`backdrop.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Size

<!--{include:`size.md`}-->

## Props

### `<Drawer>`

| Property          | Type `(Default)`                                       | Description                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFocus         | boolean `(true)`                                       | When set to true, the Drawer is opened and is automatically focused on its own, accessible to screen readers                                                                              |
| backdrop          | boolean &#124; 'static'                                | When set to true, the Drawer will display the background when it is opened. Clicking on the background will close the Drawer. If you do not want to close the Drawer, set it to 'static'. |
| backdropClassName | string                                                 | Add an optional extra class name to .modal-backdrop It could end up looking like class="modal-backdrop foo-modal-backdrop in".                                                            |
| classPrefix       | string `('drawer')`                                    | The prefix of the component CSS class                                                                                                                                                     |
| enforceFocus      | boolean `(true)`                                       | When set to true, Drawer will prevent the focus from leaving when opened, making it easier for the secondary screen reader to access                                                      |
| ~~full~~          | boolean                                                | Deprecated. Use size="full" instead. Full screen                                                                                                                                          |
| keyboard          | boolean                                                | close Drawer when press `esc`                                                                                                                                                             |
| onEnter           | () => void                                             | Callback fired before the Drawer transitions in                                                                                                                                           |
| onEntered         | () => void                                             | Callback fired after the Drawer finishes transitioning in                                                                                                                                 |
| onEntering        | () => void                                             | Callback fired as the Drawer begins to transition in                                                                                                                                      |
| onExit            | () => void                                             | Callback fired right before the Drawer transitions out                                                                                                                                    |
| onExited          | () => void                                             | Callback fired after the Drawer finishes transitioning out                                                                                                                                |
| onExiting         | () => void                                             | Callback fired as the Drawer begins to transition out                                                                                                                                     |
| onClose           | () => void                                             | Callback fired when Drawer hide                                                                                                                                                           |
| onOpen            | () => void                                             | Callback fired when Drawer display                                                                                                                                                        |
| placement         | [Placement](#code-ts-placement-code)`(right)`          | The placement of Drawer                                                                                                                                                                   |
| open \*           | boolean                                                | Open Drawer                                                                                                                                                                               |
| size              | 'full' &#124; 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' | Set Drawer size                                                                                                                                                                           |

<!--{include:(_common/types/placement4.md)}-->
