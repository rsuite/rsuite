<!--start-code-->

```js
import { DateInput, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (value, event) => {
    setValue(value);
    console.log('Controlled Change', value);
  };

  return (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <label>Controlled Value:</label>
      <DateInput value={value} onChange={handleChange} />
      <button onClick={() => setValue(null)}>Clear</button>
      <label>Uncontrolled Value:</label>
      <DateInput defaultValue={new Date()} />
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
