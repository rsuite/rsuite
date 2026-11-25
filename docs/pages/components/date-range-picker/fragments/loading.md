<!--start-code-->

```js
import { DateRangePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <DateRangePicker size="lg" loading placeholder="Large" />
    <DateRangePicker size="md" loading placeholder="Medium" />
    <DateRangePicker size="sm" loading placeholder="Small" />
    <DateRangePicker size="xs" loading placeholder="Xsmall" />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
