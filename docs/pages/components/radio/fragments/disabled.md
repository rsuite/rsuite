<!--start-code-->

```js
import { Radio, HStack, Text, Divider, VStack } from 'rsuite';

const App = () => (
  <VStack divider={<Divider />}>
    <HStack spacing={20}>
      <Text muted w={80}>
        Disabled
      </Text>
      <Radio disabled> Radio</Radio>
      <Radio checked disabled>
        Checked Radio
      </Radio>
    </HStack>

    <HStack spacing={20}>
      <Text muted w={80}>
        Read only
      </Text>
      <Radio readOnly> Radio</Radio>
      <Radio checked readOnly>
        Checked Radio
      </Radio>
    </HStack>

    <HStack spacing={20}>
      <Text muted w={80}>
        Plaintext
      </Text>
      <Radio plaintext> Radio</Radio>
      <Radio checked plaintext>
        Checked Radio
      </Radio>
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
