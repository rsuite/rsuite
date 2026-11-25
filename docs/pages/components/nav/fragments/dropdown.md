<!--start-code-->

```js
import { Nav } from 'rsuite';

const App = () => (
  <Nav>
    <Nav.Item eventKey="products">Products</Nav.Item>
    <Nav.Menu title="Resources">
      <Nav.Item>Documentation</Nav.Item>
      <Nav.Item>Tutorials</Nav.Item>
      <Nav.Item>API Reference</Nav.Item>
      <Nav.Item>FAQ</Nav.Item>
      <Nav.Menu title="Community">
        <Nav.Item>Forum</Nav.Item>
        <Nav.Item>Blog</Nav.Item>
        <Nav.Item>GitHub</Nav.Item>
      </Nav.Menu>
    </Nav.Menu>
    <Nav.Item eventKey="services">Services</Nav.Item>
  </Nav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
