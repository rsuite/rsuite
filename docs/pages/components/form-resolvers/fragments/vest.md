<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import { create, test, enforce, only } from 'vest';

const suite = create((formValue = {}, currentField) => {
  only(currentField);

  test('username', 'Username must be at least 3 characters', () => {
    enforce(formValue.username).longerThanOrEquals(3);
  });

  test('username', 'Required', () => {
    enforce(formValue.username).isNotEmpty();
  });

  test('email', 'Invalid email address', () => {
    enforce(formValue.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('email', 'Required', () => {
    enforce(formValue.email).isNotEmpty();
  });

  test('age', 'Must be at least 18', () => {
    enforce(Number(formValue.age)).greaterThanOrEquals(18);
  });
});

const vestResolver = suite => formValue => {
  const result = suite.run(formValue);
  const errors = {};
  const fieldErrors = result.getErrors();
  Object.keys(fieldErrors).forEach(field => {
    if (result.hasErrors(field)) {
      errors[field] = fieldErrors[field][0];
    }
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
      resolver={vestResolver(suite)}
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
