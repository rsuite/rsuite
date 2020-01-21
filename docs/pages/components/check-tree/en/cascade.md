### Cascade

The `cascade` attribute can set whether or not CheckTree can consider the cascade relationship of the parent parent when selecting. The default value is `true`.

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/en/city-simplified.json
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
