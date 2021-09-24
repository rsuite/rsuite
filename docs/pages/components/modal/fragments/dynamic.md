<!--start-code-->

```js
const App = () => {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };

  return (
    <div className="modal-container">
      <ButtonToolbar>
        <Button onClick={handleOpen}>Open</Button>
      </ButtonToolbar>

      <Modal
        open={open}
        onClose={handleClose}
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
      >
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rows ? (
            <Paragraph rows={rows} />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Loader size="md" />
            </div>
          )}
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
