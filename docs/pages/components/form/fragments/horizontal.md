<!--start-code-->

```js
import { Form, Input, ButtonToolbar, Button, HStack, VStack } from 'rsuite';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const App = () => (
  <Form layout="horizontal">
    <Form.Group controlId="name-6">
      <Form.ControlLabel>Username</Form.ControlLabel>
      <VStack>
        <Form.Control name="name" />
        <Form.HelpText>Required</Form.HelpText>
      </VStack>
    </Form.Group>
    <Form.Group controlId="email-6">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <HStack>
        <Form.Control name="email" type="email" />
        <Form.HelpText tooltip>Required</Form.HelpText>
      </HStack>
    </Form.Group>
    <Form.Group controlId="password-6">
      <Form.ControlLabel>Password</Form.ControlLabel>
      <Form.Control name="password" type="password" autoComplete="off" />
    </Form.Group>
    <Form.Group controlId="textarea-6">
      <Form.ControlLabel>Textarea</Form.ControlLabel>
      <Form.Control name="textarea" rows={5} accepter={Textarea} />
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
