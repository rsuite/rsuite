<!--start-code-->

```js
import { Form, HStack } from 'rsuite';

const App = () => (
  <Form layout="vertical">
    <Form.Group controlId="email-5">
      <Form.Control name="email" placeholder="Email" />
      <Form.Text>This field is required</Form.Text>
    </Form.Group>

    <Form.Group controlId="name-5">
      <HStack>
        <Form.Control name="name" placeholder="Name" />
        <Form.Text tooltip>This field is required</Form.Text>
      </HStack>
    </Form.Group>
  </Form>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
