<!--start-code-->

```js
import { Modal, Drawer, Button, HStack } from 'rsuite';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

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

const MyDrawer = NiceModal.create(({ id, name }) => {
  const modal = useModal();
  return (
    <Drawer open={modal.visible} onClose={modal.hide} onExited={modal.remove} backdrop="static">
      <Drawer.Header>
        <Drawer.Title>Hello React Suite</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        Greetings: {id},{name}!
      </Drawer.Body>
    </Drawer>
  );
});

function App() {
  return (
    <NiceModal.Provider>
      <HStack>
        <Button
          appearance="primary"
          onClick={() => {
            NiceModal.show(MyModal, { id: 'test', name: 'Nate' });
          }}
        >
          Show Modal
        </Button>

        <Button
          appearance="primary"
          onClick={() => {
            NiceModal.show(MyDrawer, { id: 'test', name: 'Nate' });
          }}
        >
          Show Drawer
        </Button>
      </HStack>
    </NiceModal.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
