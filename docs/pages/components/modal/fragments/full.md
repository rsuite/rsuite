<!--start-code-->

```js
const App = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="modal-container">
      <ButtonToolbar>
        <Button size="lg" onClick={handleOpen}>
          Open
        </Button>
      </ButtonToolbar>
      <Modal full open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paragraph rows={8} />
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
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
