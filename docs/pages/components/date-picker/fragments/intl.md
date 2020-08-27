

<!--start-code-->

```js
const DatePickerIntl = props => (
  <div className="field only-date">
    <DatePicker
      format="yyyy-MM-dd HH:mm:ss"
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
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds'
      }}
    />
  </div>
);

ReactDOM.render(<DatePickerIntl />);
```

<!--end-code-->
