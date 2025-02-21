<!--start-code-->

```js
import { DatePicker } from 'rsuite';
import { isBefore } from 'date-fns/isBefore';

const Label = props => {
  return <label style={{ width: 120, display: 'inline-block', marginTop: 10 }} {...props} />;
};

const App = () => (
  <div className="field">
    <Label>Disabled: </Label>
    <DatePicker disabled />
    <br />
    <Label>Disabled date: </Label>
    <DatePicker defaultValue={new Date()} shouldDisableDate={date => isBefore(date, new Date())} />
    <br />
    <Label>Disabled month: </Label>
    <DatePicker
      shouldDisableDate={date => {
        const month = date.getMonth();
        return month === 0 || month === 11;
      }}
      format="yyyy-MM"
    />
    <br />
    <Label>Disabled time: </Label>
    <DatePicker
      format="HH:mm:ss"
      ranges={[]}
      defaultValue={new Date('2017-12-12 09:15:30')}
      shouldDisableHour={hour => hour < 8 || hour > 18}
      shouldDisableMinute={minute => minute % 15 !== 0}
      shouldDisableSecond={second => second % 30 !== 0}
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
    />
    <hr />
    <Label>Read only: </Label>
    <DatePicker readOnly defaultValue={new Date()} />

    <hr />
    <Label>Plaintext: </Label>
    <DatePicker plaintext defaultValue={new Date()} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
