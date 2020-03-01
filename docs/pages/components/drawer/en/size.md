### Size

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'xs',
      show: false
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
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
  handleChangeSize(size) {
    this.setState({ size });
  }
  render() {
    const { size, placement, show } = this.state;

    return (
      <div>
        <ButtonToolbar>
          <RadioGroup inline value={size} onChange={this.handleChangeSize}>
            <Radio value="lg">Large</Radio>
            <Radio value="md">Medium</Radio>
            <Radio value="sm">Small</Radio>
            <Radio value="xs">Xsmall</Radio>
          </RadioGroup>
        </ButtonToolbar>
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
          size={size}
          placement={placement}
          show={show}
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
