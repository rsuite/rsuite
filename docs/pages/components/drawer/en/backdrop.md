### Backdrop

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
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
  toggleDrawer() {
    this.setState({ show: true });
  }
  render() {
    const { backdrop, show } = this.state;

    return (
      <div>
        <span>Backdrop: </span>
        <RadioGroup
          name="radioList"
          inline
          value={backdrop}
          onChange={value => {
            this.setState({ backdrop: value });
          }}
        >
          <Radio value={true}>true</Radio>
          <Radio value={false}>false</Radio>
          <Radio value="static">static</Radio>
        </RadioGroup>
        <hr />

        <ButtonToolbar>
          <Button onClick={this.toggleDrawer}>Open</Button>
        </ButtonToolbar>
        <Drawer backdrop={backdrop} show={show} onHide={this.close}>
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
