### Inline Layout

<!--start-code-->

```js
var instance = (
  <div>
    <Form layout="inline">
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <FormControl name="username" style={{ width: 160 }} />
        <HelpBlock tooltip>Required</HelpBlock>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <FormControl name="password" type="password" style={{ width: 160 }} />
      </FormGroup>

      <Button>Login</Button>
    </Form>
    <hr />

    <Form layout="inline">
      <FormGroup>
        <ControlLabel srOnly>Username</ControlLabel>
        <FormControl placeholder="Username" name="username" />
      </FormGroup>

      <FormGroup>
        <ControlLabel srOnly>Username</ControlLabel>
        <FormControl placeholder="Password" name="password" type="password" />
      </FormGroup>

      <Button>Login</Button>
    </Form>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
