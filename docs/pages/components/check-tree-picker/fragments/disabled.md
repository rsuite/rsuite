<!--start-code-->

```js
import { CheckTreePicker, VStack, HStack, Text, Divider } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const Field = ({ label, children, ...rest }) => (
  <HStack>
    <Text muted w={120}>
      {label}
    </Text>
    <CheckTreePicker {...rest} w={180} />
  </HStack>
);

const App = () => (
  <VStack divider={<Divider />}>
    <VStack>
      <Field label="Disabled" disabled data={data} defaultValue={['1-2']} />
      <Field
        label="Disabled option"
        defaultExpandAll
        data={data}
        disabledItemValues={['1-1', '1-1-2']}
        defaultValue={['1-2']}
      />
    </VStack>
    <Field
      label="Uncheckable"
      defaultExpandAll
      data={data}
      uncheckableItemValues={['1-1', '1-1-2']}
      defaultValue={['1-2']}
    />

    <Field label="ReadOnly" readOnly data={data} defaultValue={['1-2']} />
    <Field label="Plaintext" plaintext data={data} defaultValue={['1-2']} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
