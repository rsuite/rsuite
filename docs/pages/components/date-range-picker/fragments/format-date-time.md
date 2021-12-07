<!--start-code-->

```js
const instance = (
  <div className="field">
    <p>Date Time Range</p>
    <DateRangePicker format="yyyy-MM-dd HH:mm:ss" />

    <p>Time Range</p>
    <DateRangePicker format="HH:mm:ss" ranges={[]} />

    <p>Meridian format</p>
    <DateRangePicker format="yyyy-MM-dd hh:mm aa" showMeridian />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
