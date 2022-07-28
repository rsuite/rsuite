<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const styles = { width: 200, display: 'block', marginBottom: 10 };
const App = () => (
  <>
    <DatePicker size="lg" placeholder="Large" style={styles} />
    <DatePicker size="md" placeholder="Medium" style={styles} />
    <DatePicker size="sm" placeholder="Small" style={styles} />
    <DatePicker size="xs" placeholder="Xsmall" style={styles} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
