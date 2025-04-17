<!--start-code-->

```js
import { PinInput, VStack, Text } from 'rsuite';

const App = () => (
  <VStack spacing={16}>
    <Text>6 digits</Text>
    <PinInput length={6} />
    <Text>8 digits</Text>
    <PinInput length={8} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
