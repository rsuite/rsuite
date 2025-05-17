<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';
import { format } from 'date-fns/format';

const App = () => {
  return (
    <>
      <DateRangePicker
        placeholder="Select Date"
        renderValue={([start, end]) => {
          return format(start, 'EEE, d MMM') + ' - ' + format(end, 'EEE, d MMM');
        }}
      />
      <hr />
      <DateRangePicker
        editable={false}
        placeholder="Uneditable"
        renderValue={([start, end]) => {
          return format(start, 'EEE, d MMM') + ' - ' + format(end, 'EEE, d MMM');
        }}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
