<!--start-code-->

```js
import { InlineEdit, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <InlineEdit size="lg" defaultValue="InlineEdit Large" w={300} />
    <InlineEdit size="md" defaultValue="InlineEdit Medium" w={300} />
    <InlineEdit size="sm" defaultValue="InlineEdit Small" w={300} />
    <InlineEdit size="xs" defaultValue="InlineEdit Extra Small" w={300} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
