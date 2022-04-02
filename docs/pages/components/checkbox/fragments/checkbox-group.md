<!--start-code-->

```js
const instance = (
  <CheckboxGroup name="checkboxList">
    <p>Group1</p>
    <Checkbox value="A">Item A</Checkbox>
    <Checkbox value="B">Item B</Checkbox>
    <p>Group2</p>
    <Checkbox value="C">Item C</Checkbox>
    <Checkbox value="D" disabled>
      Item D
    </Checkbox>
  </CheckboxGroup>
);
ReactDOM.render(instance);
```

<!--end-code-->
