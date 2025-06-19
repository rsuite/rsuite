<!--start-code-->

```js
import { Textarea, Text, VStack, HStack, Divider } from 'rsuite';

const App = () => (
  <VStack divider={<Divider />} >
    <HStack align="start">
      <Text muted w={80}>
        Disabled
      </Text>
      <Textarea placeholder="Default Textarea" w={300} disabled />
    </HStack>
    <HStack align="start">
      <Text muted w={80}>
        ReadOnly
      </Text>
      <Textarea placeholder="Default Textarea" w={300} readOnly />
    </HStack>
    <HStack align="start">
      <Text muted w={80}>
        Plaintext
      </Text>
      <Textarea placeholder="Default Textarea" w={300} plaintext />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
