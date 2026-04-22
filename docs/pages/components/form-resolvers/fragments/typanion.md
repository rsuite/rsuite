<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import { makeValidator, isObject, isString, isNumber, applyCascade } from 'typanion';

const isMinLength = n =>
  makeValidator({
    test: (v, ctx) => {
      if (v.length < n) {
        ctx.errors.push(`${ctx.p}: Must be at least ${n} characters`);
        return false;
      }
      return true;
    }
  });

const isEmail = makeValidator({
  test: (v, ctx) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      ctx.errors.push(`${ctx.p}: Invalid email address`);
      return false;
    }
    return true;
  }
});

const isAdult = makeValidator({
  test: (v, ctx) => {
    if (Number(v) < 18) {
      ctx.errors.push(`${ctx.p}: Must be at least 18`);
      return false;
    }
    return true;
  }
});

const schema = isObject({
  username: applyCascade(isString(), [isMinLength(3)]),
  email: applyCascade(isString(), [isEmail]),
  age: applyCascade(isNumber(), [isAdult])
});

const typanionResolver = schema => formValue => {
  const fieldErrors = [];
  const valid = schema(
    { ...formValue, age: Number(formValue.age) },
    { errors: fieldErrors, coerce: false }
  );
  if (valid) return { errors: {} };
  const errors = {};
  fieldErrors.forEach(err => {
    const match = err.match(/^\.(\w+):\s*(.*)/);
    if (match && !errors[match[1]]) errors[match[1]] = match[2];
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
