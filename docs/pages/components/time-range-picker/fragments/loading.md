<!--start-code-->

```js
import { TimeRangePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <TimeRangePicker size="lg" loading placeholder="Large" />
    <TimeRangePicker size="md" loading placeholder="Medium" />
    <TimeRangePicker size="sm" loading placeholder="Small" />
    <TimeRangePicker size="xs" loading placeholder="Xsmall" />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
