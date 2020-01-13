### 外观

`appearance` 属性设置导航外观:

* 'default'(默认值) 默认导航。
* 'tabs' 标签式的导航。
* 'subtle' 弱化的导航。

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

> 针对 subtle/tabs 导航，可以设置一个 `reversed` 属性颠倒方向，用来适配导航在上下左右都可以使用。
