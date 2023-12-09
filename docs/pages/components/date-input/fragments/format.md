<!--start-code-->

```js
import { DateInput, Stack } from 'rsuite';

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <DateInput />
    <DateInput format="MM/dd/yyyy" />
    <DateInput format="MMM dd, yyyy" />
    <DateInput format="MMMM dd, yyyy" />
    <DateInput format="yyyy年MM月dd日" />
    <DateInput format="MM/dd/yyyy HH:mm" />
    <DateInput format="MM/dd/yyyy hh:mm aa" />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
