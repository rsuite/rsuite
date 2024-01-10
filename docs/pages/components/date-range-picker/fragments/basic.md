<!--start-code-->

```js
import { DateRangePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={6}>
    <DateRangePicker format="MM/dd/yyyy" />
    <DateRangePicker format="MM/dd/yyyy HH:mm" />
    <DateRangePicker format="MM/dd/yyyy HH:mm:ss" />
    <DateRangePicker format="MM/yyyy" />
    <DateRangePicker format="hh:mm aa" />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
