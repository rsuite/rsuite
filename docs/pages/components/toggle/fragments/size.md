<!--start-code-->

```js
import { Toggle, Stack } from 'rsuite';

const App = () => (
  <Stack spacing={10} childrenRenderMode="clone">
    <Toggle size="lg">Large</Toggle>
    <Toggle size="md">Medium</Toggle>
    <Toggle size="sm">Small</Toggle>
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
