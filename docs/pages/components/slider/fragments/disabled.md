<!--start-code-->

```js
import { Slider, VStack, HStack, Text, Divider } from 'rsuite';

const App = () => (
  <VStack divider={<Divider />} >
    <HStack w="100%">
      <Text muted w={80}>
        Disabled
      </Text>
      <Slider disabled defaultValue={50} progress w="100%" />
    </HStack>
    <HStack w="100%">
      <Text muted w={80}>
        ReadOnly
      </Text>
      <Slider readOnly defaultValue={50} progress w="100%" />
    </HStack>
    <HStack w="100%">
      <Text muted w={80}>
        Plaintext
      </Text>
      <Slider plaintext defaultValue={50} progress w="100%" />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
