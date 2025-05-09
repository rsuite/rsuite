<!--start-code-->

```js
import { VStack, Input, Text } from 'rsuite';

const App = () => (
  <VStack>
    <VStack>
      <Text>type="date"</Text>
      <Input type="date" />
    </VStack>

    <VStack>
      <Text>type="datetime-local"</Text>
      <Input type="datetime-local" />
    </VStack>
    <VStack>
      <Text>type="week"</Text>
      <Input type="week" />
    </VStack>
    <VStack>
      <Text>type="time"</Text>
      <Input type="time" />
    </VStack>
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
