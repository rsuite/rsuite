<!--start-code-->

```js
import { TagPicker, VStack, HStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <VStack spacing={16}>
    <Select label="Disabled" disabled data={data} defaultValue={['Eugenia']} />
    <Select
      label="Disabled option"
      data={data}
      defaultValue={['Eugenia']}
      disabledItemValues={['Bryan', 'Linda', 'Nancy']}
    />
    <Select label="Read only" readOnly data={data} defaultValue={['Eugenia']} />
    <Select label="Plaintext" plaintext data={data} defaultValue={['Eugenia']} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Select = ({ label, children, ...rest }) => (
  <HStack>
    <label style={{ width: 120 }}>{label}:</label>
    <TagPicker {...rest} style={{ width: 180 }} />
  </HStack>
);
```

<!--end-code-->
