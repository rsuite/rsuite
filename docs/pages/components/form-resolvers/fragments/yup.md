<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Username must be at least 3 characters').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  age: Yup.number().min(18, 'Must be at least 18').required('Required')
});

const yupResolver = schema => async formValue => {
  try {
    await schema.validate(formValue, { abortEarly: false });
    return { errors: {} };
  } catch (err) {
    const errors = {};
    err.inner.forEach(e => {
      if (e.path) errors[e.path] = e.message;
    });
    return { errors };
  }
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
      resolver={yupResolver(validationSchema)}
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
