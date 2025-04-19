<!--start-code-->

```js
import { InputPicker, VStack, HStack, Box } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const Label = props => <Box w={120} {...props} />;

const App = () => (
  <VStack spacing={16}>
    <HStack>
      <Label>Disabled: </Label>
      <InputPicker disabled data={data} defaultValue={'Julia'} w={160} />
    </HStack>
    <HStack>
      <Label> Disabled option: </Label>
      <InputPicker
        data={data}
        defaultValue={'Julia'}
        disabledItemValues={['Eugenia', 'Bryan', 'Lloyd']}
        w={160}
      />
    </HStack>
    <HStack>
      <Label>Read only: </Label>
      <InputPicker readOnly data={data} defaultValue={'Julia'} w={160} />
    </HStack>

    <HStack>
      <Label>Plaintext: </Label>
      <InputPicker plaintext data={data} defaultValue={'Julia'} w={160} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
