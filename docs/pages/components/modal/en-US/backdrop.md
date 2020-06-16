### Backdrop


When set to true, the Modal will display the background when it is opened. Clicking on the background will close the Modal. If you do not want to close the Modal, set it to 'static'.

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
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  render() {
    const { backdrop, show } = this.state;
    return (
      <div className="modal-container">
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
          <Button onClick={this.open}> Open</Button>
        </ButtonToolbar>

        <Modal backdrop={backdrop} show={show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Paragraph />
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
