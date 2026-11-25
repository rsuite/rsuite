<!--start-code-->

```js
import { Form, Input, ButtonToolbar, Button, HStack, VStack, Textarea } from 'rsuite';

const App = () => (
  <Form layout="horizontal">
    <Form.Group controlId="name-6">
      <Form.Label>Username</Form.Label>
      <VStack>
        <Form.Control name="name" />
        <Form.Text>Required</Form.Text>
      </VStack>
    </Form.Group>
    <Form.Group controlId="email-6">
      <Form.Label>Email</Form.Label>
      <HStack>
        <Form.Control name="email" type="email" />
        <Form.Text tooltip>Required</Form.Text>
      </HStack>
    </Form.Group>
    <Form.Group controlId="password-6">
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" type="password" autoComplete="off" />
    </Form.Group>
    <Form.Group controlId="textarea-6">
      <Form.Label>Textarea</Form.Label>
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
