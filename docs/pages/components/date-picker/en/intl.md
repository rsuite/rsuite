### Set The Local Language

`DatePicker` supports local language custom configuration, but we recommend using the unified [internationalization](/guide/intl) configuration.

<!--start-code-->

```js
const DatePickerIntl = props => (
  <div className="field only-date">
    <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
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
