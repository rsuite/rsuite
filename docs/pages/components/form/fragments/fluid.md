<!--start-code-->

```js
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const instance = (
  <Form fluid>
    <Form.Group controlId="name-1">
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control name="name" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="email-1">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="password-1">
      <Form.ControlLabel>Password</Form.ControlLabel>
      <Form.Control name="password" type="password" autoComplete="off" />
    </Form.Group>
    <Form.Group controlId="textarea-1">
      <Form.ControlLabel>Textarea</Form.ControlLabel>
      <Form.Control rows={5} name="textarea" accepter={Textarea} />
    </Form.Group>
    <Form.Group>
      <ButtonToolbar>
        <Button appearance="primary">Submit</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
    </Form.Group>
  </Form>
);
ReactDOM.render(instance);
```

<!--end-code-->
