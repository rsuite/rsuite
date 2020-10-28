<!--start-code-->

```js
const instance = (
  <div className="field">
    <p>Select Single Day</p>
    <DateRangePicker
      oneTap
      showOneCalendar
      ranges={[
        {
          label: 'today',
          value: [new Date(), new Date()]
        },
        {
          label: 'yesterday',
          value: [dateFns.subDays(new Date(), 1), dateFns.subDays(new Date(), 1)]
        }
      ]}
    />
    <p>Select Single Week</p>
    <DateRangePicker oneTap showOneCalendar hoverRange="week" ranges={[]} />
    <p>Select Single Month</p>
    <DateRangePicker oneTap showOneCalendar hoverRange="month" ranges={[]} />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
