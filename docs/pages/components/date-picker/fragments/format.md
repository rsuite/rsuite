<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { BsCalendar2MonthFill } from 'react-icons/bs';

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <DatePicker format="MM/dd/yyyy" />
    <DatePicker format="dd.MM.yyyy" />
    <DatePicker format="MMM dd, yyyy" />
    <DatePicker format="MMMM dd, yyyy" />
    <DatePicker format="yyyy年MM月dd日" />
    <DatePicker format="MM/dd/yyyy HH:mm" />
    <DatePicker format="MM/dd/yyyy hh:mm aa" showMeridiem />
    <DatePicker format="MMM yyyy" caretAs={BsCalendar2MonthFill} />
    <DatePicker format="HH:mm:ss" caretAs={FaClock} />
    <DatePicker
      format="dd MMM yyyy hh:mm:ss aa"
      showMeridiem
      caretAs={FaCalendar}
      style={{ width: 220 }}
    />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
