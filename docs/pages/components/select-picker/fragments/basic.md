<!--start-code-->

```js
import { SelectPicker, VStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <VStack>
    <SelectPicker data={data} style={{ width: 224 }} />
    <SelectPicker
      data={data}
      searchable={false}
      style={{ width: 224 }}
      placeholder="Select without search"
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
