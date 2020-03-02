### Appearance

`appearance` values include:

* 'default'
* 'inverse'
* 'subtle'

<!--start-code-->

```js
/**
 * .navbar-brand {
 *   padding: 18px 20px;
 *   display: inline-block;
 * }
 */
const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Header>
        <a href="#" className="navbar-brand logo">
          RSUITE
        </a>
      </Navbar.Header>
      <Navbar.Body>
        <Nav onSelect={onSelect} activeKey={activeKey}>
          <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
            Home
          </Nav.Item>
          <Nav.Item eventKey="2">News</Nav.Item>
          <Nav.Item eventKey="3">Products</Nav.Item>
          <Dropdown title="About">
            <Dropdown.Item eventKey="4">Company</Dropdown.Item>
            <Dropdown.Item eventKey="5">Team</Dropdown.Item>
            <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
        <Nav pullRight>
          <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: null
    };
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    const { activeKey } = this.state;
    return (
      <div className="nav-wrapper">
        <NavBarInstance activeKey={activeKey} onSelect={this.handleSelect} />
        <hr />
        <NavBarInstance appearance="inverse" activeKey={activeKey} onSelect={this.handleSelect} />
        <hr />
        <NavBarInstance appearance="subtle" activeKey={activeKey} onSelect={this.handleSelect} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
