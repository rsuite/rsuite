<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';
import {
  FaCalendar,
  FaCalendarWeek,
  FaCalendarDay,
  FaCalendarCheck,
  FaClock
} from 'react-icons/fa';

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={6}>
    <DatePicker caretAs={FaCalendar} />
    <DatePicker caretAs={FaCalendarWeek} />
    <DatePicker caretAs={FaCalendarDay} />
    <DatePicker caretAs={FaCalendarCheck} />
    <DatePicker caretAs={FaClock} format="HH:mm:ss" />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
