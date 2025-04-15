<!--start-code-->

```js
import { Form, Button, Input, Modal, PasswordInput, SelectPicker } from 'rsuite';

const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
  label: item,
  value: item
}));

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const FormField = ({ name, label, text, ...props }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control name={name} {...props} />
    {text && <Form.Text>{text}</Form.Text>}
  </Form.Group>
);

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
            <FormField name="name" label="Username" text="Username is required" />
            <FormField name="email" label="Email" text="Email is required" type="email" />
            <FormField name="password" label="Password" accepter={PasswordInput} />
            <FormField name="textarea" label="Textarea" accepter={Textarea} rows={5} />
            <FormField
              name="select"
              label="SelectPicker"
              accepter={SelectPicker}
              data={selectData}
              block
              placement="top"
            />
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
