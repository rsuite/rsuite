<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';

const App = () => (
  <div className="field">
    <p>Date Time Range</p>
    <DateRangePicker
      format="yyyy-MM-dd HH:mm:ss"
      defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-05-01 23:59:59')]}
    />

    <p>Time Range</p>
    <DateRangePicker
      format="HH:mm:ss"
      ranges={[]}
      defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-05-01 23:59:59')]}
    />

    <p>Meridiem format</p>
    <DateRangePicker
      format="hh:mm aa"
      showMeridiem
      defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-05-01 23:59:59')]}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
