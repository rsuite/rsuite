<!--start-code-->

```js
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Form } from 'rsuite';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Field = ({ as: Component = Input, field, error, ...rest }) => {
  return (
    <Form.Group>
      <Component
        id={field.name}
        value={field.value}
        onChange={value => field.onChange(value)}
        {...rest}
      />
      <Form.ErrorMessage show={!!error} placement="bottomStart">
        {error}
      </Form.ErrorMessage>
    </Form.Group>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required')
});

const App = () => {
  const defaultValues = {
    name: '',
    email: ''
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  const onSubmit = data => alert(JSON.stringify(data, null, 2));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field field={field} error={errors[field.name]?.message} placeholder="Name" />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field field={field} error={errors[field.name]?.message} placeholder="Email" />
        )}
      />

      <Button appearance="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
