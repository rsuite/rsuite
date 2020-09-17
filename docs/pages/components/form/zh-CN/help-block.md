## 状态

---

### 帮助说明

`<HelpBlock>` 可以在表单组件下面定义一个帮助说明信息，如果设置 `tooltip` 属性，就会在表单组件显示一个图标，以 `<Tooltip>` 的方式显示帮助说明信息。

<!--start-code-->

```js
const instance = (
  <Form>
    <FormGroup>
      <FormControl name="email" placeholder="Email" />
      <HelpBlock>This field is required</HelpBlock>
    </FormGroup>

    <FormGroup>
      <FormControl name="name" placeholder="Name" />
      <HelpBlock tooltip>This field is required</HelpBlock>
    </FormGroup>
  </Form>
);

ReactDOM.render(instance);
```

<!--end-code-->
