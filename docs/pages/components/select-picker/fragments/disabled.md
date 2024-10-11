<!--start-code-->

```js
import { SelectPicker, VStack, HStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <VStack spacing={16}>
    <HStack>
      <Label>Disabled: </Label>
      <SelectPicker disabled data={data} defaultValue={'Bryan'} style={{ width: 224 }} />
    </HStack>
    <HStack warp>
      <Label>Disabled option: </Label>
      <SelectPicker
        data={data}
        style={{ width: 224 }}
        defaultValue={'Bryan'}
        disabledItemValues={['Nancy', 'Alice', 'Julia']}
      />
    </HStack>
    <HStack>
      <Label>Read only: </Label>
      <SelectPicker readOnly data={data} defaultValue={'Bryan'} style={{ width: 224 }} />
    </HStack>

    <HStack>
      <Label>Plaintext: </Label>
      <SelectPicker plaintext data={data} defaultValue={'Bryan'} style={{ width: 224 }} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Label = ({ style, ...rest }) => <label style={{ width: 120, ...style }} {...rest} />;
```

<!--end-code-->
