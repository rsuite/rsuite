### Fade 淡进淡出

<!--start-code-->

```js
const Panel = React.forwardRef(({ ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    style={{
      background: '#000',
      width: 100,
      height: 160,
      overflow: 'hidden'
    }}
  >
    <p>Panel</p>
    <p>Content Content Content</p>
  </div>
));

class FadeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      show: true
    };
  }

  handleToggle() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div className="row">
        <Button onClick={this.handleToggle}>toggle</Button>
        <hr />
        <Fade in={this.state.show}>{(props, ref) => <Panel {...props} ref={ref} />}</Fade>
      </div>
    );
  }
}

ReactDOM.render(<FadeDemo />);
```

<!--end-code-->
