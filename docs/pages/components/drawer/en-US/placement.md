### Placement

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  close() {
    this.setState({
      show: false
    });
  }
  toggleDrawer(placement) {
    this.setState({
      placement,
      show: true
    });
  }
  render() {
    return (
      <div>
        <ButtonToolbar>
          <IconButton
            icon={<Icon icon="angle-right" />}
            onClick={() => this.toggleDrawer('left')}
          >
            Left
          </IconButton>
          <IconButton
            icon={<Icon icon="angle-left" />}
            onClick={() => this.toggleDrawer('right')}
          >
            Right
          </IconButton>
          <IconButton
            icon={<Icon icon="angle-down" />}
            onClick={() => this.toggleDrawer('top')}
          >
            Top
          </IconButton>
          <IconButton
            icon={<Icon icon="angle-up" />}
            onClick={() => this.toggleDrawer('bottom')}
          >
            Bottom
          </IconButton>
        </ButtonToolbar>

        <Drawer
          placement={this.state.placement}
          show={this.state.show}
          onHide={this.close}
        >
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Paragraph />
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={this.close} appearance="primary">
              Confirm
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Drawer.Footer>
        </Drawer>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
