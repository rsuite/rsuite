<!--start-code-->

```js
var instance = (
  <div>
    <Form layout="inline">
      <Form.Group controlId="username-7">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="username" style={{ width: 160 }} />
        <Form.HelpText tooltip>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="password-7">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" autoComplete="off" style={{ width: 160 }} />
      </Form.Group>

      <Button>Login</Button>
    </Form>
    <hr />

    <Form layout="inline">
      <Form.Group controlId="username-8">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control placeholder="Username" name="username" />
      </Form.Group>

      <Form.Group controlId="password-8">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control placeholder="Password" name="password" type="password" autoComplete="off" />
      </Form.Group>

      <Button>Login</Button>
    </Form>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
