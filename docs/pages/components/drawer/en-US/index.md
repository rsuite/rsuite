# Drawer

A panel that slides out from the edge of the page can replace Modal to present more content.

## Import

<!--{include:<import-guide>}-->

- `Drawer` The container of Drawer.
- `Drawer.Body` The content of Drawer.
- `Drawer.Actions` The action buttons of Drawer, usually placed in the header of Drawer. (optional)
- `Drawer.Header` The header of Drawer, including the close button. (optional)
- `Drawer.Title` The title of Drawer, usually placed in the header of Drawer. (optional)

## Examples

### Basic

<!--{include:`basic.md`}-->

### Backdrop

<!--{include:`backdrop.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Size

<!--{include:`size.md`}-->

### With Form

<!--{include:`form.md`}-->

## Responsive

On mobile devices, the maximum width of the Drawer will fill the entire screen.

<!--{include:<example-responsive>}-->

## Accessibility

### ARIA Attributes

- The `role` attribute of the Drawer component is set to `dialog`.
- Use the `aria-labelledby` attribute to associate with Drawer.Title.
- Use the `aria-describedby` attribute to provide a description for Drawer.Body.

### Keyboard Interaction

- <kbd>ESC</kbd> can close the Drawer. This functionality can be disabled by setting `keyboard=false`.
- <kbd>Tab</kbd> When the Drawer is open, focus automatically moves inside the Drawer. Pressing Tab cycles through focusable elements within the Drawer.
- <kbd>Shift + Tab</kbd> Reverse cycles through focusable elements within the Drawer.
- When the Drawer closes, focus returns to the element that triggered the Drawer to open.

## Props

### `<Drawer>`

| Property          | Type `(Default)`                                          | Description                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as                | ElementType `('div')`                                     | You can use a custom element type for this component                                                                                                                                      |
| autoFocus         | boolean `(true)`                                          | When set to true, the Drawer is opened and is automatically focused on its own, accessible to screen readers                                                                              |
| backdrop          | boolean \| 'static'                                       | When set to true, the Drawer will display the background when it is opened. Clicking on the background will close the Drawer. If you do not want to close the Drawer, set it to 'static'. |
| backdropClassName | string                                                    | Add an optional extra class name to .modal-backdrop It could end up looking like class="modal-backdrop foo-modal-backdrop in".                                                            |
| classPrefix       | string `('drawer')`                                       | The prefix of the component CSS class                                                                                                                                                     |
| closeButton       | ReactNode \| boolean                                      | Custom close button, set to false to hide close button                                                                                                                                    |
| container         | HTMLElement \| (() => HTMLElement)                        | Sets the rendering container                                                                                                                                                              |
| enforceFocus      | boolean `(true)`                                          | When set to true, Drawer will prevent the focus from leaving when opened, making it easier for the secondary screen reader to access                                                      |
| keyboard          | boolean                                                   | close Drawer when press `esc`                                                                                                                                                             |
| onClose           | () => void                                                | Callback fired when Drawer hide                                                                                                                                                           |
| onEnter           | () => void                                                | Callback fired before the Drawer transitions in                                                                                                                                           |
| onEntered         | () => void                                                | Callback fired after the Drawer finishes transitioning in                                                                                                                                 |
| onEntering        | () => void                                                | Callback fired as the Drawer begins to transition in                                                                                                                                      |
| onExit            | () => void                                                | Callback fired right before the Drawer transitions out                                                                                                                                    |
| onExited          | () => void                                                | Callback fired after the Drawer finishes transitioning out                                                                                                                                |
| onExiting         | () => void                                                | Callback fired as the Drawer begins to transition out                                                                                                                                     |
| onOpen            | () => void                                                | Callback fired when Drawer display                                                                                                                                                        |
| open \*           | boolean                                                   | Open Drawer                                                                                                                                                                               |
| placement         | [Placement](#code-ts-placement-code)`(right)`             | The placement of Drawer                                                                                                                                                                   |
| size              | 'xs' \| 'sm' \| 'md' \| lg' \| 'full' \| number \| string | Set Drawer size                                                                                                                                                                           |

### `<Drawer.Header>`

| Property    | Type `(Default)`          | Description                                          |
| ----------- | ------------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`     | You can use a custom element type for this component |
| classPrefix | string `('modal-header')` | The prefix of the component CSS class                |
| closeButton | boolean `(true)`          | When set to true, a close button will be displayed   |
| onClose     | (event) => void           | Callback function when clicking the close button     |
| children    | ReactNode                 | The content of the Header                            |

### `<Drawer.Title>`

| Property    | Type `(Default)`         | Description                                          |
| ----------- | ------------------------ | ---------------------------------------------------- |
| as          | ElementType `('div')`    | You can use a custom element type for this component |
| classPrefix | string `('modal-title')` | The prefix of the component CSS class                |
| children    | ReactNode                | The content of the Title                             |

### `<Drawer.Actions>`

| Property    | Type `(Default)`           | Description                                          |
| ----------- | -------------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`      | You can use a custom element type for this component |
| classPrefix | string `('modal-actions')` | The prefix of the component CSS class                |
| children    | ReactNode                  | The content of the Actions                           |

### `<Drawer.Body>`

| Property    | Type `(Default)`        | Description                                          |
| ----------- | ----------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`   | You can use a custom element type for this component |
| classPrefix | string `('modal-body')` | The prefix of the component CSS class                |
| children    | ReactNode               | The content of the Body                              |

<!--{include:(_common/types/placement4.md)}-->
