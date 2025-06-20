<!--start-code-->

```js
import { SegmentedControl, VStack, Text } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState('all');

  return (
    <VStack spacing={20}>
      <SegmentedControl
        value={value}
        onChange={value => setValue(value)}
        data={[
          { label: 'All', value: 'all' },
          { label: 'Drafts', value: 'drafts' },
          { label: 'Published', value: 'published' },
          { label: 'Archived', value: 'archived' }
        ]}
      />
      <Text>Selected value: {value}</Text>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
