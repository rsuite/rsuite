<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';

const App = () => (
  <>
    <DateRangePicker appearance="default" placeholder="Default" style={{ width: 230 }} />
    <hr />
    <DateRangePicker appearance="subtle" placeholder="Subtle" style={{ width: 230 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
