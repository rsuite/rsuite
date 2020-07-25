### 选择范围

<!--start-code-->

```js
const instance = (
  <InputGroup style={{ width: 460 }}>
    <DatePicker format="yyyy-MM-dd HH:mm:ss" block appearance="subtle" />
    <InputGroup.Addon>至</InputGroup.Addon>
    <DatePicker format="yyyy-MM-dd HH:mm:ss" block appearance="subtle" />
  </InputGroup>
);

ReactDOM.render(instance);
```

<!--end-code-->
