### 禁用状态

可以禁用整个组件，也可以禁用单个选项，只需配置 `disabled` 属性。

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

