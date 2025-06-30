<!--start-code-->

```js
import { TagInput, VStack, HStack, Text, Divider } from 'rsuite';

const App = () => (
  <VStack divider={<Divider />}>
    <HStack>
      <Text muted w={80}>
        Disabled
      </Text>
      <TagInput disabled defaultValue={['Julius']} w={300} />
    </HStack>
    <HStack>
      <Text muted w={80}>
        ReadOnly
      </Text>
      <TagInput readOnly defaultValue={['Julius']} w={300} />
    </HStack>
    <HStack>
      <Text muted w={80}>
        Plaintext
      </Text>
      <TagInput plaintext defaultValue={['Julius']} w={300} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
