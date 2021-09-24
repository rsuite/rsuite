<!--start-code-->

```js
const instance = (
  <Navbar>
    <Navbar.Brand href="#">
      RSUITE
    </Navbar.Brand>
    <Nav>
      <Nav.Item icon={<Home />}>Home</Nav.Item>
      <Nav.Item>News</Nav.Item>
      <Nav.Item>Products</Nav.Item>
      <Dropdown title="About">
        <Dropdown.Item>Company</Dropdown.Item>
        <Dropdown.Item>Team</Dropdown.Item>
        <Dropdown.Item>Contact</Dropdown.Item>
      </Dropdown>
    </Nav>
    <Nav pullRight>
      <Nav.Item icon={<Cog />}>Settings</Nav.Item>
    </Nav>
  </Navbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
