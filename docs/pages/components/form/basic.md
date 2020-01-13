## 布局
### 默认

默认为垂直布局

<!--start-code-->

```js
const instance = (
  <Form>
    <FormGroup>
      <ControlLabel>Username</ControlLabel>
      <FormControl name="name" />
      <HelpBlock>Required</HelpBlock>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Email</ControlLabel>
      <FormControl name="email" type="email" />
      <HelpBlock tooltip>Required</HelpBlock>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Password</ControlLabel>
      <FormControl name="password" type="password" />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Textarea</ControlLabel>
      <FormControl rows={5} name="textarea" componentClass="textarea" />
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
