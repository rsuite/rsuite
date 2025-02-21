<!--start-code-->

```js
import { Rate, VStack } from 'rsuite';

const App = () => (
  <VStack>
    <Rate defaultValue={3} size="xs" />
    <Rate defaultValue={3} size="sm" />
    <Rate defaultValue={3} size="md" />
    <Rate defaultValue={3} size="lg" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
