<!--start-code-->

```js
import { InputPicker, VStack, HStack, Text, Divider } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <VStack divider={<Divider />}>
    <HStack>
      <Text muted w={100}>
        Disabled
      </Text>
      <InputPicker disabled data={data} defaultValue={'Julia'} w={200} />
    </HStack>
    <HStack>
      <Text muted w={100}>
        Disabled option
      </Text>
      <InputPicker
        data={data}
        defaultValue={'Julia'}
        disabledItemValues={['Eugenia', 'Bryan', 'Lloyd']}
        w={200}
      />
    </HStack>
    <HStack>
      <Text muted w={100}>
        ReadOnly
      </Text>
      <InputPicker readOnly data={data} defaultValue={'Julia'} w={200} />
    </HStack>

    <HStack>
      <Text muted w={100}>
        Plaintext
      </Text>
      <InputPicker plaintext data={data} defaultValue={'Julia'} w={200} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
