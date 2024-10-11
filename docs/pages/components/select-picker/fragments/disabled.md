<!--start-code-->

```js
import { SelectPicker, VStack, HStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <VStack spacing={16}>
    <Select label="Disabled" disabled data={data} defaultValue={'Bryan'} />
    <Select
      label="Disabled option"
      data={data}
      defaultValue={'Bryan'}
      disabledItemValues={['Nancy', 'Alice', 'Julia']}
    />
    <Select label="Read only" readOnly data={data} defaultValue={'Bryan'} />
    <Select label="Plaintext" plaintext data={data} defaultValue={'Bryan'} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Select = ({ label, children, ...rest }) => (
  <HStack>
    <label style={{ width: 120 }}>{label}:</label>
    <SelectPicker {...rest} style={{ width: 180 }} />
  </HStack>
);
```

<!--end-code-->
