### Controlled

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({
      value
    });
    console.log(typeof value, value);
  }
  render() {
    return (
      <div style={{ width: 160 }}>
        <DatePicker value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
