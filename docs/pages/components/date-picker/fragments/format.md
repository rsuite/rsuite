<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => (
  <DatePicker
    format="yyyy-MM-dd HH:mm:ss"
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
