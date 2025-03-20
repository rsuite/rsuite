<!--start-code-->

```js
import { Form, Button, Input, Modal, SelectPicker } from 'rsuite';

const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
  label: item,
  value: item
}));

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
    password: '',
    textarea: ''
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Modal open={open} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onChange={setFormValue} formValue={formValue}>
            <Form.Group controlId="name-9">
              <Form.Label>Username</Form.Label>
              <Form.Control name="name" />
              <Form.Text>Required</Form.Text>
            </Form.Group>
            <Form.Group controlId="email-9">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" />
              <Form.Text>Required</Form.Text>
            </Form.Group>
            <Form.Group controlId="password-9">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" autoComplete="off" />
            </Form.Group>
            <Form.Group controlId="textarea-9">
              <Form.Label>Textarea</Form.Label>
              <Form.Control rows={5} name="textarea" accepter={Textarea} />
            </Form.Group>
            <Form.Group controlId="select-10">
              <Form.Label>SelectPicker</Form.Label>
              <Form.Control
                name="select"
                data={selectData}
                accepter={SelectPicker}
                block
                placement="top"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={handleOpen}>New User</Button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
