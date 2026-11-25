<!--start-code-->

```js
import { SegmentedControl, VStack, Text } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <VStack spacing={4}>
      <Text>Pill</Text>
      <SegmentedControl
        defaultValue="low"
        indicator="pill"
        data={[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          { label: 'Critical', value: 'critical' }
        ]}
      />
    </VStack>
    <VStack spacing={4}>
      <Text>Underline</Text>
      <SegmentedControl
        defaultValue="low"
        indicator="underline"
        data={[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          { label: 'Critical', value: 'critical' }
        ]}
      />
    </VStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
