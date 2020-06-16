### 级联选择

`cascade` 属性可以设置 CheckTree 在选择的时候是否可考虑子父级的级联关系，默认为 `true`。

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

class Demo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      cascade: false
    };
  }
  render() {
    return (
      <div>
        Cascade:{' '}
        <Toggle
          checked={this.state.cascade}
          onChange={checked => {
            this.setState({
              cascade: checked
            });
          }}
        />
        <hr />
        <CheckTree
          defaultExpandAll
          cascade={this.state.cascade}
          defaultValue={[2, 38]}
          data={data}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
