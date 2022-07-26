<!--start-code-->

```js
import { InputPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const styles = { width: 224, display: 'block', marginBottom: 10 };
const App = () => (
  <>
    <InputPicker size="lg" placeholder="Large" data={data} style={styles} />
    <InputPicker size="md" placeholder="Medium" data={data} style={styles} />
    <InputPicker size="sm" placeholder="Small" data={data} style={styles} />
    <InputPicker size="xs" placeholder="Xsmall" data={data} style={styles} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
