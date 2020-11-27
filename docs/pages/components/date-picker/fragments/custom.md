<!--start-code-->

```js
const instance = (
  <div className="field">
    <DatePicker
      ranges={[
        {
          label: 'yesterday',
          value: dateFns.addDays(new Date(), -1)
        },
        {
          label: 'today',
          value: new Date()
        },
        {
          label: 'Prev Day',
          closeOverlay: false,
          value: date => {
            return dateFns.subDays(date, 1);
          }
        }
      ]}
      style={{ width: 200 }}
    />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
