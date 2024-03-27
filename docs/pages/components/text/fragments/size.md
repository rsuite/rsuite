<!--start-code-->

```js
import { Text } from 'rsuite';

const App = () => (
  <>
    <Text size="sm">Text size: Small</Text>
    <Text size="md"> Text size: Medium (default)</Text>
    <Text size="lg"> Text size: Large</Text>
    <Text size="xl"> Text size: Extra Large</Text>
    <Text size="xxl"> Text size: Double Extra Large</Text>
    <Text size="2rem"> Text size: Custom size `2rem`</Text>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
