### Horizontal layout

<!--start-code-->

```js
const instance = (
  <Form layout="horizontal">
    <Form.Group>
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control name="name" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group>
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email" />
      <Form.HelpText tooltip>Required</Form.HelpText>
    </Form.Group>
    <Form.Group>
      <Form.ControlLabel>Password</Form.ControlLabel>
      <Form.Control name="password" type="password" />
    </Form.Group>
    <Form.Group>
      <Form.ControlLabel>Textarea</Form.ControlLabel>
      <Form.Control name="textarea" rows={5} as="textarea" />
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
