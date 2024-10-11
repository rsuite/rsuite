<!--start-code-->

```js
import { Cascader, VStack, HStack } from 'rsuite';
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
    <Select label="Disabled" disabled defaultValue="1-1" data={data} />
    <Select
      label="Disabled option"
      data={data}
      defaultValue="1-1"
      disabledItemValues={['2', '1-1']}
    />
    <Select label="Read only" readOnly defaultValue="1-1" data={data} />
    <Select label="Plaintext" plaintext defaultValue="1-1" data={data} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Select = ({ label, children, ...rest }) => (
  <HStack>
    <label style={{ width: 120 }}>{label}:</label>
    <Cascader {...rest} style={{ width: 180 }} />
  </HStack>
);
```

<!--end-code-->
