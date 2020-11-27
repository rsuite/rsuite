<!--start-code-->

```js
const App = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="modal-container">
      <ButtonToolbar>
        <Button onClick={handleOpen}>Open</Button>
      </ButtonToolbar>

      <Modal backdrop="static" open={open} onClose={handleClose} size="xs">
        <Modal.Body>
          <Remind
            style={{
              color: '#ffb300',
              fontSize: 24,
            }}
          />
          Once a project is disabled, there will be no update on project report, and project members
          can access history data only. Are you sure you want to proceed ?
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
