<!--start-code-->

```js
import { TagPicker, VStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <VStack w={300}>
    <TagPicker size="lg" placeholder="Large" data={data} block />
    <TagPicker size="md" placeholder="Medium" data={data} block />
    <TagPicker size="sm" placeholder="Small" data={data} block />
    <TagPicker size="xs" placeholder="Xsmall" data={data} block />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
