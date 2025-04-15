<!--start-code-->

```js
import { Form, ButtonToolbar, Button, Input, HStack, Textarea } from 'rsuite';

const FormField = ({ name, label, text, ...props }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control name={name} {...props} />
    {text && <Form.Text>{text}</Form.Text>}
  </Form.Group>
);

const App = () => (
  <Form>
    {/* Default vertical layout */}
    <Form.Stack>
      <FormField name="name" label="Username" text="Username is required" />
      <FormField name="email" label="Email" text="Email is required" type="email" />
      <FormField name="password" label="Password" type="password" autoComplete="off" />
      <FormField name="textarea" label="Textarea" accepter={Textarea} rows={5} />
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
