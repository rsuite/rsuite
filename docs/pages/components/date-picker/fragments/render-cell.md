<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => (
  <DatePicker
    defaultValue={new Date('2024-10-01')}
    renderCell={date => {
      const day = date.getDate();
      const month = date.getMonth();
      const weekday = date.getDay();

      if (day === 1 && month === 9) {
        return <span>{day}🎉</span>;
      }

      if (month === 1 && day === 14) {
        return <span>{day}❤️</span>;
      }

      if (weekday === 0 || weekday === 6) {
        return <span style={{ color: 'blue' }}>{day}</span>;
      }

      return day;
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
