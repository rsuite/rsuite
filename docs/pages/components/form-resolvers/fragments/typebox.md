<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = Type.Object({
  username: Type.String({ minLength: 3 }),
  email: Type.String({ format: 'email' }),
  age: Type.Number({ minimum: 18 })
});

const validate = ajv.compile(schema);

const typeBoxResolver = validate => formValue => {
  const values = { ...formValue, age: formValue.age === '' ? undefined : Number(formValue.age) };
  const valid = validate(values);
  if (valid) return { errors: {} };
  const errors = {};
  (validate.errors || []).forEach(err => {
    const field = err.instancePath.replace('/', '') || err.params?.missingProperty;
    if (field && !errors[field]) {
      if (err.keyword === 'minLength') {
        errors[field] = 'Username must be at least 3 characters';
      } else if (err.keyword === 'format') {
        errors[field] = 'Invalid email address';
      } else if (field === 'age' && err.keyword === 'required') {
        errors[field] = 'Required';
      } else if (err.keyword === 'minimum') {
        errors[field] = 'Must be at least 18';
      } else {
        errors[field] = err.message;
      }
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
      resolver={typeBoxResolver(validate)}
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
