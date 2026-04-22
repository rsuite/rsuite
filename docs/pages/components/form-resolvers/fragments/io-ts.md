<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';
import { PathReporter } from 'io-ts/PathReporter';

const isEmailFormat = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const Email = new t.Type(
  'Email',
  t.string.is,
  (input, context) =>
    t.string.validate(input, context).chain(s =>
      isEmailFormat(s) ? t.success(s) : t.failure(input, context, 'Invalid email address')
    ),
  t.identity
);

const schema = t.type({
  username: t.string,
  email: Email,
  age: t.number
});

const ioTsResolver = codec => formValue => {
  const result = codec.decode({ ...formValue, age: Number(formValue.age) });
  if (!isLeft(result)) return { errors: {} };
  const errors = {};
  PathReporter.report(result).forEach(msg => {
    const match = msg.match(/Invalid value .* supplied to .*\/(\w+)/);
    if (match) errors[match[1]] = msg;
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
