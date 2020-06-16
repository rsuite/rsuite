### Radio 组


<!--start-code-->
```js
const instance = (
  <FormGroup controlId='radioList'>
    <RadioGroup name="radioList">
      <p>Group1</p>
      <Radio value="A">Item A</Radio>
      <Radio value="B">Item B</Radio>
      <p>Group2</p>
      <Radio value="C">Item C</Radio>
      <Radio value="D" disabled>Item D</Radio>
    </RadioGroup>
  </FormGroup>
);
ReactDOM.render(instance);
```
<!--end-code-->