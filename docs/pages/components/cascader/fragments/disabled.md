<!--start-code-->

```js
import { Cascader, VStack, HStack, Divider, Text } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const Field = ({ label, children, ...rest }) => (
  <HStack align="start">
    <Text muted w={120}>
      {label}
    </Text>
    <Cascader {...rest} w={180} />
  </HStack>
);

const App = () => (
  <VStack divider={<Divider />}>
    <VStack>
      <Field label="Disabled" disabled defaultValue="1-1" data={data} />
      <Field
        label="Disabled option"
        data={data}
        defaultValue="1-1"
        disabledItemValues={['2', '1-1']}
      />
    </VStack>
    <Field label="ReadOnly" readOnly defaultValue="1-1" data={data} />
    <Field label="Plaintext" plaintext defaultValue="1-1" data={data} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
