<!--start-code-->

```js
import { InputNumber } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={10}>
    <InputNumber size="lg" placeholder="lg" />
    <InputNumber size="md" placeholder="md" />
    <InputNumber size="sm" placeholder="sm" />
    <InputNumber size="xs" placeholder="xs" />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
