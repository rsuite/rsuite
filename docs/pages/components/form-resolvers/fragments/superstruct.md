<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import { object, string, number, size, min, refine } from 'superstruct';

const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const schema = object({
  username: size(string(), 3, Infinity),
  email: refine(string(), 'email', value => isEmail(value) || 'Invalid email address'),
  age: min(number(), 18)
});

const superstructResolver = schema => formValue => {
  const errors = {};
  try {
    schema.assert({ ...formValue, age: Number(formValue.age) });
  } catch (err) {
    for (const failure of err.failures()) {
      const key = failure.path[0];
      if (key && !errors[key]) {
        errors[key] = failure.message;
      }
    }
  }
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
      resolver={superstructResolver(schema)}
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
