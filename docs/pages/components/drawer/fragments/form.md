<!--start-code-->

```js
import { Form, Button, Input, Drawer, SelectPicker, Textarea } from 'rsuite';

const selectData = ['Developer', 'Designer', 'Manager', 'Analyst', 'Tester'].map(item => ({
  label: item,
  value: item
}));

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    fullName: '',
    email: '',
    password: '',
    bio: '',
    role: ''
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Drawer open={open} onClose={handleClose} size="sm">
        <Drawer.Header>
          <Drawer.Title>Create New Employee Account</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={handleClose} appearance="primary">
              Submit
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body
          style={{
            padding: 30
          }}
        >
          <Form fluid onChange={setFormValue} formValue={formValue}>
            <Form.Group controlId="fullName">
              <Form.ControlLabel>Full Name</Form.ControlLabel>
              <Form.Control name="fullName" />
              <Form.HelpText>
                Enter your full name as it appears on official documents
              </Form.HelpText>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Work Email</Form.ControlLabel>
              <Form.Control name="email" type="email" />
              <Form.HelpText>Use your company email address</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Create Password</Form.ControlLabel>
              <Form.Control name="password" type="password" autoComplete="new-password" />
              <Form.HelpText>Password must be at least 8 characters long</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="bio">
              <Form.ControlLabel>Brief Bio</Form.ControlLabel>
              <Form.Control rows={3} name="bio" accepter={Textarea} />
              <Form.HelpText>A short description of your professional background</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.ControlLabel>Job Role</Form.ControlLabel>
              <Form.Control
                name="role"
                data={selectData}
                accepter={SelectPicker}
                block
                placement="topStart"
              />
              <Form.HelpText>Select the role that best describes your position</Form.HelpText>
            </Form.Group>
          </Form>
        </Drawer.Body>
      </Drawer>
      <Button onClick={handleOpen}>Add New Employee</Button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
