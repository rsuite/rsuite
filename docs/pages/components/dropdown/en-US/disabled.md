### Disabled State

You can disable the entire component or disable individual options by configuring the `disabled` property.

<!--start-code-->
```js
const instance = (
  <ButtonToolbar>
    <Dropdown title="Disabled" disabled>
      <Dropdown.Item >Item A</Dropdown.Item>
      <Dropdown.Item >Item B</Dropdown.Item>
      <Dropdown.Item >Item C</Dropdown.Item>
    </Dropdown>
    <Dropdown title="Disabled Item" >
      <Dropdown.Item disabled>Disabled Item A</Dropdown.Item>
      <Dropdown.Item disabled>Disabled Item B</Dropdown.Item>
      <Dropdown.Item >Item C</Dropdown.Item>
    </Dropdown>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```
<!--end-code-->

