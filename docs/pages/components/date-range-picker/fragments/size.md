<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={6}>
    <DateRangePicker size="lg" placeholder="Large" />
    <DateRangePicker size="md" placeholder="Medium" />
    <DateRangePicker size="sm" placeholder="Small" />
    <DateRangePicker size="xs" placeholder="Xsmall" />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
