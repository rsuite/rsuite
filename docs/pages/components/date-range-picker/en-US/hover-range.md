### Select Whole Week, Whole Month

<!--start-code-->

```js
const instance = (
  <div className="field">
    <p>Select Whole Week</p>
    <DateRangePicker hoverRange="week" ranges={[]} />
    <p>
      -Select Whole Week, ISO 8601 standard, each calendar week begins on Monday
      and Sunday is the seventh day
    </p>
    <DateRangePicker hoverRange="week" isoWeek ranges={[]} />
    <p>Select Whole Month</p>
    <DateRangePicker hoverRange="month" ranges={[]} />
    <p>Custom Select</p>
    <DateRangePicker
      ranges={[]}
      hoverRange={date => [dateFns.subDays(date, 1), dateFns.addDays(date, 1)]}
    />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
