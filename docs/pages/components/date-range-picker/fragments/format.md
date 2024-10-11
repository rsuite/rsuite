<!--start-code-->

```js
import { DateRangePicker, Stack } from 'rsuite';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { BsCalendar2MonthFill } from 'react-icons/bs';

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <DateRangePicker format="MM/dd/yyyy" character=" – " />
    <DateRangePicker format="dd.MM.yyyy" />
    <DateRangePicker format="MMM dd, yyyy" />
    <DateRangePicker format="MMMM dd, yyyy" />
    <DateRangePicker format="yyyy年MM月dd日" />
    <DateRangePicker format="MM/dd/yyyy HH:mm" />
    <DateRangePicker format="MM/dd/yyyy hh:mm aa" showMeridiem />
    <DateRangePicker format="MMM yyyy" caretAs={BsCalendar2MonthFill} />
    <DateRangePicker format="HH:mm:ss" caretAs={FaClock} />
    <DateRangePicker format="dd MMM yyyy hh:mm:ss aa" showMeridiem caretAs={FaCalendar} />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
