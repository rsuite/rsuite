## 状态

---

### 帮助说明

`<Form.HelpText>` 可以在表单组件下面定义一个帮助说明信息，如果设置 `tooltip` 属性，就会在表单组件显示一个图标，以 `<Tooltip>` 的方式显示帮助说明信息。

<!--start-code-->

```js
const instance = (
  <Form>
    <Form.Group>
      <Form.Control name="email" placeholder="Email" />
      <Form.HelpText>This field is required</Form.HelpText>
    </Form.Group>

    <Form.Group>
      <Form.Control name="name" placeholder="Name" />
      <Form.HelpText tooltip>This field is required</Form.HelpText>
    </Form.Group>
  </Form>
);

ReactDOM.render(instance);
```

<!--end-code-->
