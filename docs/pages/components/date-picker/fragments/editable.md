<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={6}>
    <DatePicker format="yyyy-MM" editable={false} />
    <DatePicker editable={false} />
    <DatePicker format="yyyy-MM-dd HH:mm" editable={false} />
    <DatePicker format="yyyy-MM-dd HH:mm:ss" editable={false} />
    <DatePicker format="HH:mm:ss" editable={false} />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
