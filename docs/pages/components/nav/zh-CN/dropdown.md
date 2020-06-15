### 多级导航

<!--start-code-->

```js
const instance = (
  <div>
    <Nav>
      <Nav.Item active>Item A</Nav.Item>
      <Nav.Item>Item B</Nav.Item>
      <Nav.Item>Item C</Nav.Item>
      <Nav.Item>Item D</Nav.Item>
      <Dropdown title="Item E">
        <Dropdown.Item>Item E-1</Dropdown.Item>
        <Dropdown.Item>Item E-2</Dropdown.Item>
        <Dropdown.Item>Item E-3</Dropdown.Item>
        <Dropdown.Item>Item E-4</Dropdown.Item>
        <Dropdown.Menu title="Item E-4">
          <Dropdown.Item>Item E-4-1</Dropdown.Item>
          <Dropdown.Item active>Item E-4-2</Dropdown.Item>
          <Dropdown.Item>Item E-4-3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->

> 当使用多级导航时，直接使用 `<Dropdown>` 组件。
