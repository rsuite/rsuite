<!--start-code-->

```js
const DatePickerInstance = props => (
  <div className="field">
    <p>Show time</p>
    <DatePicker format="HH:mm:ss" ranges={[]} style={{ width: 260 }} />
    <p>Show hours and minutes</p>
    <DatePicker format="HH:mm" ranges={[]} style={{ width: 260 }} />
  </div>
);

ReactDOM.render(<DatePickerInstance />);
```

<!--end-code-->
