<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <DatePicker size="lg" placeholder="Large" />
    <DatePicker size="md" placeholder="Medium" />
    <DatePicker size="sm" placeholder="Small" />
    <DatePicker size="xs" placeholder="Xsmall" />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
