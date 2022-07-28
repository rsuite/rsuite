<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';

const App = () => (
  <div className="field">
    <p>Select Whole Week</p>
    <DateRangePicker hoverRange="week" ranges={[]} />
    <p>
      Select Whole Week, ISO 8601 standard, each calendar week begins on Monday and Sunday is the
      seventh day
    </p>
    <DateRangePicker hoverRange="week" isoWeek ranges={[]} />
    <p>Select Whole Month</p>
    <DateRangePicker hoverRange="month" ranges={[]} />
    <p>Custom Select</p>
    <DateRangePicker ranges={[]} hoverRange={date => [subDays(date, 1), addDays(date, 1)]} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
