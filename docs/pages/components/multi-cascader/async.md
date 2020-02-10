### 异步

<!--start-code-->

```js
function createNode() {
  return {
    label: `Node${(Math.random() * 1e18)
      .toString(36)
      .slice(0, 3)
      .toUpperCase()}`,
    value: Math.random() * 1e18,
    children: Math.random() > 0.5 ? [] : null
  };
}

function createChildren() {
  const children = [];
  for (let i = 0; i < Math.random() * 10; i++) {
    children.push(createNode());
  }
  return children;
}

function getChildrenByNode(node, callback) {
  setTimeout(() => {
    callback(createChildren());
  }, 500);
}

class AsynExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: createChildren()
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSelect(node, activePaths, concat, event) {
    if (node.children && !node.children.length) {
      getChildrenByNode(node, children => {
        this.setState({ data: concat(this.state.data, children) });
      });
    }
  }

  handleChange(value, event) {
    console.log(value, 'onChange');
    this.setState({ value });
  }

  renderMenu(children, menu, parentNode) {
    if (children.length === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <Icon icon="spinner" spin /> 加载中...
        </p>
      );
    }
    return menu;
  }
  render() {
    return (
      <div className="example-item">
        <MultiCascader
          block
          placeholder="请选择"
          data={this.state.data}
          renderMenu={this.renderMenu}
          onSelect={this.handleSelect}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<AsynExample />);
```

<!--end-code-->
