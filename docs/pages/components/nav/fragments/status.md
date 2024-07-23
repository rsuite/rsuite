<!--start-code-->

```js
import { Nav, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={30}>
    <Nav defaultActiveKey="1">
      <Nav.Item eventKey="1">Item 1</Nav.Item>
      <Nav.Item eventKey="2" disabled>
        Item 2
      </Nav.Item>
      <Nav.Item eventKey="3">Item 3</Nav.Item>
    </Nav>

    <Nav appearance="tabs" defaultActiveKey="1">
      <Nav.Item eventKey="1">Item 1</Nav.Item>
      <Nav.Item eventKey="2" disabled>
        Item 2
      </Nav.Item>
      <Nav.Item eventKey="3">Item 3</Nav.Item>
    </Nav>

    <Nav appearance="subtle" defaultActiveKey="1">
      <Nav.Item eventKey="1">Item 1</Nav.Item>
      <Nav.Item eventKey="2" disabled>
        Item 2
      </Nav.Item>
      <Nav.Item eventKey="3">Item 3</Nav.Item>
    </Nav>

    <Nav appearance="pills" defaultActiveKey="1">
      <Nav.Item eventKey="1">Item 1</Nav.Item>
      <Nav.Item eventKey="2" disabled>
        Item 2
      </Nav.Item>
      <Nav.Item eventKey="3">Item 3</Nav.Item>
    </Nav>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
