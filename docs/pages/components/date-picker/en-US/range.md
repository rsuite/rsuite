### Selection range

<!--start-code-->

```js
const instance = (
  <InputGroup style={{ width: 460 }}>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" block appearance="subtle" />
    <InputGroup.Addon>至</InputGroup.Addon>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" block appearance="subtle" />
  </InputGroup>
);

ReactDOM.render(instance);
```

<!--end-code-->
