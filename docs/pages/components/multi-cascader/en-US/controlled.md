### Controlled

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ['1-1', '1-2', '1-3']
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    console.log('handleChange', value);
    this.setState({
      value
    });
  }
  render() {
    return (
      <MultiCascader
        data={data}
        style={{ width: 224 }}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
