<!--start-code-->

```js
import { SegmentedControl } from 'rsuite';

const App = () => {
  const data = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' }
  ];

  return <SegmentedControl data={data} defaultValue="week" block />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
