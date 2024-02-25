<!--start-code-->

```js
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Form } from 'rsuite';

const App = () => {
  const defaultValues = {
    name: '',
    email: ''
  };

  const { control, handleSubmit } = useForm({ defaultValues });

  const onSubmit = data => alert(JSON.stringify(data, null, 2));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Form.Group>
            <Input
              id={field.name}
              value={field.value}
              onChange={value => field.onChange(value)}
              placeholder="Name"
            />
          </Form.Group>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Form.Group>
            <Input
              id={field.name}
              value={field.value}
              onChange={value => field.onChange(value)}
              placeholder="Email"
            />
          </Form.Group>
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
