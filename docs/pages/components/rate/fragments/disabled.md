<!--start-code-->

```js
import { Rate, HStack, Text, Divider, VStack } from 'rsuite';

const App = () => (
  <VStack divider={<Divider />}>
    <HStack>
      <Text muted w={80}>
        Disabled
      </Text>
      <Rate disabled defaultValue={2.5} allowHalf />
    </HStack>

    <HStack>
      <Text muted w={80}>
        ReadOnly
      </Text>
      <Rate readOnly defaultValue={2.5} allowHalf />
    </HStack>

    <HStack>
      <Text muted w={80}>
        Plaintext
      </Text>
      <Rate plaintext defaultValue={2.5} allowHalf />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
