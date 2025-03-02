<!--start-code-->

```js
import { Divider, Button, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={0}>
    <Divider vertical size="xs" />
    <label>Xsmall</label>

    <Divider vertical size="sm" />
    <label>Small</label>

    <Divider vertical size="md" />
    <label>Medium</label>

    <Divider vertical size="lg" />
    <label>Large</label>

    <Divider vertical size="xl" />
    <label>Extra Large</label>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
