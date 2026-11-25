```jsx
import { useFormik } from 'formik';
import { Input, Button } from 'rsuite';

const App = () => {
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name="name"
        value={formik.values.name}
        onChange={value => {
          formik.setFieldValue('name', value);
        }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```
