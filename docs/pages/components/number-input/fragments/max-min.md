<!--start-code-->

```js
import { NumberInput, Stack } from 'rsuite';

const App = () => (
  <Stack w={200}>
    <NumberInput defaultValue={10} max={100} min={10} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
