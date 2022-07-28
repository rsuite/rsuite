<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';

const App = () => (
  <div className="field">
    <DateRangePicker
      ranges={[
        {
          label: 'Yesterday',
          value: [addDays(new Date(), -1), addDays(new Date(), -1)]
        },
        {
          label: 'Today',
          value: [new Date(), new Date()]
        },
        {
          label: 'Tomorrow',
          value: [addDays(new Date(), 1), addDays(new Date(), 1)]
        },
        {
          label: 'Last 7 days',
          value: [subDays(new Date(), 6), new Date()]
        }
      ]}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
