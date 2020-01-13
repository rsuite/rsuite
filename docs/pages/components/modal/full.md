### 全屏

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open(size) {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="modal-container">
        <ButtonToolbar>
          <Button size="lg" onClick={this.open}>
            Open
          </Button>
        </ButtonToolbar>
        <Modal full show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Paragraph rows={8} />
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
