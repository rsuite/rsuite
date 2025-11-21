<!--start-code-->

```js
import { DateRangeInput, InputGroup, HStack, VStack, Text, Divider } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';

const App = () => (
  <VStack divider={<Divider />}>
    <HStack>
      <Text muted w={80}>
        Disabled
      </Text>
      <DateRangeInput w={260} disabled value={[new Date('2023-10-01'), new Date('2023-10-31')]} />

      <InputGroup disabled w={260}>
        <DateRangeInput value={[new Date('2023-10-01'), new Date('2023-10-31')]} />
        <InputGroup.Addon>
          <CalendarIcon />
        </InputGroup.Addon>
      </InputGroup>
    </HStack>

    <HStack>
      <Text muted w={80}>
        ReadOnly
      </Text>
      <DateRangeInput w={260} readOnly value={[new Date('2023-10-01'), new Date('2023-10-31')]} />
    </HStack>

    <HStack>
      <Text muted w={80}>
        Plaintext
      </Text>
      <DateRangeInput w={260} plaintext value={[new Date('2023-10-01'), new Date('2023-10-31')]} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
