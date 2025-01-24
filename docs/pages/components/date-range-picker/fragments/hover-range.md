<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';
import { subDays } from 'date-fns/subDays';
import { addDays } from 'date-fns/addDays';

const App = () => (
  <div className="field">
    <p>Select Whole Week</p>
    <DateRangePicker hoverRange="week" ranges={[]} />
    <p>
      Select Whole Week,
      <a href="https://en.wikipedia.org/wiki/ISO_week_date" target="_blank">
        ISO 8601 standard
      </a>
      , each calendar week begins on Monday and Sunday is the seventh day
    </p>
    <DateRangePicker hoverRange="week" isoWeek ranges={[]} />

    <p>Select Whole Week, week start from Wednesday</p>
    <DateRangePicker hoverRange="week" weekStart={3} ranges={[]} />

    <p>Select Whole Month</p>
    <DateRangePicker hoverRange="month" ranges={[]} />
    <p>Custom Select</p>
    <DateRangePicker ranges={[]} hoverRange={date => [subDays(date, 1), addDays(date, 1)]} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
