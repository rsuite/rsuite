<!--start-code-->

```js
const instance = (
  <InputGroup style={{ width: 428 }}>
    <DatePicker format="yyyy-MM-dd HH:mm:ss" block appearance="subtle" style={{ width: 230 }} />
    <InputGroup.Addon>至</InputGroup.Addon>
    <DatePicker format="yyyy-MM-dd HH:mm:ss" block appearance="subtle" style={{ width: 230 }} />
  </InputGroup>
);

ReactDOM.render(instance);
```

<!--end-code-->
