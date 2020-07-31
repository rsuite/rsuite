## 状态

---

### 帮助说明

`<FormHelpText>` 可以在表单组件下面定义一个帮助说明信息，如果设置 `tooltip` 属性，就会在表单组件显示一个图标，以 `<Tooltip>` 的方式显示帮助说明信息。

<!--start-code-->

```js
const instance = (
  <Form>
    <FormGroup>
      <FormControl name="email" placeholder="Email" />
      <FormHelpText>This field is required</FormHelpText>
    </FormGroup>

    <FormGroup>
      <FormControl name="name" placeholder="Name" />
      <FormHelpText tooltip>This field is required</FormHelpText>
    </FormGroup>
  </Form>
);

ReactDOM.render(instance);
```

<!--end-code-->
