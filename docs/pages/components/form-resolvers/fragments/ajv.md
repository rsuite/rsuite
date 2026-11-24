<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    age: { type: 'number', minimum: 18 }
  },
  required: ['username', 'email', 'age']
};

const validate = ajv.compile(schema);

const ajvResolver = validate => formValue => {
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
      resolver={ajvResolver(validate)}
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
