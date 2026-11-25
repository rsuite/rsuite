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
  <VStack spacing={8}>
    <TreePicker size="lg" placeholder="Large" data={data} w={246} />
    <TreePicker size="md" placeholder="Medium" data={data} w={246} />
    <TreePicker size="sm" placeholder="Small" data={data} w={246} />
    <TreePicker size="xs" placeholder="Xsmall" data={data} w={246} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
