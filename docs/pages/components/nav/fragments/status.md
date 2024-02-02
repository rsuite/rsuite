<!--start-code-->

```js
import { Nav } from 'rsuite';

const App = () => (
  <>
    <Nav defaultActiveKey="1">
      <Nav.Item eventKey="1">Item 1</Nav.Item>
      <Nav.Item eventKey="2" disabled>
        Item 2
      </Nav.Item>
      <Nav.Item eventKey="3">Item 3</Nav.Item>
    </Nav>
    <br />

    <Nav appearance="tabs" defaultActiveKey="1">
      <Nav.Item eventKey="1">Item 1</Nav.Item>
      <Nav.Item eventKey="2" disabled>
        Item 2
      </Nav.Item>
      <Nav.Item eventKey="3">Item 3</Nav.Item>
    </Nav>
    <br />

    <Nav appearance="subtle" defaultActiveKey="1">
      <Nav.Item eventKey="1">Item 1</Nav.Item>
      <Nav.Item eventKey="2" disabled>
        Item 2
      </Nav.Item>
      <Nav.Item eventKey="3">Item 3</Nav.Item>
    </Nav>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
