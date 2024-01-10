<!--start-code-->

```js
import { DateRangePicker, Stack } from 'rsuite';
import { FaCalendar, FaCalendarWeek, FaCalendarDay, FaCalendarCheck } from 'react-icons/fa';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={6}>
    <DateRangePicker caretAs={FaCalendar} />
    <DateRangePicker caretAs={FaCalendarWeek} />
    <DateRangePicker caretAs={FaCalendarDay} />
    <DateRangePicker caretAs={FaCalendarCheck} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
