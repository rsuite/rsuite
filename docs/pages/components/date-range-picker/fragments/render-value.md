<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';
import format from 'date-fns/format';

const App = () => {
  return (
    <DateRangePicker
      editable={false}
      placeholder="Select Date"
      renderValue={([start, end]) => {
        return format(start, 'EEE, d MMM') + ' - ' + format(end, 'EEE, d MMM');
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
