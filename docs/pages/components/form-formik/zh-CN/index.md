# Formik 集成

React Suite 可以与 Formik 无缝集成。本指南将向您展示如何在 React Suite 中使用 Formik。

## 使用

```jsx
import { useFormik } from 'formik';
import { Input, Button } from 'rsuite';

const App = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
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
      <Input
        name="email"
        value={formik.values.email}
        onChange={value => {
          formik.setFieldValue('email', value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## 演示

### 基础实例

<!--{include:`basic.md`}-->
