<!--start-code-->

```js
const Label = props => {
  return <label style={{ width: 120, display: 'inline-block', marginTop: 10 }} {...props} />;
};

const instance = (
  <div className="field">
    <Label>Disabled: </Label>
    <DatePicker disabled style={{ width: 200 }} />
    <br />
    <Label>Disabled date: </Label>
    <DatePicker disabledDate={date => dateFns.isBefore(date, new Date())} style={{ width: 200 }} />
    <br />
    <Label>Disabled month: </Label>
    <DatePicker
      disabledDate={date => dateFns.isBefore(date, new Date())}
      format="yyyy-MM"
      style={{ width: 200 }}
    />
    <br />
    <Label>Disabled time: </Label>
    <DatePicker
      format="HH:mm:ss"
      ranges={[]}
      defaultValue={new Date('2017-12-12 09:15:30')}
      disabledHours={hour => hour < 8 || hour > 18}
      disabledMinutes={minute => minute % 15 !== 0}
      disabledSeconds={second => second % 30 !== 0}
      style={{ width: 200 }}
    />
    <br />
    <Label>Hidden time: </Label>
    <DatePicker
      format="HH:mm:ss"
      ranges={[]}
      defaultValue={new Date('2017-12-12 09:15:30')}
      hideHours={hour => hour < 8 || hour > 18}
      hideMinutes={minute => minute % 15 !== 0}
      hideSeconds={second => second % 30 !== 0}
      style={{ width: 200 }}
    />
    <hr />
    <Label>Read only: </Label>
    <DatePicker readOnly defaultValue={new Date()} style={{ width: 200 }} />

    <hr />
    <Label>Plaintext: </Label>
    <DatePicker plaintext defaultValue={new Date()} style={{ width: 200 }} />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
