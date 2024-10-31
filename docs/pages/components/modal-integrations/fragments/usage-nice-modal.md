```jsx
import { Modal } from 'rsuite';
import { NiceModal } from '@ebay/nice-modal-react';

const MyModal = NiceModal.create(({ id, name }) => {
  const modal = useModal();
  return (
    <Modal open={modal.visible} onClose={modal.hide} onExited={modal.remove} backdrop="static">
      <Modal.Header>
        <Modal.Title>Hello React Suite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Greetings: {id},{name}!
      </Modal.Body>
    </Modal>
  );
});

NiceModal.show(MyModal, { id: 'test', name: 'Nate' });
```
