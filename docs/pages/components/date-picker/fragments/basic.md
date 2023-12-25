<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={6}>
    <DatePicker format="MM/dd/yyyy" />
    <DatePicker format="MM/dd/yyyy HH:mm" />
    <DatePicker format="MM/dd/yyyy HH:mm:ss" />
    <DatePicker format="MM/yyyy" ranges={[]} />
    <DatePicker format="HH:mm:ss" ranges={[]} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
