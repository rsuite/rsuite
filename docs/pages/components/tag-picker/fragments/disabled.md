<!--start-code-->

```js
import { TagPicker, VStack, HStack, Text, Divider } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const Field = ({ label, children, ...rest }) => (
  <HStack>
    <Text muted w={80}>
      {label}
    </Text>
    <TagPicker {...rest} />
  </HStack>
);

const App = () => (
  <VStack divider={<Divider />}>
    <Field label="Disabled" disabled data={data} defaultValue={['Eugenia']} />
    <Field
      label="Disabled option"
      data={data}
      defaultValue={['Eugenia']}
      disabledItemValues={['Bryan', 'Linda', 'Nancy']}
    />
    <Field label="ReadOnly" readOnly data={data} defaultValue={['Eugenia']} />
    <Field label="Plaintext" plaintext data={data} defaultValue={['Eugenia']} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
