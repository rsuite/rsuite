### Appearance

`appearance` values include:

* 'default'
* 'tabs'
* 'subtle'

<!--start-code-->

```js
const styles = {
  marginBottom: 50
};

const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
      <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
        Home
      </Nav.Item>
      <Nav.Item eventKey="news">News</Nav.Item>
      <Nav.Item eventKey="solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="products">Products</Nav.Item>
      <Nav.Item eventKey="about">About</Nav.Item>
    </Nav>
  );
};

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 'home'
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(activeKey) {
    this.setState({ active: activeKey });
  }
  render() {
    const { active } = this.state;
    return (
      <div>
        <CustomNav active={active} onSelect={this.handleSelect} />
        <CustomNav appearance="tabs" active={active} onSelect={this.handleSelect} />
        <CustomNav appearance="tabs" reversed active={active} onSelect={this.handleSelect} />
        <CustomNav appearance="subtle" active={active} onSelect={this.handleSelect} />
        <CustomNav appearance="subtle" reversed active={active} onSelect={this.handleSelect} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->

> For subtle and tabs navigation, you can set a reversed property to reverse direction and fit all directions.
