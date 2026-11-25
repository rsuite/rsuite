<!--start-code-->

```js
import { Form, Button, ButtonToolbar } from 'rsuite';
import { SchemaModel, StringType } from 'rsuite/Schema';

const model = SchemaModel({
  name: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.')
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.Label>{label} </Form.Label>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}
function App() {
  return (
    <Form model={model}>
      <Form.Stack>
        <TextField name="name" label="Username" />
        <TextField name="email" label="Email" />
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
