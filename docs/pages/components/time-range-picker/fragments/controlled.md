<!--start-code-->

```js
import { TimeRangePicker, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState([
    new Date('2024-10-01 01:00:00'),
    new Date('2024-10-01 02:00:00')
  ]);

  return (
    <Stack direction="column" spacing={8} alignItems="flex-start">
      <label>Controlled Value:</label>
      <TimeRangePicker value={value} onChange={setValue} />

      <label>Uncontrolled Value:</label>

      <TimeRangePicker
        defaultValue={[new Date('2024-10-01 01:00:00'), new Date('2024-10-01 02:00:00')]}
      />
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
