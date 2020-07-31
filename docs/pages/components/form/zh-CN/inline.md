### 行内排列布局

<!--start-code-->

```js
var instance = (
  <div>
    <Form layout="inline">
      <FormGroup>
        <FormControlLabel>Username</FormControlLabel>
        <FormControl name="username" style={{ width: 160 }} />
        <FormHelpText tooltip>Required</FormHelpText>
      </FormGroup>

      <FormGroup>
        <FormControlLabel>Password</FormControlLabel>
        <FormControl name="password" type="password" style={{ width: 160 }} />
      </FormGroup>

      <Button>Login</Button>
    </Form>
    <hr />

    <Form layout="inline">
      <FormGroup>
        <FormControlLabel>Username</FormControlLabel>
        <FormControl placeholder="Username" name="username" />
      </FormGroup>

      <FormGroup>
        <FormControlLabel>Username</FormControlLabel>
        <FormControl placeholder="Password" name="password" type="password" />
      </FormGroup>

      <Button>Login</Button>
    </Form>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
