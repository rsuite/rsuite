<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = Type.Object({
  username: Type.String({ minLength: 3, errorMessage: 'Username must be at least 3 characters' }),
  email: Type.String({ format: 'email', errorMessage: 'Invalid email address' }),
  age: Type.Number({ minimum: 18, errorMessage: 'Must be at least 18' })
});

const validate = ajv.compile(schema);

const typeBoxResolver = validate => formValue => {
  const valid = validate({ ...formValue, age: Number(formValue.age) });
  if (valid) return { errors: {} };
  const errors = {};
  (validate.errors || []).forEach(err => {
    const field = err.instancePath.replace('/', '') || err.params?.missingProperty;
    if (field && !errors[field]) {
      errors[field] = err.message;
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
