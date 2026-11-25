<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <DatePicker size="lg" loading placeholder="Large" />
    <DatePicker size="md" loading placeholder="Medium" />
    <DatePicker size="sm" loading placeholder="Small" />
    <DatePicker size="xs" loading placeholder="Xsmall" />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
