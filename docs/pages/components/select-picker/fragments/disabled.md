<!--start-code-->

```js
import { SelectPicker, VStack, HStack, Text, Divider } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const Field = ({ label, children, ...rest }) => (
  <HStack>
    <Text muted w={120}>
      {label}
    </Text>
    <SelectPicker {...rest} w={200} />
  </HStack>
);

const App = () => (
  <VStack divider={<Divider />}>
    <VStack>
      <Field label="Disabled" disabled data={data} defaultValue={'Bryan'} />
      <Field
        label="Disabled option"
        data={data}
        defaultValue={'Bryan'}
        disabledItemValues={['Nancy', 'Alice', 'Julia']}
      />
    </VStack>
    <Field label="ReadOnly" readOnly data={data} defaultValue={'Bryan'} />
    <Field label="Plaintext" plaintext data={data} defaultValue={'Bryan'} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
