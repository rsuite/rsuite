<!--start-code-->

```js
import { CheckTreePicker, VStack } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => (
  <VStack w={280}>
    <CheckTreePicker size="lg" placeholder="Large" data={data} block />
    <CheckTreePicker size="md" placeholder="Medium" data={data} block />
    <CheckTreePicker size="sm" placeholder="Small" data={data} block />
    <CheckTreePicker size="xs" placeholder="Xsmall" data={data} block />
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
