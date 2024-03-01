<!--start-code-->

```js
import { InputNumber, Stack } from 'rsuite';

const App = () => (
  <Stack>
    <InputNumber defaultValue={0.01} step={0.01} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
