### One tap

<!--start-code-->

```js
const instance = (
  <div className="field">
    <p>Select Single Day</p>
    <DateRangePicker
      oneTap
      ranges={[
        {
          label: 'today',
          value: [new Date(), new Date()]
        },
        {
          label: 'yesterday',
          value: [dateFns.addDays(1), dateFns.addDays(1)]
        }
      ]}
    />
    <p>Select Single Week</p>
    <DateRangePicker oneTap hoverRange="week" ranges={[]} />
    <p>Select Single Month</p>
    <DateRangePicker oneTap hoverRange="month" ranges={[]} />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
