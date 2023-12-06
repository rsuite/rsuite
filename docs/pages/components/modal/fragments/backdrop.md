<!--start-code-->

```js
import { Modal, ButtonToolbar, Button, RadioGroup, Radio, Placeholder } from 'rsuite';

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState('static');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <RadioGroup
        name="radioList"
        appearance="picker"
        inline
        value={backdrop}
        onChange={value => setBackdrop(value)}
      >
        <RadioLabel>Backdrop: </RadioLabel>
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
          <Placeholder.Paragraph />
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
