<!--start-code-->

```js
import { Form, Button, Input } from 'rsuite';
import { IsEmail, IsNotEmpty, Min, MinLength, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// Note: class-validator uses TypeScript decorators.
// This example requires a TypeScript project with
// experimentalDecorators and emitDecoratorMetadata enabled.

class UserDto {
  @IsNotEmpty({ message: 'Required' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  username;

  @IsNotEmpty({ message: 'Required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email;

  @Min(18, { message: 'Must be at least 18' })
  age;
}

const classValidatorResolver = Dto => formValue => {
  const instance = plainToInstance(Dto, { ...formValue, age: Number(formValue.age) });
  const validationErrors = validateSync(instance, { skipMissingProperties: false });
  if (!validationErrors.length) return { errors: {} };
  const errors = {};
  validationErrors.forEach(err => {
    errors[err.property] = Object.values(err.constraints || {})[0];
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
      resolver={classValidatorResolver(UserDto)}
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
