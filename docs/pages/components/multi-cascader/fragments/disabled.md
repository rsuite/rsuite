<!--start-code-->

```js
import { MultiCascader, HStack, VStack, Text, Divider } from 'rsuite';
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
    <MultiCascader {...rest} w={200} />
  </HStack>
);

const App = () => (
  <VStack divider={<Divider />}>
    <Field label="Disabled" disabled defaultValue={['2-2-1']} data={data} />
    <Field
      label="Disabled option"
      data={data}
      defaultValue={['2-2-1']}
      disabledItemValues={['1', '2-1']}
    />
    <Field label="ReadOnly" readOnly defaultValue={['2-2-1']} data={data} />
    <Field label="Plaintext" plaintext defaultValue={['2-2-1']} data={data} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));


```

<!--end-code-->
