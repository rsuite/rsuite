<!--start-code-->

```js
import { InputNumber, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={10}>
    <Stack.Item>
      <label>Disabled:</label>
      <InputNumber disabled defaultValue={10} />
    </Stack.Item>

    <Stack.Item>
      <label>Read only:</label>
      <InputNumber readOnly defaultValue={10} />
    </Stack.Item>

    <Stack.Item>
      <label>Plaintext</label>
      <InputNumber plaintext defaultValue={10} />
    </Stack.Item>
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
