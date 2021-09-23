<!--start-code-->

```js
const styles = {
  marginBottom: 50,
};

const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
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
    <div>
      <CustomNav active={active} onSelect={setActive} />
      <CustomNav appearance="tabs" active={active} onSelect={setActive} />
      <CustomNav appearance="tabs" reversed active={active} onSelect={setActive} />
      <CustomNav appearance="subtle" active={active} onSelect={setActive} />
      <CustomNav appearance="subtle" reversed active={active} onSelect={setActive} />
    </div>
  );
};

ReactDOM.render(<Demo />);
```

<!--end-code-->
