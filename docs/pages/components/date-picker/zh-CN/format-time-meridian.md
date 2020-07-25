### 以 12 小时制的格式显示

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
    <DatePicker format="YYYY-MM-DD hh:mm:ss A" showMeridian ranges={ranges} />
    <hr />
    <DatePicker format="hh:mm:ss A" showMeridian ranges={ranges} />
  </div>
);

ReactDOM.render(<App />);
```

<!--end-code-->
