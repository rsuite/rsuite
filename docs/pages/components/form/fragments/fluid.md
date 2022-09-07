<!--start-code-->

```js
import { Form, ButtonToolbar, Button, Input, InputGroup, InputNumber } from 'rsuite';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const App = () => (
  <Form fluid>
    <Form.Group controlId="name-1">
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control name="name" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="email-1">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="password-1">
      <Form.ControlLabel>Password</Form.ControlLabel>
      <Form.Control name="password" type="password" autoComplete="off" />
    </Form.Group>
    <Form.Group controlId="textarea-1">
      <Form.ControlLabel>Textarea</Form.ControlLabel>
      <Form.Control rows={5} name="textarea" accepter={Textarea} />
    </Form.Group>
    <Form.Group controlId="input-group">
      <Form.ControlLabel>Input Group</Form.ControlLabel>
      <InputGroup>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Form.Control name="input-group" />
      </InputGroup>
    </Form.Group>
    <Form.Group>
      <Form.ControlLabel>InputNumber</Form.ControlLabel>
      <Form.Control name="numder" accepter={InputNumber} />
    </Form.Group>
    <Form.Group>
      <ButtonToolbar>
        <Button appearance="primary">Submit</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
    </Form.Group>
  </Form>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
