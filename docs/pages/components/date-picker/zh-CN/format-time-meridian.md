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
    <DatePicker format="yyyy-MM-dd hh:mm:ss a" showMeridian ranges={ranges} />
    <hr />
    <DatePicker format="hh:mm:ss a" showMeridian ranges={ranges} />
  </div>
);

ReactDOM.render(<App />);
```

<!--end-code-->
