<!--start-code-->

```js
import { InputPicker, VStack, HStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);
const App = () => (
  <VStack spacing={16}>
    <HStack>
      <Label>Disabled: </Label>
      <InputPicker disabled data={data} defaultValue={'Julia'} style={{ width: 160 }} />
    </HStack>
    <HStack>
      <Label> Disabled option: </Label>
      <InputPicker
        data={data}
        defaultValue={'Julia'}
        disabledItemValues={['Eugenia', 'Bryan', 'Lloyd']}
        style={{ width: 160 }}
      />
    </HStack>
    <HStack>
      <Label>Read only: </Label>
      <InputPicker readOnly data={data} defaultValue={'Julia'} style={{ width: 160 }} />
    </HStack>

    <HStack>
      <Label>Plaintext: </Label>
      <InputPicker plaintext data={data} defaultValue={'Julia'} style={{ width: 160 }} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Label = ({ style, ...rest }) => <label style={{ width: 120, ...style }} {...rest} />;
```

<!--end-code-->
