### 水平排列布局

<!--start-code-->

```js
const instance = (
  <Form layout="horizontal">
    <FormGroup>
      <FormControlLabel>Username</FormControlLabel>
      <FormControl name="name" />
      <HelpBlock>Required</HelpBlock>
    </FormGroup>
    <FormGroup>
      <FormControlLabel>Email</FormControlLabel>
      <FormControl name="email" type="email" />
      <HelpBlock tooltip>Required</HelpBlock>
    </FormGroup>
    <FormGroup>
      <FormControlLabel>Password</FormControlLabel>
      <FormControl name="password" type="password" />
    </FormGroup>
    <FormGroup>
      <FormControlLabel>Textarea</FormControlLabel>
      <FormControl name="textarea" rows={5} as="textarea" />
    </FormGroup>
    <FormGroup>
      <ButtonToolbar>
        <Button appearance="primary">Submit</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
    </FormGroup>
  </Form>
);
ReactDOM.render(instance);
```

<!--end-code-->
