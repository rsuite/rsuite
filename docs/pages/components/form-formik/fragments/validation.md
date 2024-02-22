<!--start-code-->

```js
import { useFormik } from 'formik';
import { Input, Button, Form } from 'rsuite';

const Field = ({ error, ...rest }) => {
  return (
    <Form.Group>
      <Input {...rest} />
      <Form.ErrorMessage show={!!error} placement="bottomStart">
        {error}
      </Form.ErrorMessage>
    </Form.Group>
  );
};

const App = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    },
    validate: values => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Required';
      }
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Field
        name="name"
        placeholder="Name"
        value={formik.values.name}
        error={formik.errors.name}
        onChange={value => formik.setFieldValue('name', value)}
      />

      <Field
        name="email"
        placeholder="Email"
        value={formik.values.email}
        error={formik.errors.email}
        onChange={value => formik.setFieldValue('email', value)}
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
