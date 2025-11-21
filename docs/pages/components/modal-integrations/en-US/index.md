# Modal Integrations 🧩

Modal and Drawer integrations with third-party libraries.

## Nice Modal

The integration of [Nice Modal](https://github.com/eBay/nice-modal-react) with React Suite's Modal/Drawer offers a lightweight and flexible customizable modal window solution.

## Usage

<div class="rs-doc-steps">

<h3 class="rs-doc-step-header">Install Nice Modal</h3>

<div class="rs-doc-step-body">

First, install the `@ebay/nice-modal-react` dependency:

```bash
npm install @ebay/nice-modal-react
```

</div>

<h3 class="rs-doc-step-header">Create a Modal Component</h3>

<div class="rs-doc-step-body">

Use `NiceModal.create` to create a reusable modal component:

```tsx
import { Modal, Button } from 'rsuite';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

export const MyModal = NiceModal.create(({ id, name }) => {
  const modal = useModal();
  return (
    <Modal open={modal.visible} onClose={modal.hide} onExited={modal.remove} backdrop="static">
      <Modal.Header>
        <Modal.Title>Hello React Suite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Greetings: {id}, {name}!
      </Modal.Body>
    </Modal>
  );
});
```

</div>

<h3 class="rs-doc-step-header">Using the Modal</h3>

<div class="rs-doc-step-body">

Wrap your application with `NiceModal.Provider` and then you can show the modal from anywhere:

```jsx
import NiceModal from '@ebay/nice-modal-react';
import { MyModal } from './MyModal';

const App = () => {
  return (
    <NiceModal.Provider>
      <Button
        appearance="primary"
        onClick={() => {
          NiceModal.show(MyModal, { id: 'test', name: 'Nate' });
        }}
      >
        Show Modal
      </Button>
    </NiceModal.Provider>
  );
};
```

</div>

</div>

## Examples

### Modal

<!--{include:`nice-modal.md`}-->

### Drawer

<!--{include:`nice-modal-drawer.md`}-->
