### 一键选值

<!--start-code-->

```js
const instance = (
  <div className="field">
    <p>选择单日</p>
    <DateRangePicker
      oneTap
      ranges={[
        {
          label: 'today',
          value: [new Date(), new Date()]
        },
        {
          label: 'yesterday',
          value: [dateFns.addDays(new Date(), 1), dateFns.addDays(new Date(), 1)]
        }
      ]}
    />
    <p>选择单周</p>
    <DateRangePicker oneTap hoverRange="week" ranges={[]} />
    <p>选择单月</p>
    <DateRangePicker oneTap hoverRange="month" ranges={[]} />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
