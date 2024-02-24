<!--start-code-->

```js
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, Rate, Button, Form } from 'rsuite';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Field = ({ as: Component, field, error, ...rest }) => {
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
  date: Yup.date().required('Date is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(2, 'Rating must be at least 2')
    .max(5, 'Rating must be at most 5')
});

const App = () => {
  const defaultValues = {
    date: new Date(),
    rating: 2
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
        name="date"
        control={control}
        render={({ field, fieldState }) => (
          <Field as={DatePicker} field={field} error={errors[field.name]?.message} />
        )}
      />

      <Controller
        name="rating"
        control={control}
        render={({ field, fieldState }) => (
          <Field as={Rate} field={field} error={errors[field.name]?.message} color="yellow" />
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
