<!--start-code-->

```jsx
import { Modal, Button } from 'rsuite';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const MyModal = NiceModal.create(({ id, name }) => {
  const modal = useModal();
  return (
    <Modal
      open={modal.visible}
      onClose={modal.hide}
      onExited={modal.remove}
      backdrop="static"
      size="xs"
    >
      <Modal.Header>
        <Modal.Title>Modal Example</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ID: {id}</p>
        <p>Name: {name}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={modal.hide} appearance="subtle">
          Cancel
        </Button>
        <Button onClick={modal.hide} appearance="primary">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

function App() {
  return (
    <NiceModal.Provider>
      <Button
        onClick={() => {
          NiceModal.show(MyModal, {
            id: 'modal-123',
            name: 'Example Content'
          });
        }}
      >
        Show Modal
      </Button>
    </NiceModal.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
