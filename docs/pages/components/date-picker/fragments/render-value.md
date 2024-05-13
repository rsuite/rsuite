<!--start-code-->

```js
import { DatePicker } from 'rsuite';
import format from 'date-fns/format';

const App = () => {
  return (
    <DatePicker
      editable={false}
      placeholder="Select Date"
      renderValue={value => {
        return format(value, 'EEE, d MMM');
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
