<!--start-code-->

```js
import { CheckTreePicker, VStack, HStack, Box } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => (
  <VStack spacing={16}>
    <Select label="Disabled" disabled data={data} defaultValue={['1-2']} />
    <Select
      label="Disabled option"
      defaultExpandAll
      data={data}
      disabledItemValues={['1-1', '1-1-2']}
      defaultValue={['1-2']}
    />
    <Select
      label="Uncheckable"
      defaultExpandAll
      data={data}
      uncheckableItemValues={['1-1', '1-1-2']}
      defaultValue={['1-2']}
    />
    <Select label="Read only" readOnly data={data} defaultValue={['1-2']} />
    <Select label="Plaintext" plaintext data={data} defaultValue={['1-2']} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Select = ({ label, children, ...rest }) => (
  <HStack>
    <Box as="label" w={120}>
      {label}:
    </Box>
    <CheckTreePicker {...rest} w={180} />
  </HStack>
);
```

<!--end-code-->
