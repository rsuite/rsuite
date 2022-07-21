<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => (
  <>
    <DatePicker oneTap style={{ width: 200 }} />
    <hr />
    <DatePicker oneTap format="yyyy-MM" style={{ width: 200 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
