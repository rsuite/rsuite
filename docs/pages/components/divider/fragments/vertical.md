<!--start-code-->

```js
import { Divider, Button } from 'rsuite';

const App = () => (
  <HStack spacing={0}>
    <label>Edit</label>
    <Divider vertical size="xs" />
    <label>Update</label>
    <Divider vertical size="sm" />
    <label>Save</label>
    <Divider vertical size="md" />
    <label>Close</label>
    <Divider vertical size="lg" />
    <label>Cancel</label>
    <Divider vertical size="xl" />
    <label>Apply</label>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
