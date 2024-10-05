<!--start-code-->

```js
import { TimePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <TimePicker size="lg" loading placeholder="Large" />
    <TimePicker size="md" loading placeholder="Medium" />
    <TimePicker size="sm" loading placeholder="Small" />
    <TimePicker size="xs" loading placeholder="Xsmall" />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
