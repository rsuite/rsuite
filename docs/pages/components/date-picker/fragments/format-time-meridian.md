<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const ranges = [
  {
    label: 'Now',
    value: new Date()
  }
];
const App = () => (
  <>
    <DatePicker
      format="dd MMM yyyy hh:mm:ss aa"
      showMeridian
      ranges={ranges}
      style={{ width: 260 }}
    />
    <hr />
    <DatePicker format="hh:mm:ss aa" showMeridian ranges={ranges} style={{ width: 260 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
