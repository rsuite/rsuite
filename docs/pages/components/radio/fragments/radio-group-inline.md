<!--start-code-->

```js
const instance = (
  <Form.Group controlId="radioList">
    <RadioGroup name="radioList" inline>
      <Radio value="A">Item A</Radio>
      <Radio value="B">Item B</Radio>
      <Radio value="C">Item C</Radio>
      <Radio value="D" disabled>
        Item D
      </Radio>
    </RadioGroup>
  </Form.Group>
);
ReactDOM.render(instance);
```

<!--end-code-->
