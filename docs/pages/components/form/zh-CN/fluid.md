### 撑满容器

`fluid` 属性可以让表单中的 Input 100% 撑满容器，只在垂直布局中有效。

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
