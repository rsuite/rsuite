<!--start-code-->

```js
import { CheckTreePicker, Stack } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <CheckTreePicker defaultExpandAll data={data} style={{ width: 280 }} />
    <CheckTreePicker
      defaultExpandAll
      data={data}
      searchable={false}
      style={{ width: 280 }}
      placeholder="Select without search"
    />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
