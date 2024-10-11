<!--start-code-->

```js
import { MultiCascader, VStack } from 'rsuite';
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
    <MultiCascader data={data} style={{ width: 224 }} />
    <MultiCascader
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
