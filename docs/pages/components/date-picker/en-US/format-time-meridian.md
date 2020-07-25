### Meridian format

Display hours in 12 format.

<!--start-code-->

```js
const ranges = [
  {
    label: 'Now',
    value: new Date()
  }
];
const App = () => (
  <div>
    <DatePicker format="dd MMM yyyy hh:mm:ss a" showMeridian ranges={ranges} />
    <hr />
    <DatePicker format="hh:mm:ss a" showMeridian ranges={ranges} />
  </div>
);

ReactDOM.render(<App />);
```

<!--end-code-->
