<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => (
  <>
    <DatePicker oneTap w={200} />
    <hr />
    <DatePicker oneTap format="yyyy-MM" w={200} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
