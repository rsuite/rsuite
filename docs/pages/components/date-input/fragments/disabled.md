<!--start-code-->

```js
import { DateInput, InputGroup, HStack, VStack, Text, Divider } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';

const App = () => (
  <VStack divider={<Divider />}>
    <HStack>
      <Text muted w={80}>
        Disabled
      </Text>
      <DateInput disabled value={new Date()} w={200} />
      <InputGroup disabled  w={200} >
        <DateInput value={new Date()}/>
        <InputGroup.Addon>
          <CalendarIcon />
        </InputGroup.Addon>
      </InputGroup>
    </HStack>

    <HStack>
      <Text muted w={80}>
        ReadOnly
      </Text>
      <DateInput readOnly value={new Date()} w={200} />
    </HStack>

    <HStack>
      <Text muted w={80}>
        Plaintext
      </Text>
      <DateInput plaintext value={new Date()} w={200} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
