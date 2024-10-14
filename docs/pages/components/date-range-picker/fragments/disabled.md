<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';
import { isAfter } from 'date-fns/isAfter';

const { allowedMaxDays, allowedDays, allowedRange, beforeToday, afterToday, combine } =
  DateRangePicker;

const Label = props => {
  return <label style={{ display: 'block', marginTop: 10 }} {...props} />;
};

const App = () => (
  <div className="field">
    <Label>Disabled: </Label>
    <DateRangePicker disabled />

    <br />
    <Label>Custom disabled </Label>
    <DateRangePicker shouldDisableDate={date => isAfter(date, new Date())} />

    <br />
    <Label>Allow maximum selection for 7 days, other dates are disabled.</Label>
    <DateRangePicker shouldDisableDate={allowedMaxDays(7)} />

    <br />
    <Label>Only 7 days allowed, other dates are disabled</Label>
    <DateRangePicker shouldDisableDate={allowedDays(7)} />

    <br />
    <Label>Only one date range is allowed, other dates are disabled</Label>
    <DateRangePicker shouldDisableDate={allowedRange('2020-10-01', '2021-10-01')} />

    <br />
    <Label>Disable dates before today</Label>
    <DateRangePicker shouldDisableDate={beforeToday()} />

    <br />
    <Label>Disable dates after today</Label>
    <DateRangePicker shouldDisableDate={afterToday()} />

    <br />
    <Label>
      Combination: Allow maximum selection for 7 days, while disabling dates before today, other
      dates are disabled
    </Label>
    <DateRangePicker shouldDisableDate={combine(allowedMaxDays(7), beforeToday())} />

    <hr />
    <Label>Read only: </Label>
    <DateRangePicker readOnly defaultValue={[new Date(), new Date()]} />

    <hr />
    <Label>Plaintext: </Label>
    <DateRangePicker plaintext defaultValue={[new Date(), new Date()]} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
