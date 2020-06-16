### Checkbox 组，横向布局

<!--start-code-->
```js
const instance=(
  <CheckboxGroup
    inline
    name="checkboxList"
  >
    <Checkbox>Item A</Checkbox>
    <Checkbox>Item B</Checkbox>
    <Checkbox>Item C</Checkbox>
    <Checkbox disabled>Item D</Checkbox>
  </CheckboxGroup>
)

ReactDOM.render(instance);
```
<!--end-code-->