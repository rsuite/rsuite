### Portal

<!--start-code-->

```js
class PortalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      show: false
    };
  }

  handleToggle() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const { show } = this.state;
    return (
      <div className="row">
        <Button onClick={this.handleToggle}>toggle</Button>
        <hr />
        <div
          ref={ref => {
            this.container = ref;
          }}
        >
          container
        </div>
        {show ? (
          <Portal
            container={() => {
              return this.container;
            }}
            onRendered={() => {
              console.log('onRendered');
            }}
          >
            <div style={{ height: 100, background: '#000' }}>Element</div>
          </Portal>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<PortalDemo />);
```

<!--end-code-->
