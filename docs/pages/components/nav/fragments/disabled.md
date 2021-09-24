### 禁用状态

<!--start-code-->

```js
const instance = (
  <div>
    <Nav>
      <Nav.Item>Default Item</Nav.Item>
      <Nav.Item disabled>Disabled Item</Nav.Item>
    </Nav>
    <br />
    <Nav appearance="tabs">
      <Nav.Item>Default Item</Nav.Item>
      <Nav.Item disabled>Disabled Item</Nav.Item>
    </Nav>
    <br />
    <Nav appearance="subtle">
      <Nav.Item>Default Item</Nav.Item>
      <Nav.Item disabled>Disabled Item</Nav.Item>
    </Nav>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
