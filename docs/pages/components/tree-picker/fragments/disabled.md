<!--start-code-->

```js
import { TreePicker, VStack, HStack, Text, Divider } from 'rsuite';
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
    <Text muted w={100}>
      {label}
    </Text>
    <TreePicker {...rest} w={200} />
  </HStack>
);

const App = () => (
  <VStack divider={<Divider />}>
    <Field label="Disabled" disabled data={data} defaultValue={'1-1'} />
    <Field
      label="Disabled option"
      defaultExpandAll
      data={data}
      defaultValue={'1-1'}
      disabledItemValues={['1-1-1', '2']}
    />
    <Field label="ReadOnly" readOnly data={data} defaultValue={'1-1'} />
    <Field label="Plaintext" plaintext data={data} defaultValue={'1-1'} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
