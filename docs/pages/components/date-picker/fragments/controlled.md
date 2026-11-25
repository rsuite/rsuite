<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (value, event) => {
    setValue(value);
    console.log('Controlled Change', value);
  };

  return (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <label>Controlled Value:</label>
      <DatePicker value={value} onChange={handleChange} />

      <label>Uncontrolled Value:</label>
      <DatePicker defaultValue={new Date()} />
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
