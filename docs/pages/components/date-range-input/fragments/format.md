<!--start-code-->

```js
import { DateRangeInput, Stack } from 'rsuite';

const App = () => (
  <Stack spacing={10} direction="column" align="flex-start" w={400}>
    <DateRangeInput format="MM/dd/yyyy" character=" – " />
    <DateRangeInput format="dd.MM.yyyy" />
    <DateRangeInput format="MMM dd, yyyy" />
    <DateRangeInput format="MMMM dd, yyyy" />
    <DateRangeInput format="yyyy年MM月dd日" />
    <DateRangeInput format="MM/dd/yyyy HH:mm" />
    <DateRangeInput format="MM/dd/yyyy hh:mm aa" />
    <DateRangeInput format="HH:mm:ss" />
    <DateRangeInput format="dd MMM yyyy hh:mm:ss aa" />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
