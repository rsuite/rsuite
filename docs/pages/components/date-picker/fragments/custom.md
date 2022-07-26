<!--start-code-->

```js
import { DatePicker } from 'rsuite';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

const App = () => (
  <div className="field">
    <DatePicker
      ranges={[
        {
          label: 'yesterday',
          value: addDays(new Date(), -1)
        },
        {
          label: 'today',
          value: new Date()
        },
        {
          label: 'Prev Day',
          closeOverlay: false,
          value: date => {
            return subDays(date, 1);
          }
        }
      ]}
      style={{ width: 200 }}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
