### Set The Local Language

<!--start-code-->

```js
const DateRangePickerIntl = props => (
  <div className="field only-date">
    <DateRangePicker
      format="YYYY-MM-DD"
      locale={{
        sunday: 'Su',
        monday: 'Mo',
        tuesday: 'Tu',
        wednesday: 'We',
        thursday: 'Th',
        friday: 'Fr',
        saturday: 'Sa',
        ok: 'OK',
        today: 'Today',
        yesterday: 'Yesterday',
        last7Days: 'Last 7 days'
      }}
    />
  </div>
);

ReactDOM.render(<DateRangePickerIntl />);
```

<!--end-code-->
