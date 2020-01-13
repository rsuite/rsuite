### Controlled

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
 */

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value
    });
  }
  render() {
    return (
      <CheckPicker
        value={this.state.value}
        onChange={this.handleChange}
        data={data}
        style={{ width: 224 }}
      />
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
