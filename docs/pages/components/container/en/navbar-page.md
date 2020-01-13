### Navbar Layout

<!--start-code-->

```js
const instance = (
  <div className="show-fake-browser navbar-page">
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
            <a className="navbar-brand logo">BRAND</a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
              <Nav.Item>News</Nav.Item>
              <Nav.Item>Products</Nav.Item>
              <Dropdown title="About">
                <Dropdown.Item>Company</Dropdown.Item>
                <Dropdown.Item>Team</Dropdown.Item>
                <Dropdown.Item>Contact</Dropdown.Item>
              </Dropdown>
            </Nav>
            <Nav pullRight>
              <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Container>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
