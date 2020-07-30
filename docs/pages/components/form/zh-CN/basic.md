## 布局

### 默认

默认为垂直布局

<!--start-code-->

```js
const instance = (
  <Form>
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
      <FormControl rows={5} name="textarea" as="textarea" />
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
