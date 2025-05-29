<!--start-code-->

```jsx
import { Drawer, Button } from 'rsuite';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const MyDrawer = NiceModal.create(({ id, name }) => {
  const modal = useModal();
  return (
    <Drawer
      open={modal.visible}
      onClose={modal.hide}
      onExited={modal.remove}
      backdrop="static"
      size="xs"
    >
      <Drawer.Header>
        <Drawer.Title>Drawer Example</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <p>ID: {id}</p>
        <p>Name: {name}</p>
        <p>This is an example drawer content. You can put any content here.</p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button onClick={modal.hide} appearance="primary">
          Close
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
});

function App() {
  return (
    <NiceModal.Provider>
      <Button
        onClick={() => {
          NiceModal.show(MyDrawer, {
            id: 'drawer-123',
            name: 'Example Content'
          });
        }}
      >
        Show Drawer
      </Button>
    </NiceModal.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
