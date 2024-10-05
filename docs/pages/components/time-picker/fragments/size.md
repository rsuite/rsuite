<!--start-code-->

```js
import { TimePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <TimePicker size="lg" placeholder="Large" />
    <TimePicker size="md" placeholder="Medium" />
    <TimePicker size="sm" placeholder="Small" />
    <TimePicker size="xs" placeholder="Xsmall" />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
