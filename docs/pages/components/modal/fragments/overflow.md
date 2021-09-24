<!--start-code-->

```js
const App = () => {
  const [open, setOpen] = React.useState(false);
  const [overflow, setOverflow] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="modal-container">
      <span>Overflow </span>
      <Toggle checked={overflow} onChange={checked => setOverflow(checked)} />
      <hr />
      <ButtonToolbar>
        <Button onClick={handleOpen}>Open</Button>
      </ButtonToolbar>

      <Modal overflow={overflow} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paragraph rows={80} />
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
