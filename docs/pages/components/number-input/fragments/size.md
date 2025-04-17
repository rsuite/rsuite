<!--start-code-->

```js
import { NumberInput } from 'rsuite';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={10} w={200}>
    <NumberInput size="lg" placeholder="lg" />
    <NumberInput size="md" placeholder="md" />
    <NumberInput size="sm" placeholder="sm" />
    <NumberInput size="xs" placeholder="xs" />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
