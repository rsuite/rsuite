<!--start-code-->

```js
import { NumberInput, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={10} w={200}>
    <Stack.Item>
      <label>Disabled:</label>
      <NumberInput disabled defaultValue={10} />
    </Stack.Item>

    <Stack.Item>
      <label>Read only:</label>
      <NumberInput readOnly defaultValue={10} />
    </Stack.Item>

    <Stack.Item>
      <label>Plaintext</label>
      <NumberInput plaintext defaultValue={10} />
    </Stack.Item>
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
