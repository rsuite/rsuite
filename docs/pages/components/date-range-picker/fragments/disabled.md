<!--start-code-->

```js
const {
  allowedMaxDays,
  allowedDays,
  allowedRange,
  beforeToday,
  afterToday,
  combine
} = DateRangePicker;

const Demo = props => (
  <div className="field">
    <p>Disabled component.</p>
    <DateRangePicker disabled />

    <hr />
    <p>Custom disabled.</p>
    <DateRangePicker disabledDate={date => dateFns.isAfter(date, new Date())} />

    <hr />
    <p>Allow maximum selection for 7 days, other dates are disabled.</p>
    <DateRangePicker disabledDate={allowedMaxDays(7)} />

    <hr />
    <p>Only 7 days allowed, other dates are disabled</p>
    <DateRangePicker disabledDate={allowedDays(7)} />

    <hr />
    <p>Only one date range is allowed, other dates are disabled</p>
    <DateRangePicker disabledDate={allowedRange('2020-10-01', '2021-10-01')} />

    <hr />
    <p>Disable dates before today</p>
    <DateRangePicker disabledDate={beforeToday()} />

    <hr />
    <p>Disable dates after today</p>
    <DateRangePicker disabledDate={afterToday()} />

    <hr />
    <p>
      Combination: Allow maximum selection for 7 days, while disabling dates before today, other
      dates are disabled
    </p>
    <DateRangePicker disabledDate={combine(allowedMaxDays(7), beforeToday())} />
  </div>
);

ReactDOM.render(<Demo />);
```

<!--end-code-->
