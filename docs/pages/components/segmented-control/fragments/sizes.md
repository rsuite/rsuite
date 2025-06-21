<!--start-code-->

```js
import { SegmentedControl, VStack } from 'rsuite';

const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  const data = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' }
  ];

  return (
    <VStack spacing={10}>
      {sizes.map(size => (
        <SegmentedControl key={size} size={size} defaultValue="day" data={data} />
      ))}
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
