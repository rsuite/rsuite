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
    <DatePicker format="DD MMM YYYY hh:mm:ss A" showMeridian ranges={ranges} />
    <hr />
    <DatePicker format="hh:mm:ss A" showMeridian ranges={ranges} />
  </div>
);

ReactDOM.render(<App />);
```

<!--end-code-->
