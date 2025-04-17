<!--start-code-->

```js
import { NumberInput, Stack } from 'rsuite';

const App = () => (
  <Stack w={200}>
    <NumberInput defaultValue={3.14159} step={0.00001} decimalSeparator="," />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
