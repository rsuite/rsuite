<!--start-code-->

```js
import { DateRangeInput, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState([new Date('2023-10-01'), new Date('2023-10-31')]);

  const handleChange = (value, event) => {
    setValue(value);
    console.log('Controlled Change', value);
  };

  return (
    <>
      <style type="text/css">{` .controlled-container .rs-stack-item { width: 230px; } `}</style>
      <Stack
        spacing={10}
        direction="column"
        alignItems="flex-start"
        className="controlled-container"
      >
        <label>Controlled Value:</label>
        <DateRangeInput value={value} onChange={handleChange} />

        <button onClick={() => setValue(null)}>Clear</button>

        <label>Uncontrolled Value:</label>
        <DateRangeInput defaultValue={value} />
      </Stack>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
