<!--start-code-->

```js
import { SelectPicker, Stack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <SelectPicker data={data} style={{ width: 224 }} />
    <SelectPicker
      data={data}
      searchable={false}
      style={{ width: 224 }}
      placeholder="Select without search"
    />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
