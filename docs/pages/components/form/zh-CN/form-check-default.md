## 数据校验

---

### 默认校验

在表单触发了 `submit` 事件后，会自动触发数据检查。

<!--start-code-->

```js
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.')
});
function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl name={name} accepter={accepter} {...rest} />
    </FormGroup>
  );
}
function CheckForm() {
  return (
    <Form model={model}>
      <TextField name="name" label="Username" />
      <TextField name="email" label="Email" />
      <ButtonToolbar>
        <Button appearance="primary" type="submit">
          Submit
        </Button>
      </ButtonToolbar>
    </Form>
  );
}
ReactDOM.render(<CheckForm />);
```

<!--end-code-->