<!--start-code-->

```js
import { Form, ButtonToolbar, Button, Input, HStack } from 'rsuite';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const App = () => (
  <Form>
    <Form.Stack>
      <Form.Group controlId="name">
        <Form.Label>Username</Form.Label>
        <Form.Control name="name" />
        <Form.Text>Username is required</Form.Text>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <HStack>
          <Form.Control name="email" type="email" />
          <Form.Text tooltip>Email is required</Form.Text>
        </HStack>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" autoComplete="off" />
      </Form.Group>
      <Form.Group controlId="textarea">
        <Form.Label>Textarea</Form.Label>
        <Form.Control rows={5} name="textarea" accepter={Textarea} />
      </Form.Group>
      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary">Submit</Button>
          <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form.Stack>
  </Form>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
