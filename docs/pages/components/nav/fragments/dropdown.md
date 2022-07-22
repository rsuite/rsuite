<!--start-code-->

```js
import { Nav } from 'rsuite';

const App = () => (
  <Nav>
    <Nav.Item active>Item A</Nav.Item>
    <Nav.Item>Item B</Nav.Item>
    <Nav.Item>Item C</Nav.Item>
    <Nav.Item>Item D</Nav.Item>
    <Nav.Menu title="Item E">
      <Nav.Item>Item E-1</Nav.Item>
      <Nav.Item>Item E-2</Nav.Item>
      <Nav.Item>Item E-3</Nav.Item>
      <Nav.Item>Item E-4</Nav.Item>
      <Nav.Menu title="Item E-4">
        <Nav.Item>Item E-4-1</Nav.Item>
        <Nav.Item active>Item E-4-2</Nav.Item>
        <Nav.Item>Item E-4-3</Nav.Item>
      </Nav.Menu>
    </Nav.Menu>
  </Nav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
