<!--start-code-->

```js
import { Input, InputGroup, VStack, HStack, Text, Divider } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <VStack divider={<Divider />}>
    <HStack>
      <Text muted w={80}>Disabled</Text>
      <Input disabled value="Disabled input" w={200} />

      <InputGroup disabled w={200}>
        <Input value="Disabled input group" />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup>
    </HStack>

    <HStack>
      <Text muted w={80}>ReadOnly</Text>
      <Input readOnly value="Read only input" w={200} />
    </HStack>

    <HStack>
      <Text muted w={80}>Plaintext</Text>
      <Input plaintext value="Plaintext input" w={200} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
