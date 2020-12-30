<!--start-code-->

```js
const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState('static');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="modal-container">
      <RadioGroup
        name="radioList"
        appearance="picker"
        inline
        value={backdrop}
        onChange={value => setBackdrop(value)}
      >
        <span style={styles.radioGroupLabel}>Backdrop: </span>
        <Radio value="static">static</Radio>
        <Radio value={true}>true</Radio>
        <Radio value={false}>false</Radio>
      </RadioGroup>
      <hr />
      <ButtonToolbar>
        <Button onClick={handleOpen}> Open</Button>
      </ButtonToolbar>

      <Modal backdrop={backdrop} keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Paragraph />
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
