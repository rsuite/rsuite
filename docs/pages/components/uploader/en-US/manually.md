### Manually

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleReupload = this.handleReupload.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }
  handleUpload() {
    this.uploader.start();
  }
  handleReupload(file) {
    this.uploader.start(file);
  }
  render() {
    return (
      <div>
        <Uploader
          autoUpload={false}
          action="//jsonplaceholder.typicode.com/posts/"
          onChange={this.handleChange}
          ref={ref => {
            this.uploader = ref;
          }}
        />
        <hr />
        <Button disabled={!this.state.value.length} onClick={this.handleUpload}>
          Start Upload
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
