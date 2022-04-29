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
              <Nav.Item icon={<Home />}>Home</Nav.Item>
              <Nav.Item>News</Nav.Item>
              <Nav.Item>Products</Nav.Item>
              <Nav.Menu title="About">
                <Nav.Item>Company</Nav.Item>
                <Nav.Item>Team</Nav.Item>
                <Nav.Item>Contact</Nav.Item>
              </Nav.Menu>
            </Nav>
            <Nav pullRight>
              <Nav.Item icon={<Cog />}>Settings</Nav.Item>
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
