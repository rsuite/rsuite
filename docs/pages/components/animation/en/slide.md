### Slide

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
      placement: 'right',
      show: true
    };
  }

  handleToggle(placement) {
    this.setState({
      placement,
      show: !this.state.show
    });
  }

  render() {
    return (
      <div className="row">
        <ButtonToolbar>
          <Button onClick={this.handleToggle.bind(this, 'left')}>Slide Left</Button>
          <Button onClick={this.handleToggle.bind(this, 'right')}>Slide Right</Button>
          <Button onClick={this.handleToggle.bind(this, 'top')}>Slide Top</Button>
          <Button onClick={this.handleToggle.bind(this, 'bottom')}>Slide Bottom</Button>
        </ButtonToolbar>
        <hr />
        <Slide in={this.state.show} placement={this.state.placement}>
          {(props, ref) => <Panel {...props} ref={ref} />}
        </Slide>
      </div>
    );
  }
}

ReactDOM.render(<FadeDemo />);
```

<!--end-code-->
