<!--start-code-->

```js
import { InlineEdit, Stack } from 'rsuite';

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <InlineEdit size="lg" defaultValue="InlineEdit Large" style={{ width: 300 }} />
    <InlineEdit size="md" defaultValue="InlineEdit Medium" style={{ width: 300 }} />
    <InlineEdit size="sm" defaultValue="InlineEdit Small" style={{ width: 300 }} />
    <InlineEdit size="xs" defaultValue="InlineEdit Extra Small" style={{ width: 300 }} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
