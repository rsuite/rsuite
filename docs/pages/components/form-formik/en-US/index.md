# Formik integration

React Suite can be coupled smoothly with Formik. This guide will show you how to use Formik with React Suite.

## Usage

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

## Examples

### Basic Usage

<!--{include:`basic.md`}-->

### Validation

<!--{include:`validation.md`}-->

### Validation with Yup

<!--{include:`yup-schema-validation.md`}-->
