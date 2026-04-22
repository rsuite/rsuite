<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import { v } from 'valibot';

const schema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(3, 'Username must be at least 3 characters')
  ),
  email: v.pipe(v.string(), v.email('Invalid email address')),
  age: v.pipe(
    v.number('Must be a number'),
    v.minValue(18, 'Must be at least 18')
  )
});

const valibotResolver = schema => formValue => {
  const result = v.safeParse(schema, { ...formValue, age: Number(formValue.age) });
  if (result.success) return { errors: {} };
  const errors = {};
  result.issues.forEach(issue => {
    const key = issue.path?.[0]?.key;
    if (key && !errors[key]) {
      errors[key] = issue.message;
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
      resolver={valibotResolver(schema)}
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
