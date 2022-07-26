<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => (
  <div style={{ width: 300 }}>
    <p>type="date"</p>
    <Input type="date" />
    <p style={{ marginTop: 10 }}>type="datetime-local"</p>
    <Input type="datetime-local" />
    <p style={{ marginTop: 10 }}>type="week"</p>
    <Input type="week" />
    <p style={{ marginTop: 10 }}>type="time"</p>
    <Input type="time" />
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
