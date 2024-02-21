<!--start-code-->

```js
import { useFormik } from 'formik';
import { Input, Button, Stack } from 'rsuite';

const App = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={10}>
        <Input
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={value => {
            formik.setFieldValue('name', value);
          }}
        />
        <Input
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={value => {
            formik.setFieldValue('email', value);
          }}
        />
        <Button appearance="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
