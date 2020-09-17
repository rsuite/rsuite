### Controlled

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.01
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    console.log(typeof value, value);
    this.setState({
      value
    });
  }
  render() {
    return (
      <div style={{ width: 160 }}>
        <InputNumber value={this.state.value} onChange={this.handleChange} step={0.01} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
