<!--start-code-->

```js
import { InputPicker, VStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <VStack style={{ width: 224 }} spacing={10}>
    <InputPicker size="lg" placeholder="Large" data={data} block />
    <InputPicker size="md" placeholder="Medium" data={data} block />
    <InputPicker size="sm" placeholder="Small" data={data} block />
    <InputPicker size="xs" placeholder="Xsmall" data={data} block />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
