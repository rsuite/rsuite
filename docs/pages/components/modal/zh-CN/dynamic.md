### 动态的

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      overflow: true,
      rows: 0
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.resetRows = this.resetRows.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  resetRows() {
    this.setState({ rows: 0 });
  }
  open(event) {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({
        rows: 80
      });
    }, 2000);
  }
  render() {
    const { overflow, show } = this.state;
    return (
      <div className="modal-container">
        <ButtonToolbar>
          <Button onClick={this.open}>Open</Button>
        </ButtonToolbar>

        <Modal show={show} onHide={this.close} onExited={this.resetRows}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.rows ? (
              <Paragraph rows={this.state.rows} />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Loader size="md" />
              </div>
            )}
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
