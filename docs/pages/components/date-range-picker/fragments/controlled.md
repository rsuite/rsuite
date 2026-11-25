<!--start-code-->

```js
import { DateRangePicker, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState([
    new Date('2017-02-01 01:00:00'),
    new Date('2017-02-02 14:00:00')
  ]);

  return (
    <Stack direction="column" spacing={8} alignItems="flex-start">
      <label>Controlled Value:</label>
      <DateRangePicker value={value} onChange={setValue} />

      <DateRangePicker
        value={value}
        onChange={setValue}
        showMeridiem
        format="yyyy-MM-dd HH:mm:ss"
        defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
      />

      <label>Uncontrolled Value:</label>

      <DateRangePicker defaultValue={[new Date(), new Date()]} />
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
