<!--start-code-->

```js
import { DatePicker, SegmentedControl } from 'rsuite';

const options = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' }
];

const App = () => {
  const [weekStart, setWeekStart] = React.useState(0);
  return (
    <>
      <SegmentedControl data={options} value={weekStart} onChange={setWeekStart} />
      <hr />
      <DatePicker weekStart={weekStart} w={200} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
