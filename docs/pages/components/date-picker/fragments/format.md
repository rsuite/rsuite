<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => (
  <DatePicker
    format="yyyy-MM-dd HH:mm:ss"
    calendarDefaultDate={new Date('2022-02-02 00:00:00')}
    ranges={[
      {
        label: 'Now',
        value: new Date()
      }
    ]}
    style={{ width: 260 }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
