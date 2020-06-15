### Justified

<!--start-code-->
```js
const instance = (
  <div>
    <Nav justified>
      <Nav.Item active icon={<Icon icon="home" />}  >Home</Nav.Item>
      <Nav.Item>News</Nav.Item>
      <Nav.Item>Solutions</Nav.Item>
      <Nav.Item>Products</Nav.Item>
      <Nav.Item>About</Nav.Item>
    </Nav>
    <br />
    <Nav appearance="tabs" justified>
      <Nav.Item active icon={<Icon icon="home" />}  >Home</Nav.Item>
      <Nav.Item>News</Nav.Item>
      <Nav.Item>Solutions</Nav.Item>
      <Nav.Item>Products</Nav.Item>
      <Nav.Item>About</Nav.Item>
    </Nav>
    <br />
    <Nav appearance="subtle" justified>
      <Nav.Item active icon={<Icon icon="home" />}  >Home</Nav.Item>
      <Nav.Item>News</Nav.Item>
      <Nav.Item>Solutions</Nav.Item>
      <Nav.Item>Products</Nav.Item>
      <Nav.Item>About</Nav.Item>
    </Nav>
  </div>
);
ReactDOM.render(instance);
```
<!--end-code-->