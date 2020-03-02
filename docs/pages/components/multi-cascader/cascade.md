### 级联选择

<!--start-code-->

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      cascade: true,
      value: []
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleToggle(checked) {
    this.setState({
      value: [],
      cascade: checked
    });
  }
  handleChange(value) {
    this.setState({
      value
    });
  }
  render() {
    return (
      <div>
        Cascade:{' '}
        <Toggle checked={this.state.cascade} onChange={this.handleToggle} />
        <hr />
        <MultiCascader
          style={{ width: 280 }}
          data={data}
          value={this.state.value}
          cascade={this.state.cascade}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
