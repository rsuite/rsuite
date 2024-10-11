<!--start-code-->

```js
import { TreePicker, VStack } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => (
  <VStack>
    <TreePicker defaultExpandAll data={data} style={{ width: 246 }} />
    <TreePicker
      defaultExpandAll
      data={data}
      searchable={false}
      style={{ width: 246 }}
      placeholder="Select without search"
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
