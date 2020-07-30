### Layout In Modal

<!--start-code-->

```js
class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        email: '',
        password: '',
        textarea: ''
      },
      show: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  handleChange(value) {
    this.setState({
      formValue: value
    });
  }
  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fluid onChange={this.handleChange} formValue={this.state.formValue}>
              <FormGroup>
                <FormControlLabel>Username</FormControlLabel>
                <FormControl name="name" />
                <HelpBlock>Required</HelpBlock>
              </FormGroup>
              <FormGroup>
                <FormControlLabel>Email</FormControlLabel>
                <FormControl name="email" type="email" />
                <HelpBlock>Required</HelpBlock>
              </FormGroup>
              <FormGroup>
                <FormControlLabel>Password</FormControlLabel>
                <FormControl name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <FormControlLabel>Textarea</FormControlLabel>
                <FormControl rows={5} name="textarea" as="textarea" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Confirm
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={this.open}>New User</Button>
      </div>
    );
  }
}

ReactDOM.render(<ModalDemo />);
```

<!--end-code-->
