<!--start-code-->

```js
import { TreePicker, VStack, HStack, Box } from 'rsuite';
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
    <Select label="Disabled" disabled data={data} defaultValue={'1-1'} />
    <Select
      label="Disabled option"
      defaultExpandAll
      data={data}
      defaultValue={'1-1'}
      disabledItemValues={['1-1-1', '2']}
    />
    <Select label="Read only" readOnly data={data} defaultValue={'1-1'} />
    <Select label="Plaintext" plaintext data={data} defaultValue={'1-1'} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Select = ({ label, children, ...rest }) => (
  <HStack>
    <Box as="label" w={120}>
      {label}:
    </Box>
    <TreePicker {...rest} w={180} />
  </HStack>
);
```

<!--end-code-->
