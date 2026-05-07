<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';

const isEmailFormat = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const Username = new t.Type(
  'Username',
  t.string.is,
  (input, context) => {
    const result = t.string.validate(input, context);
    if (isLeft(result)) {
      return result;
    }
    if (!result.right) {
      return t.failure(input, context, 'Required');
    }
    return result.right.length >= 3
      ? t.success(result.right)
      : t.failure(input, context, 'Username must be at least 3 characters');
  },
  t.identity
);

const Email = new t.Type(
  'Email',
  t.string.is,
  (input, context) => {
    const result = t.string.validate(input, context);
    if (isLeft(result)) {
      return result;
    }
    if (!result.right) {
      return t.failure(input, context, 'Required');
    }
    return isEmailFormat(result.right)
      ? t.success(result.right)
      : t.failure(input, context, 'Invalid email address');
  },
  t.identity
);

const Age = new t.Type(
  'Age',
  value => typeof value === 'number' && !Number.isNaN(value),
  (input, context) => {
    if (input === '') {
      return t.failure(input, context, 'Required');
    }
    const value = Number(input);
    if (Number.isNaN(value)) {
      return t.failure(input, context, 'Age must be a number');
    }
    return value >= 18 ? t.success(value) : t.failure(input, context, 'Must be at least 18');
  },
  String
);

const schema = t.type({
  username: Username,
  email: Email,
  age: Age
});

const ioTsResolver = codec => formValue => {
  const result = codec.decode(formValue);
  if (!isLeft(result)) return { errors: {} };
  const errors = {};
  result.left.forEach(error => {
    const field = error.context[error.context.length - 1].key;
    errors[field] = error.message || 'Invalid value';
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
      resolver={ioTsResolver(schema)}
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
