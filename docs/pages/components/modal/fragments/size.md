<!--start-code-->

```js
import { Modal, ButtonToolbar, Button, Placeholder } from 'rsuite';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const handleOpen = value => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <ButtonToolbar>
        <Button size="xs" onClick={() => handleOpen('xs')}>
          Xsmall
        </Button>
        <Button size="sm" onClick={() => handleOpen('sm')}>
          Small
        </Button>
        <Button size="md" onClick={() => handleOpen('md')}>
          Medium
        </Button>
        <Button size="lg" onClick={() => handleOpen('lg')}>
          Large
        </Button>
        <Button size="lg" onClick={() => handleOpen('full')}>
          Full page
        </Button>
      </ButtonToolbar>
      <Modal size={size} open={open} onClose={handleClose}>
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
