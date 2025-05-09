<!--start-code-->

```js
import { NumberInput, VStack, HStack, Text } from 'rsuite';

const App = () => (
  <VStack spacing={10} >
    <HStack  w={300}>
      <Text w={100}>Disabled:</Text>
      <NumberInput disabled defaultValue={10} />
    </HStack>

    <HStack w={300}>
      <Text w={100}>Read only:</Text>
      <NumberInput readOnly defaultValue={10} />
    </HStack>

    <HStack w={300}>
      <Text w={100}>Plaintext</Text>
      <NumberInput plaintext defaultValue={10} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
