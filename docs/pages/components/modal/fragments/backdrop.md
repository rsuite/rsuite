<!--start-code-->

```js
import { Modal, ButtonToolbar, Button, SegmentedControl, Placeholder, Text } from 'rsuite';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState('static');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SegmentedControl
        data={[
          { value: 'static', label: 'static' },
          { value: true, label: 'true' },
          { value: false, label: 'false' }
        ]}
        value={backdrop}
        onChange={setBackdrop}
      />
      <hr />
      <ButtonToolbar>
        <Button onClick={handleOpen}> Open</Button>
      </ButtonToolbar>

      <Modal backdrop={backdrop} keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
