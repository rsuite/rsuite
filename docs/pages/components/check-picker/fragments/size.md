<!--start-code-->

```js
import { CheckPicker, VStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <VStack>
    <CheckPicker size="lg" placeholder="Large" data={data} w={224} />
    <CheckPicker size="md" placeholder="Medium" data={data} w={224} />
    <CheckPicker size="sm" placeholder="Small" data={data} w={224} />
    <CheckPicker size="xs" placeholder="Xsmall" data={data} w={224} />
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
