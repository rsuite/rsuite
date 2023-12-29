<!--start-code-->

```js
import { DateInput, Stack } from 'rsuite';

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <DateInput format="MM/dd/yyyy" />
    <DateInput format="dd.MM.yyyy" />
    <DateInput format="MMM dd, yyyy" />
    <DateInput format="MMMM dd, yyyy" />
    <DateInput format="yyyy年MM月dd日" />
    <DateInput format="MM/dd/yyyy HH:mm" />
    <DateInput format="MM/dd/yyyy hh:mm aa" />
    <DateInput format="HH:mm:ss" />
    <DateInput format="dd MMM yyyy hh:mm:ss aa" style={{ width: 220 }} />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
