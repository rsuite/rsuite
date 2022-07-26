<!--start-code-->

```js
import { TagInput } from 'rsuite';

const styles = { width: 300, display: 'block', marginBottom: 10 };

const App = () => (
  <>
    <TagInput size="lg" placeholder="Large" style={styles} />
    <TagInput size="md" placeholder="Medium" style={styles} />
    <TagInput size="sm" placeholder="Small" style={styles} />
    <TagInput size="xs" placeholder="Xsmall" style={styles} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
