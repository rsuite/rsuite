<!--start-code-->

```js
import { Form, ButtonToolbar, Button, Input, InputGroup, InputNumber } from 'rsuite';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const App = () => (
  <Form fluid>
    <Form.Group controlId="name-1">
      <Form.Label>Username</Form.Label>
      <Form.Control name="name" />
      <Form.Text>Required</Form.Text>
    </Form.Group>
    <Form.Group controlId="email-1">
      <Form.Label>Email</Form.Label>
      <Form.Control name="email" type="email" />
      <Form.Text>Required</Form.Text>
    </Form.Group>
    <Form.Group controlId="password-1">
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" type="password" autoComplete="off" />
    </Form.Group>
    <Form.Group controlId="textarea-1">
      <Form.Label>Textarea</Form.Label>
      <Form.Control rows={5} name="textarea" accepter={Textarea} />
    </Form.Group>
    <Form.Group controlId="input-group">
      <Form.Label>Input Group</Form.Label>
      <InputGroup>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Form.Control name="input-group" />
      </InputGroup>
    </Form.Group>
    <Form.Group>
      <Form.Label>InputNumber</Form.Label>
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
