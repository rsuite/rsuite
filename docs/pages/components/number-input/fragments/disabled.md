<!--start-code-->

```js
import { NumberInput, VStack, HStack, Text, Divider } from 'rsuite';

const App = () => (
  <VStack divider={<Divider />}>
    <HStack w={300}>
      <Text muted w={100}>
        Disabled
      </Text>
      <NumberInput disabled defaultValue={10} />
    </HStack>

    <HStack w={300}>
      <Text muted w={100}>
        ReadOnly
      </Text>
      <NumberInput readOnly defaultValue={10} />
    </HStack>

    <HStack w={300}>
      <Text muted w={100}>
        Plaintext
      </Text>
      <NumberInput plaintext defaultValue={10} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
