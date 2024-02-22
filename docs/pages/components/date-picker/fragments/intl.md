<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => (
  <DatePicker
    format="yyyy-MM-dd HH:mm:ss"
    style={{ width: 260 }}
    locale={{
      sunday: 'Su',
      monday: 'Mo',
      tuesday: 'Tu',
      wednesday: 'We',
      thursday: 'Th',
      friday: 'Fr',
      saturday: 'Sa',
      ok: 'OK',
      today: 'Today',
      yesterday: 'Yesterday',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
