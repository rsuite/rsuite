### Inline Layout

<!--start-code-->

```js
var instance = (
  <div>
    <Form layout="inline">
      <Form.Group>
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="username" style={{ width: 160 }} />
        <Form.HelpText tooltip>Required</Form.HelpText>
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" style={{ width: 160 }} />
      </Form.Group>

      <Button>Login</Button>
    </Form>
    <hr />

    <Form layout="inline">
      <Form.Group>
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control placeholder="Username" name="username" />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control placeholder="Password" name="password" type="password" />
      </Form.Group>

      <Button>Login</Button>
    </Form>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
