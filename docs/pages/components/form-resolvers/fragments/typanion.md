<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import { makeValidator, t } from 'typanion';

const isEmail = makeValidator({
  test: (value, errors) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push('Invalid email address');
      return false;
    }
    return true;
  }
});

const isAdult = makeValidator({
  test: (value, errors) => {
    if (Number(value) < 18) {
      errors.push('Must be at least 18');
      return false;
    }
    return true;
  }
});

const schema = t.isObject({
  username: t.isString(),
  email: t.cascade(t.isString(), isEmail()),
  age: t.cascade(t.isNumber(), isAdult())
});

const typanionResolver = schema => formValue => {
  const errors = {};
  const coerced = { ...formValue, age: Number(formValue.age) };
  const fieldErrors = [];
  const valid = schema(coerced, { errors: fieldErrors });
  if (valid) return { errors: {} };
  fieldErrors.forEach(err => {
    const match = err.match(/At ([^:]+): (.*)/);
    if (match) {
      const field = match[1].replace(/^\.|^>/, '');
      if (!errors[field]) errors[field] = match[2];
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
      resolver={typanionResolver(schema)}
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
