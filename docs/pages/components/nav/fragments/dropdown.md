<!--start-code-->

```js
const instance = (
  <div>
    <Nav>
      <Nav.Item active>Item A</Nav.Item>
      <Nav.Item>Item B</Nav.Item>
      <Nav.Item>Item C</Nav.Item>
      <Nav.Item>Item D</Nav.Item>
      <Nav.Dropdown title="Item E">
        <Nav.Dropdown.Item>Item E-1</Nav.Dropdown.Item>
        <Nav.Dropdown.Item>Item E-2</Nav.Dropdown.Item>
        <Nav.Dropdown.Item>Item E-3</Nav.Dropdown.Item>
        <Nav.Dropdown.Item>Item E-4</Nav.Dropdown.Item>
        <Nav.Dropdown.Menu title="Item E-4">
          <Nav.Dropdown.Item>Item E-4-1</Nav.Dropdown.Item>
          <Nav.Dropdown.Item active>Item E-4-2</Nav.Dropdown.Item>
          <Nav.Dropdown.Item>Item E-4-3</Nav.Dropdown.Item>
        </Nav.Dropdown.Menu>
      </Nav.Dropdown>
    </Nav>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
