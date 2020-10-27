# Modal

A modal dialog box component for message prompts, acknowledgement messages, and submissions. You can use Drawer if you need to place more content.

Modal box containing the following components:

- `<Modal.Header>`
- `<Modal.Title>`
- `<Modal.Body>`
- `<Modal.Footer>`

## Import

<!--{include:(components/modal/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Backdrop

When set to true, the Modal will display the background when it is opened. Clicking on the background will close the Modal. If you do not want to close the Modal, set it to 'static'.

<!--{include:`backdrop.md`}-->

### Size

<!--{include:`size.md`}-->

### Full

<!--{include:`full.md`}-->

### Overflow

<!--{include:`overflow.md`}-->

### Dynamic

<!--{include:`dynamic.md`}-->

### Confirm

<!--{include:`confirm.md`}-->

## Accessibility

### Keyboard Interaction

- <kbd>ESC</kbd> closes `Modal` unless `keyboard` is set to `false`.

### WAI-ARIA Roles, States, and Properties

- Modal has role `dialog`.
- Modal has `aria-modal` set to `true`. Tells assistive technologies that the windows underneath the current dialog are not available for interaction (inert).
- Be sure to add `aria-labelledby`, referencing the modal title, to the Modal. Additionally, you may give a description of your modal with the `aria-describedby` prop on the Modal.

```js
<Modal aria-labelledby="modal-title" aria-describedby="modal-description">
  <Modal.Header>
    <Modal.Title id="modal-title">My Title</Modal.Title>
  </Modal.Header>
  <Modal.Body id="modal-description">My Description</Modal.Body>
</Modal>
```

## Props

### `<Modal>`

| Property          | Type `(Default)`                                  | Description                                                                                                                                                                            |
| ----------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFocus         | boolean `(true)`                                  | When set to true, the Modal is opened and is automatically focused on its own, accessible to screen readers                                                                            |
| backdrop          | unions: boolean, 'static'                         | When set to true, the Modal will display the background when it is opened. Clicking on the background will close the Modal. If you do not want to close the Modal, set it to 'static'. |
| backdropClassName | string                                            | Add an optional extra class name to .modal-backdrop It could end up looking like class="modal-backdrop foo-modal-backdrop in".                                                         |
| classPrefix       | string `('modal')`                                | The prefix of the component CSS class                                                                                                                                                  |
| dialogAs          | ElementType `(ModalDialog)`                       | You can use a custom element type for Dialog                                                                                                                                           |
| dialogClassName   | string                                            | CSS class applied to Dialog DOM nodes.                                                                                                                                                 |
| enforceFocus      | boolean `(true)`                                  | When set to true, Modal will prevent the focus from leaving when opened, making it easier for the secondary screen reader to access                                                    |
| full              | boolean                                           | Full screen                                                                                                                                                                            |
| keyboard          | boolean `(true)`                                  | Close Modal when `esc` key is pressed.                                                                                                                                                 |
| onClose           | () => void                                        | Callback fired when Modal hide                                                                                                                                                         |
| onEnter           | () => void                                        | Callback fired before the Modal transitions in                                                                                                                                         |
| onEntered         | () => void                                        | Callback fired after the Modal finishes transitioning in                                                                                                                               |
| onEntering        | () => void                                        | Callback fired as the Modal begins to transition in                                                                                                                                    |
| onExit            | () => void                                        | Callback fired right before the Modal transitions out                                                                                                                                  |
| onExited          | () => void                                        | Callback fired after the Modal finishes transitioning out                                                                                                                              |
| onExiting         | () => void                                        | Callback fired as the Modal begins to transition out                                                                                                                                   |
| onOpen            | () => void                                        | Callback fired when Modal display                                                                                                                                                      |
| open \*           | boolean                                           | Show Modal                                                                                                                                                                             |
| overflow          | boolean `(true)`                                  | Automatically sets the height when the body content is too long.                                                                                                                       |
| size              | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | Set Modal size                                                                                                                                                                         |

### `<Modal.Header>`

| Property    | Type `(Default)`                           | Description                                     |
| ----------- | ------------------------------------------ | ----------------------------------------------- |
| as          | ElementType `('div')`                      | You can use a custom element for this component |
| classPrefix | string `('modal-header')`                  | The prefix of the component CSS class           |
| closeButton | boolean `(true)`                           | Display close button                            |
| onClose     | (event: SyntheticEvent&lt;any&gt;) => void | Called when Modal is hidden                     |

### `<Modal.Title>`

| Property    | Type `(Default)`         | Description                                     |
| ----------- | ------------------------ | ----------------------------------------------- |
| as          | ElementType `('h4')`     | You can use a custom element for this component |
| classPrefix | string `('modal-title')` | The prefix of the component CSS class           |

### `<Modal.Footer>`

| Property    | Type `(Default)`          | Description                                     |
| ----------- | ------------------------- | ----------------------------------------------- |
| as          | ElementType `('div')`     | You can use a custom element for this component |
| classPrefix | string `('modal-footer')` | The prefix of the component CSS class           |

### `<Modal.Body>`

| Property    | Type `(Default)`        | Description                                     |
| ----------- | ----------------------- | ----------------------------------------------- |
| as          | ElementType `('div')`   | You can use a custom element for this component |
| classPrefix | string `('modal-body')` | The prefix of the component CSS class           |
