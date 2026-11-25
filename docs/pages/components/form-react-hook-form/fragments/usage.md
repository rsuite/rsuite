```jsx
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Form } from 'rsuite';

const App = () => {
  const defaultValues = { name: '' };
  const { control, handleSubmit } = useForm({ defaultValues });
  const onSubmit = data => alert(JSON.stringify(data, null, 2));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            id={field.name}
            value={field.value}
            onChange={value => field.onChange(value)}
            placeholder="Name"
          />
        )}
      />

      <Button appearance="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
```
