<!--start-code-->

```js
import { Form, Button, Panel } from 'rsuite';
import { SchemaModel, StringType } from 'rsuite/Schema';

const nameRule = StringType().isRequired('This field is required.');
const emailRule = StringType().isEmail('Please enter a valid email address.');

function UsernameField() {
  return (
    <Form.Group controlId="name">
      <Form.Label>Username</Form.Label>
      <Form.Control name="name" rule={nameRule} />
    </Form.Group>
  );
}

function EmailField() {
  return (
    <Form.Group controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control name="email" rule={emailRule} />
    </Form.Group>
  );
}

function App() {
  return (
    <Form>
      <Form.Stack>
        <UsernameField />
        <EmailField />
      </Form.Stack>
      <ButtonToolbar mt={20}>
        <Button appearance="primary" type="submit">
          Submit
        </Button>
      </ButtonToolbar>
    </Form>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
