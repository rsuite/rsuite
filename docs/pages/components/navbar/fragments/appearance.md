<!--start-code-->

```js
const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">RSUITE</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1" icon={<Home />}>
          Home
        </Nav.Item>
        <Nav.Item eventKey="2">News</Nav.Item>
        <Nav.Item eventKey="3">Products</Nav.Item>
        <Nav.Menu title="About">
          <Nav.Item eventKey="4">Company</Nav.Item>
          <Nav.Item eventKey="5">Team</Nav.Item>
          <Nav.Item eventKey="6">Contact</Nav.Item>
        </Nav.Menu>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<Cog />}>Settings</Nav.Item>
      </Nav>
    </Navbar>
  );
};

const Demo = () => {
  const [activeKey, setActiveKey] = React.useState(null);
  return (
    <div className="nav-wrapper">
      <NavBarInstance activeKey={activeKey} onSelect={setActiveKey} />
      <hr />
      <NavBarInstance appearance="inverse" activeKey={activeKey} onSelect={setActiveKey} />
      <hr />
      <NavBarInstance appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} />
    </div>
  );
};

ReactDOM.render(<Demo />);
```

<!--end-code-->
