<!--start-code-->

```js
import { Nav, Row, Col } from 'rsuite';

const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} vertical activeKey={active} onSelect={onSelect} style={{ width: 100 }}>
      <Nav.Item eventKey="home">Home</Nav.Item>
      <Nav.Item eventKey="news">News</Nav.Item>
      <Nav.Item eventKey="solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="products">Products</Nav.Item>
      <Nav.Item eventKey="about">About</Nav.Item>
    </Nav>
  );
};

const App = () => {
  const [active, setActive] = React.useState('home');

  return (
    <Row>
      <Col md={4}>
        <CustomNav active={active} onSelect={setActive} />
      </Col>
      <Col md={4}>
        <CustomNav appearance="tabs" active={active} onSelect={setActive} />
      </Col>
      <Col md={4}>
        <CustomNav appearance="tabs" reversed active={active} onSelect={setActive} />
      </Col>
      <Col md={4}>
        <CustomNav appearance="subtle" active={active} onSelect={setActive} />
      </Col>
      <Col md={4}>
        <CustomNav appearance="subtle" reversed active={active} onSelect={setActive} />
      </Col>
      <Col md={4}>
        <CustomNav appearance="pills" reversed active={active} onSelect={setActive} />
      </Col>
    </Row>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
