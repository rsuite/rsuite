<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={6}>
    <DatePicker format="yyyy-MM" ranges={[]} />
    <DatePicker />
    <DatePicker format="yyyy-MM-dd HH:mm" />
    <DatePicker format="yyyy-MM-dd HH:mm:ss" />
    <DatePicker format="HH:mm:ss" ranges={[]} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
