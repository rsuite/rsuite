<!--start-code-->

```js
import { DateRangeInput, Stack, Button } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState([new Date('2023-10-01'), new Date('2023-10-31')]);

  const handleChange = (value, event) => {
    setValue(value);
    console.log('Controlled Change', value);
  };

  return (
    <Stack spacing={10} direction="column" align="flex-start" w={230}>
      <label>Controlled Value:</label>
      <DateRangeInput value={value} onChange={handleChange} />

      <Button onClick={() => setValue(null)}>Clear</Button>

      <label>Uncontrolled Value:</label>
      <DateRangeInput defaultValue={value} />
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
