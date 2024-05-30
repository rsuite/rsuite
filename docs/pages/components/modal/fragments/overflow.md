<!--start-code-->

```js
import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from 'rsuite';
const App = () => {
  const [open, setOpen] = React.useState(false);
  const [overflow, setOverflow] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Toggle checked={overflow} onChange={checked => setOverflow(checked)}>
        Overflow
      </Toggle>
      <hr />
      <ButtonToolbar>
        <Button onClick={handleOpen}>Open</Button>
      </ButtonToolbar>

      <Modal overflow={overflow} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph rows={80} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
