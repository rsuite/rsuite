### 异步

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

class AsynExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate() {
    if (this.state.items.length === 0) {
      setTimeout(() => {
        this.setState({ items: data });
      }, 1000);
    }
  }
  render() {
    const { items } = this.state;
    return (
      <CheckPicker
        data={items}
        onOpen={this.handleUpdate}
        onSearch={this.handleUpdate}
        style={{ width: 224 }}
        renderMenu={menu => {
          if (items.length === 0) {
            return (
              <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                <Icon icon="spinner" spin /> 加载中...
              </p>
            );
          }
          return menu;
        }}
      />
    );
  }
}

ReactDOM.render(<AsynExample />);
```

<!--end-code-->
