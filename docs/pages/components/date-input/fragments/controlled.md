<!--start-code-->

```js
import { DateInput, Stack, Button } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (value, event) => {
    setValue(value);
    console.log('Controlled Change', value);
  };

  return (
    <Stack spacing={10} direction="column" align="flex-start" w={220}>
      <label>Controlled Value:</label>
      <DateInput value={value} onChange={handleChange} />
      <Button onClick={() => setValue(null)}>Clear</Button>
      <label>Uncontrolled Value:</label>
      <DateInput defaultValue={new Date()} />
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
