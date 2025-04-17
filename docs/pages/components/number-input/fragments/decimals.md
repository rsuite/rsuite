<!--start-code-->

```js
import { NumberInput, Stack } from 'rsuite';

const App = () => (
  <Stack w={200}>
    <NumberInput defaultValue={0.01} step={0.01} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
