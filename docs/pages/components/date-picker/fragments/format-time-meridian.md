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
    <DatePicker
      format="dd MMM yyyy hh:mm:ss aa"
      showMeridian
      ranges={ranges}
      style={{ width: 260 }}
    />
    <hr />
    <DatePicker format="hh:mm:ss aa" showMeridian ranges={ranges} style={{ width: 260 }} />
  </div>
);

ReactDOM.render(<App />);
```

<!--end-code-->
