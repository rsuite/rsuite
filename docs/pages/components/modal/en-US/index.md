# Modal

A modal dialog box component for message prompts, acknowledgement messages, and submissions. You can use Drawer if you need to place more content.

Modal box containing the following components:

* `<Modal.Header>`
* `<Modal.Title>`
* `<Modal.Body>`
* `<Modal.Footer>`

## Usage

```js
import { Modal } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Modal>`

| Property             | Type `(Default)`                  | Description                                                                                                                                                                            |
| -------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFocus            | boolean `(true)`                  | When set to true, the Modal is opened and is automatically focused on its own, accessible to screen readers                                                                            |
| backdrop             | unions: boolean, 'static'         | When set to true, the Modal will display the background when it is opened. Clicking on the background will close the Modal. If you do not want to close the Modal, set it to 'static'. |
| backdropClassName    | string                            | Add an optional extra class name to .modal-backdrop It could end up looking like class="modal-backdrop foo-modal-backdrop in".                                                         |
| classPrefix          | string `('modal')`                | The prefix of the component CSS class                                                                                                                                                  |
| dialogClassName      | string                            | CSS class applied to Dialog DOM nodes.                                                                                                                                                 |
| dialogComponentClass | React.ElementType `(ModalDialog)` | You can use a custom element type for Dialog                                                                                                                                           |
| enforceFocus         | boolean `(true)`                  | When set to true, Modal will prevent the focus from leaving when opened, making it easier for the secondary screen reader to access                                                    |
| full                 | boolean                           | Full screen                                                                                                                                                                            |
| keyboard             | boolean `(true)`                  | Close Modal when `esc` key is pressed.                                                                                                                                                 |
| onEnter              | () => void                        | Callback fired before the Modal transitions in                                                                                                                                         |
| onEntered            | () => void                        | Callback fired after the Modal finishes transitioning in                                                                                                                               |
| onEntering           | () => void                        | Callback fired as the Modal begins to transition in                                                                                                                                    |
| onExit               | () => void                        | Callback fired right before the Modal transitions out                                                                                                                                  |
| onExited             | () => void                        | Callback fired after the Modal finishes transitioning out                                                                                                                              |
| onExiting            | () => void                        | Callback fired as the Modal begins to transition out                                                                                                                                   |
| onHide               | () => void                        | Callback fired when Modal hide                                                                                                                                                         |
| onShow               | () => void                        | Callback fired when Modal display                                                                                                                                                      |
| overflow             | boolean `(true)`                  | Automatically sets the height when the body content is too long.                                                                                                                       |
| show \*              | boolean                           | Show Modal                                                                                                                                                                             |
| size                 | enum: 'lg', 'md', 'sm', 'xs'      | Set Modal size                                                                                                                                                                         |

### `<Modal.Header>`

| Property    | Type `(Default)`                           | Description                           |
| ----------- | ------------------------------------------ | ------------------------------------- |
| classPrefix | string `('modal-header')`                  | The prefix of the component CSS class |
| closeButton | boolean `(true)`                           | Display close button                  |
| onHide      | (event: SyntheticEvent&lt;any&gt;) => void | Called when Modal is hidden           |

### `<Modal.Title>`

| Property    | Type `(Default)`         | Description                           |
| ----------- | ------------------------ | ------------------------------------- |
| classPrefix | string `('modal-title')` | The prefix of the component CSS class |

### `<Modal.Footer>`

| Property    | Type `(Default)`          | Description                           |
| ----------- | ------------------------- | ------------------------------------- |
| classPrefix | string `('modal-footer')` | The prefix of the component CSS class |

### `<Modal.Body>`

| Property    | Type `(Default)`        | Description                           |
| ----------- | ----------------------- | ------------------------------------- |
| classPrefix | string `('modal-body')` | The prefix of the component CSS class |
