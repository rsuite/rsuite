<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.min': 'Username must be at least 3 characters',
    'any.required': 'Required'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email address',
      'any.required': 'Required'
    }),
  age: Joi.number().min(18).required().messages({
    'number.min': 'Must be at least 18',
    'any.required': 'Required'
  })
});

const joiResolver = schema => formValue => {
  const { error } = schema.validate(formValue, { abortEarly: false });
  if (!error) return { errors: {} };
  const errors = {};
  error.details.forEach(detail => {
    const key = detail.path[0];
    if (key) errors[key] = detail.message;
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
      resolver={joiResolver(schema)}
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
