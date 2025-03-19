<!--start-code-->

```js
import { InputNumber, Stack } from 'rsuite';

const App = () => (
  <Stack w={200}>
    <InputNumber defaultValue={10} max={100} min={10} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
