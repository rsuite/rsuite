<!--start-code-->

```js
import { TreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const styles = { width: 246, display: 'block', marginBottom: 10 };
const App = () => (
  <>
    <TreePicker size="lg" placeholder="Large" data={data} style={styles} />
    <TreePicker size="md" placeholder="Medium" data={data} style={styles} />
    <TreePicker size="sm" placeholder="Small" data={data} style={styles} />
    <TreePicker size="xs" placeholder="Xsmall" data={data} style={styles} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
