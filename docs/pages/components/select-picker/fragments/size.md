<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);
const styles = { width: 224, display: 'block', marginBottom: 10 };

const App = () => (
  <>
    <SelectPicker size="lg" placeholder="Large" data={data} style={styles} />
    <SelectPicker size="md" placeholder="Medium" data={data} style={styles} />
    <SelectPicker size="sm" placeholder="Small" data={data} style={styles} />
    <SelectPicker size="xs" placeholder="Xsmall" data={data} style={styles} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
