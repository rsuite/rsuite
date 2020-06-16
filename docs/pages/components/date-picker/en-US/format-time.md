### Show Time

<!--start-code-->
```js
const DatePickerInstance = props => (
  <div className="field">
    <p> show time</p>
    <DatePicker format="HH:mm:ss" ranges={[]} />
    <p> show hours and minutes</p>
    <DatePicker format="HH:mm" ranges={[]} />
  </div>
);

ReactDOM.render(<DatePickerInstance />);

```
<!--end-code-->