<!--start-code-->

```js
import { Nav } from 'rsuite';

const App = () => (
  <>
    <Nav>
      <Nav.Item>Default Item</Nav.Item>
      <Nav.Item active>Active Item</Nav.Item>
      <Nav.Item disabled>Disabled Item</Nav.Item>
    </Nav>
    <br />

    <Nav appearance="tabs">
      <Nav.Item>Default Item</Nav.Item>
      <Nav.Item active>Active Item</Nav.Item>
      <Nav.Item disabled>Disabled Item</Nav.Item>
    </Nav>
    <br />

    <Nav appearance="subtle">
      <Nav.Item>Default Item</Nav.Item>
      <Nav.Item active>Active Item</Nav.Item>
      <Nav.Item disabled>Disabled Item</Nav.Item>
    </Nav>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
