<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import nope from 'nope-validator';

const schema = nope.object().shape({
  username: nope.string().min(3, 'Username must be at least 3 characters').required('Required'),
  email: nope.string().email('Invalid email address').required('Required'),
  age: nope.number().min(18, 'Must be at least 18').required('Required')
});

const nopeResolver = schema => formValue => {
  const result = schema.validate({ ...formValue, age: Number(formValue.age) });
  if (!result) return { errors: {} };
  const errors = {};
  Object.entries(result).forEach(([key, message]) => {
    if (message) errors[key] = message;
  });
  return { errors };
};

const TextField = ({ name, label, ...rest }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control name={name} accepter={Input} {...rest} />
  </Form.Group>
);

const App = () => {
  const handleSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Form
      resolver={nopeResolver(schema)}
      onSubmit={handleSubmit}
      formDefaultValue={{ username: '', email: '', age: '' }}
      fluid
    >
      <TextField name="username" label="Username" />
      <TextField name="email" label="Email" />
      <TextField name="age" label="Age" type="number" />
      <Button appearance="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
