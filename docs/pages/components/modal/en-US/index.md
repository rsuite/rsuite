# Modal

A modal dialog box component for message prompts, acknowledgement messages, and submissions. You can use Drawer if you need to place more content.

## Import

<!--{include:<import-guide>}-->

- `Modal` The container of Modal.
- `Modal.Header` The header of the modal dialog box.
- `Modal.Title` The title of the modal dialog box.
- `Modal.Body` The content of the modal dialog box.
- `Modal.Footer` The footer of the modal dialog box.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Backdrop

When set to `true`, the Modal will display the background when it is opened. Clicking on the background will close the Modal. If you do not want to close the Modal, set it to 'static'.

<!--{include:`backdrop.md`}-->

### Vertical center

<!--{include:`centered.md`}-->

### Size

<!--{include:`size.md`}-->

### Content overflow

<!--{include:`overflow.md`}-->

### Dynamic content

<!--{include:`dynamic.md`}-->

### Alert dialogs

<!--{include:`alert-dialog.md`}-->

### With form

<!--{include:`form.md`}-->

## Responsive

On mobile devices, the Modal's maximum width will stretch to fill the screen while maintaining margins.

<!--{include:<example-responsive>}-->

## Accessibility

### WAI-ARIA Roles, States, and Properties

- Modal has role `dialog`.
- Modal has `aria-modal` set to `true`. Tells assistive technologies that the windows underneath the current dialog are not available for interaction (inert).
- Modal will automatically add `aria-labelledby` attribute to point to the Modal.Title component. Use `aria-describedby` attribute to add a description to the Modal.Body component. You can also manually add `aria-labelledby` and `aria-describedby` attributes to override the default setting.

```js
<Modal aria-labelledby="modal-title" aria-describedby="modal-description">
  <Modal.Header>
    <Modal.Title id="modal-title">My Title</Modal.Title>
  </Modal.Header>
  <Modal.Body id="modal-description">My Description</Modal.Body>
</Modal>
```

- Modify `role` to `alertdialog`, when Modal is used as an alert dialog. See [WAI-ARIA Alert and Message Dialogs Pattern](https://www.w3.org/TR/wai-aria-practices/#alertdialog).

```jsx
<Modal role="alertdialog" backdrop="static">
  ...
</Modal>
```

### Keyboard Interaction

- <kbd>ESC</kbd> can close the Modal. This functionality can be disabled by setting `keyboard=false`.
- <kbd>Tab</kbd> When the Modal is open, focus automatically moves inside the Modal. Pressing Tab cycles through focusable elements within the Modal.
- <kbd>Shift + Tab</kbd> Reverse cycles through focusable elements within the Modal.
- When the Modal closes, focus returns to the element that triggered the Modal to open.

## Props

### `<Modal>`

| Property          | Type `(Default)`                                                   | Description                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFocus         | boolean `(true)`                                                   | When set to true, the Modal is opened and is automatically focused on its own, accessible to screen readers                                                                            |
| backdrop          | unions: boolean \| 'static'                                        | When set to true, the Modal will display the background when it is opened. Clicking on the background will close the Modal. If you do not want to close the Modal, set it to 'static'. |
| backdropClassName | string                                                             | Add an optional extra class name to .modal-backdrop It could end up looking like class="modal-backdrop foo-modal-backdrop in".                                                         |
| centered          | boolean                                                            | Align the modal vertically in the center of the page.                                                                                                                                  |
| children          | ReactNode                                                          | Modal content                                                                                                                                                                          |
| classPrefix       | string `('modal')`                                                 | The prefix of the component CSS class                                                                                                                                                  |
| container         | HTMLElement \| (() => HTMLElement)                                 | Sets the rendering container                                                                                                                                                           |
| dialogAs          | ElementType `(ModalDialog)`                                        | You can use a custom element type for Dialog                                                                                                                                           |
| dialogClassName   | string                                                             | CSS class applied to Dialog DOM nodes.                                                                                                                                                 |
| dialogStyle       | CSSProperties                                                      | CSS style applied to Dialog DOM nodes.                                                                                                                                                 |
| enforceFocus      | boolean `(true)`                                                   | When set to true, Modal will prevent the focus from leaving when opened, making it easier for the secondary screen reader to access                                                    |
| keyboard          | boolean `(true)`                                                   | Close Modal when `esc` key is pressed.                                                                                                                                                 |
| onClose           | () => void                                                         | Callback fired when Modal hide                                                                                                                                                         |
| onEnter           | () => void                                                         | Callback fired before the Modal transitions in                                                                                                                                         |
| onEntered         | () => void                                                         | Callback fired after the Modal finishes transitioning in                                                                                                                               |
| onEntering        | () => void                                                         | Callback fired as the Modal begins to transition in                                                                                                                                    |
| onExit            | () => void                                                         | Callback fired right before the Modal transitions out                                                                                                                                  |
| onExited          | () => void                                                         | Callback fired after the Modal finishes transitioning out                                                                                                                              |
| onExiting         | () => void                                                         | Callback fired as the Modal begins to transition out                                                                                                                                   |
| onOpen            | () => void                                                         | Callback fired when Modal display                                                                                                                                                      |
| open \*           | boolean                                                            | Show Modal                                                                                                                                                                             |
| overflow          | boolean `(true)`                                                   | Automatically sets the height when the body content is too long.                                                                                                                       |
| size              | 'xs' \| 'sm' \| 'md' \| lg' \| 'full' \| number \| string `('sm')` | Determine the width of the modal                                                                                                                                                       |

### `<Modal.Header>`

| Property    | Type `(Default)`          | Description                                     |
| ----------- | ------------------------- | ----------------------------------------------- |
| as          | ElementType `('div')`     | You can use a custom element for this component |
| children    | ReactNode                 | Header content                                  |
| classPrefix | string `('modal-header')` | The prefix of the component CSS class           |
| closeButton | boolean `(true)`          | Display close button                            |
| onClose     | (event) => void           | Called when Modal is hidden                     |

### `<Modal.Title>`

| Property    | Type `(Default)`         | Description                                     |
| ----------- | ------------------------ | ----------------------------------------------- |
| as          | ElementType `('h4')`     | You can use a custom element for this component |
| children    | ReactNode                | Title content                                   |
| classPrefix | string `('modal-title')` | The prefix of the component CSS class           |

### `<Modal.Footer>`

| Property    | Type `(Default)`          | Description                                     |
| ----------- | ------------------------- | ----------------------------------------------- |
| as          | ElementType `('div')`     | You can use a custom element for this component |
| children    | ReactNode                 | Footer content                                  |
| classPrefix | string `('modal-footer')` | The prefix of the component CSS class           |

### `<Modal.Body>`

| Property    | Type `(Default)`        | Description                                     |
| ----------- | ----------------------- | ----------------------------------------------- |
| as          | ElementType `('div')`   | You can use a custom element for this component |
| children    | ReactNode               | Body content                                    |
| classPrefix | string `('modal-body')` | The prefix of the component CSS class           |
