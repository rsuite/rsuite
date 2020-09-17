### 异步

<!--start-code-->

```js
class AsynExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      values: [],
      loadingValues: []
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleOnExpand = this.handleOnExpand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderTreeIcon = this.renderTreeIcon.bind(this);
  }

  getChildren(activeNode) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          activeNode,
          children: [
            {
              label: 'Child Node',
              value: `${activeNode.refKey}-0`,
              children: []
            },
            {
              label: 'Child Node',
              value: `${activeNode.refKey}-1`,
              children: []
            }
          ]
        });
      }, 2000);
    });
  }

  handleChange(values) {
    this.setState({
      values
    });
  }

  handleOpen() {
    if (this.state.data.length === 0) {
      setTimeout(() => {
        this.setState({
          data: [
            {
              label: 'Parent Node',
              value: '0',
              children: []
            }
          ]
        });
      }, 1000);
    }
  }

  handleOnExpand(expandItemValues, activeNode, concat) {
    const { data, loadingValues } = this.state;
    if (activeNode.children.length === 0) {
      if (!loadingValues.includes(activeNode.value)) {
        this.setState({
          loadingValues: [...loadingValues, activeNode.value]
        });
      }

      this.getChildren(activeNode).then(response => {
        const { activeNode: node, children } = response;
        this.setState(prevState => {
          return {
            data: concat(data, children),
            loadingValues: prevState.loadingValues.filter(value => value !== node.value)
          };
        });
      });
    }
  }

  renderTreeIcon(node, expandIcon) {
    const { loadingValues } = this.state;
    if (loadingValues.includes(node.value)) {
      return <Icon style={{ verticalAlign: 'middle' }} icon="spinner" spin />;
    }
    return null;
  }

  render() {
    const { data, values } = this.state;
    return (
      <CheckTreePicker
        data={data}
        value={values}
        style={{ width: 280 }}
        onOpen={this.handleOpen}
        onExpand={this.handleOnExpand}
        onChange={this.handleChange}
        renderMenu={menu => {
          if (data.length === 0) {
            return (
              <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                <Icon icon="spinner" spin /> 加载中...
              </p>
            );
          }
          return menu;
        }}
        renderTreeIcon={this.renderTreeIcon}
      />
    );
  }
}

ReactDOM.render(<AsynExample />);
```

<!--end-code-->
