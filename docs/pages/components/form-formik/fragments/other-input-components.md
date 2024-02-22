<!--start-code-->

```js
import { useFormik } from 'formik';
import { Input, Button, Form, DatePicker, Rate } from 'rsuite';
import * as Yup from 'yup';

const Field = ({ error, as: Component = Input, ...rest }) => {
  return (
    <Form.Group>
      <Component {...rest} />
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
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      rating: 3
    },
    validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Field
        as={DatePicker}
        name="date"
        value={formik.values.date}
        error={formik.errors.date}
        onChange={value => formik.setFieldValue('date', value)}
      />

      <Field
        as={Rate}
        name="rating"
        color="yellow"
        value={formik.values.rating}
        error={formik.errors.rating}
        onChange={value => formik.setFieldValue('rating', value)}
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
