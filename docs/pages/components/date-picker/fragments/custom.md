
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
          value: datePage => {
            return dateFns.addDays(dateFns.parseISO(datePage), -1);
          }
        }
      ]}
    />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->

