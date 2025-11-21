<!--start-code-->

```js
import { SelectPicker, VStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);
const styles = { width: 224, display: 'block', marginBottom: 10 };

const App = () => (
  <VStack w={224} spacing={10}>
    <SelectPicker size="lg" placeholder="Large" data={data} block />
    <SelectPicker size="md" placeholder="Medium" data={data} block />
    <SelectPicker size="sm" placeholder="Small" data={data} block />
    <SelectPicker size="xs" placeholder="Xsmall" data={data} block />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
