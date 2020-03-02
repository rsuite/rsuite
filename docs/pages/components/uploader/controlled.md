### 受控的

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }
  render() {
    return (
      <div>
        <Uploader
          fileList={this.state.value}
          action="//jsonplaceholder.typicode.com/posts/"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
