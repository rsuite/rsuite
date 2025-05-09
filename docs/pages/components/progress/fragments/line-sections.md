<!--start-code-->

```jsx
import { Progress, VStack, HStack, Text } from 'rsuite';

const App = () => (
  <VStack>
    <Progress
      sections={[
        { percent: 15, color: '#f7635c' },
        { percent: 40, color: '#ffb300' },
        { percent: 15, color: '#409af5' }
      ]}
    />

    <Divider />
    <HStack justify="space-between" w="100%">
      <Text>Macintosh HD</Text>
      <Text>Used: 750 GB / 1 TB</Text>
    </HStack>
    <Progress
      strokeWidth={20}
      radius={10}
      showInfo={false}
      sections={[
        { percent: 15, color: '#f7635c', label: 'Applications', tooltip: 'Apps: 150 GB' },
        { percent: 20, color: '#f08800', label: 'Documents', tooltip: 'Documents: 200 GB' },
        { percent: 40, color: '#717273', label: 'System Data', tooltip: 'System Data: 400 GB' },
        { percent: 25, color: '#b6b7b8', label: '250 GB', tooltip: 'Unused: 250 GB' }
      ]}
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
