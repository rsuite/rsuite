### 只显示时间

<!--start-code-->

```js
const DatePickerInstance = props => (
  <div className="field">
    <p> 显示时间</p>
    <DatePicker format="HH:mm:ss" ranges={[]} />
    <p> 只显示小时与分钟</p>
    <DatePicker format="HH:mm" ranges={[]} />
  </div>
);

ReactDOM.render(<DatePickerInstance />);
```

<!--end-code-->
