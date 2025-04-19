<!--start-code-->

```js
import { PinInput, VStack, Text } from 'rsuite';

const App = () => (
  <VStack spacing={16}>
    <PinInput placeholder="○" />

    <PinInput placeholder="P" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
