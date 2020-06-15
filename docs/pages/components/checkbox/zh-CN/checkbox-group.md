### Checkbox 组

<!--start-code-->
```js
const instance = (
  <CheckboxGroup name="checkboxList" >
    <p>Group1</p>
    <Checkbox>Item A</Checkbox>
    <Checkbox>Item B</Checkbox>
    <p>Group2</p>
    <Checkbox>Item C</Checkbox>
    <Checkbox disabled>Item D</Checkbox>
  </CheckboxGroup>
);
ReactDOM.render(instance);
```
<!--end-code-->