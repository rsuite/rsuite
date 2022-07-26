<!--start-code-->

```js
import { TagPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const styles = { width: 300, display: 'block', marginBottom: 10 };

const App = () => (
  <>
    <TagPicker size="lg" placeholder="Large" data={data} style={styles} />
    <TagPicker size="md" placeholder="Medium" data={data} style={styles} />
    <TagPicker size="sm" placeholder="Small" data={data} style={styles} />
    <TagPicker size="xs" placeholder="Xsmall" data={data} style={styles} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
