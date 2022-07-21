<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const styles = { width: 280, display: 'block', marginBottom: 10 };
const App = () => (
  <>
    <CheckTreePicker size="lg" placeholder="Large" data={data} style={styles} />
    <CheckTreePicker size="md" placeholder="Medium" data={data} style={styles} />
    <CheckTreePicker size="sm" placeholder="Small" data={data} style={styles} />
    <CheckTreePicker size="xs" placeholder="Xsmall" data={data} style={styles} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
