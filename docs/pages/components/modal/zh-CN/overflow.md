### 滚动条

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      overflow: true
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open(event) {
    this.setState({ show: true });
  }
  render() {
    const { overflow, show } = this.state;
    return (
      <div className="modal-container">
        <span>Overflow </span>
        <Toggle
          checked={overflow}
          onChange={checked => {
            this.setState({ overflow: checked });
          }}
        />
        <hr />
        <ButtonToolbar>
          <Button onClick={this.open}>Open</Button>
        </ButtonToolbar>

        <Modal overflow={overflow} show={show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Paragraph rows={80} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Ok
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
