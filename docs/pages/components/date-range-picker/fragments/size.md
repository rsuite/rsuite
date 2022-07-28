<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';

const styles = { width: 260, display: 'block', marginBottom: 10 };
const App = () => (
  <>
    <DateRangePicker size="lg" placeholder="Large" style={styles} />
    <DateRangePicker size="md" placeholder="Medium" style={styles} />
    <DateRangePicker size="sm" placeholder="Small" style={styles} />
    <DateRangePicker size="xs" placeholder="Xsmall" style={styles} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
