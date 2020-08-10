### Fluid

The `fluid` property allows the Input 100% of the form to fill the container, valid only in vertical layouts.

<!--start-code-->

```js
const instance = (
  <Form fluid>
    <Form.Group>
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control name="name" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group>
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group>
      <Form.ControlLabel>Password</Form.ControlLabel>
      <Form.Control name="password" type="password" />
    </Form.Group>
    <Form.Group>
      <Form.ControlLabel>Textarea</Form.ControlLabel>
      <Form.Control rows={5} name="textarea" as="textarea" />
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
