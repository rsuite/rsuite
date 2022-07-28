<!--start-code-->

```js
import { Form } from 'rsuite';

const App = () => (
  <Form>
    <Form.Group controlId="email-5">
      <Form.Control name="email" placeholder="Email" />
      <Form.HelpText>This field is required</Form.HelpText>
    </Form.Group>

    <Form.Group controlId="name-5">
      <Form.Control name="name" placeholder="Name" />
      <Form.HelpText tooltip>This field is required</Form.HelpText>
    </Form.Group>
  </Form>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
