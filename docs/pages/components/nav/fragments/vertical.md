<!--start-code-->

```js
const styles = { width: 100 };

const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} vertical activeKey={active} onSelect={onSelect} style={styles}>
      <Nav.Item eventKey="home" icon={<Home />}>
        Home
      </Nav.Item>
      <Nav.Item eventKey="news">News</Nav.Item>
      <Nav.Item eventKey="solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="products">Products</Nav.Item>
      <Nav.Item eventKey="about">About</Nav.Item>
    </Nav>
  );
};

const Demo = () => {
  const [active, setActive] = React.useState('home');

  return (
    <Row>
      <Col md={4}>
        <CustomNav active={active} onSelect={setActive} />
      </Col>

      <Col md={6}>
        <CustomNav appearance="tabs" active={active} onSelect={setActive} />
      </Col>
      <Col md={4}>
        <CustomNav appearance="tabs" reversed active={active} onSelect={setActive} />
      </Col>
      <Col md={6}>
        <CustomNav appearance="subtle" active={active} onSelect={setActive} />
      </Col>
      <Col md={4}>
        <CustomNav appearance="subtle" reversed active={active} onSelect={setActive} />
      </Col>
    </Row>
  );
};

ReactDOM.render(<Demo />);
```

<!--end-code-->
