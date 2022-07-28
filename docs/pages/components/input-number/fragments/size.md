<!--start-code-->

```js
import { InputNumber } from 'rsuite';

const styles = { marginBottom: 10 };
const App = () => (
  <div style={{ width: 160 }}>
    <InputNumber size="lg" style={styles} placeholder="lg" />
    <InputNumber size="md" style={styles} placeholder="md" />
    <InputNumber size="sm" style={styles} placeholder="sm" />
    <InputNumber size="xs" style={styles} placeholder="xs" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
