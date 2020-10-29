<!--start-code-->

```js
const DatePickerInstance = props => (
  <div className="field">
    <p>Show time</p>
    <DatePicker format="HH:mm:ss" ranges={[]} />
    <p>Show hours and minutes</p>
    <DatePicker format="HH:mm" ranges={[]} />
  </div>
);

ReactDOM.render(<DatePickerInstance />);
```

<!--end-code-->
