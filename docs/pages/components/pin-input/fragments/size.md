<!--start-code-->

```js
import { PinInput, VStack, Text } from 'rsuite';

const App = () => (
  <VStack spacing={16}>
    <Text>Large</Text>
    <PinInput length={4} size="lg" />
    <Text>Medium</Text>
    <PinInput length={4} size="md" />
    <Text>Small</Text>
    <PinInput length={4} size="sm" />
    <Text>Extra Small</Text>
    <PinInput length={4} size="xs" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
