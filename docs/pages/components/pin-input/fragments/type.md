<!--start-code-->

```jsx
import { PinInput, VStack, Text } from 'rsuite';

const App = () => (
  <VStack spacing={8}>
    <Text>Number only (default)</Text>
    <PinInput length={4} />

    <Text>Alphabetic only</Text>
    <PinInput length={4} type="alphabetic" />

    <Text>Alphanumeric</Text>
    <PinInput length={4} type="alphanumeric" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
