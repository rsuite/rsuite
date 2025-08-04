<!--start-code-->

```js
import { SegmentedControl } from 'rsuite';

const App = () => (
  <SegmentedControl
    defaultValue="day"
    data={[
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Quarter', value: 'quarter' },
      { label: 'Year', value: 'year' }
    ]}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
