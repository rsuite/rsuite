<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';
import { subDays } from 'date-fns/subDays';

const ranges = [
  {
    label: 'today',
    value: [new Date(), new Date()]
  },
  {
    label: 'yesterday',
    value: [subDays(new Date(), 1), subDays(new Date(), 1)]
  }
];

const App = () => (
  <div className="field">
    <p>Select Single Day</p>
    <DateRangePicker oneTap showOneCalendar ranges={ranges} />
    <p>Select Single Week</p>
    <DateRangePicker oneTap showOneCalendar hoverRange="week" ranges={[]} />

    <p>Select ISO Week. Each calendar week begins on Monday.</p>
    <DateRangePicker oneTap showOneCalendar hoverRange="week" isoWeek ranges={[]} />
    <p>Select Week, custom week start from Wednesday</p>
    <DateRangePicker oneTap showOneCalendar hoverRange="week" weekStart={3} ranges={[]} />

    <p>Select Single Month</p>
    <DateRangePicker oneTap showOneCalendar hoverRange="month" ranges={[]} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
