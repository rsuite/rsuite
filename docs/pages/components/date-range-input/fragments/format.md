<!--start-code-->

```js
import { DateRangeInput, Stack } from 'rsuite';

const App = () => (
  <>
    <style type="text/css">{` .format-container .rs-stack-item { width: 380px; } `}</style>
    <Stack spacing={10} direction="column" alignItems="flex-start" className="format-container">
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
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
