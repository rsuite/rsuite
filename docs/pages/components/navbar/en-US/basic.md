### Default

<!--start-code-->
```js
/**
 * .navbar-brand {
 *   padding: 18px 20px;
 *   display: inline-block;
 * }
 */
const instance = (
  <Navbar>
    <Navbar.Header>
      <a href="#" className="navbar-brand logo">RSUITE</a>
    </Navbar.Header>
    <Navbar.Body>
      <Nav>
        <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
        <Nav.Item>News</Nav.Item>
        <Nav.Item>Products</Nav.Item>
        <Dropdown title="About">
          <Dropdown.Item>Company</Dropdown.Item>
          <Dropdown.Item>Team</Dropdown.Item>
          <Dropdown.Item>Contact</Dropdown.Item>
        </Dropdown>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
      </Nav>
    </Navbar.Body>
  </Navbar>
);
ReactDOM.render(instance);
```
<!--end-code-->
