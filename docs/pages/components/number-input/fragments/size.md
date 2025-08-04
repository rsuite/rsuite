<!--start-code-->

```js
import { NumberInput, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={10} w={200}>
    <NumberInput size="lg" placeholder="lg" />
    <NumberInput size="md" placeholder="md" />
    <NumberInput size="sm" placeholder="sm" />
    <NumberInput size="xs" placeholder="xs" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
