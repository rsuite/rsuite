### Confirm

<!--start-code-->

```js
class Confirm extends React.Component {
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
  open() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="modal-container">
        <ButtonToolbar>
          <Button onClick={this.open}> Open</Button>
        </ButtonToolbar>

        <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
          <Modal.Body>
            <Icon
              icon="remind"
              style={{
                color: '#ffb300',
                fontSize: 24
              }}
            />
            {'  '}
            Once a project is disabled, there will be no update on project report, and project
            members can access history data only. Are you sure you want to proceed?
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

ReactDOM.render(<Confirm />);
```

<!--end-code-->
