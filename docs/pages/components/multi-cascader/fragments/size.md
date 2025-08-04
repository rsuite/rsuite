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
    <MultiCascader size="lg" placeholder="Large" data={data} w={224} />
    <MultiCascader size="md" placeholder="Medium" data={data} w={224} />
    <MultiCascader size="sm" placeholder="Small" data={data} w={224} />
    <MultiCascader size="xs" placeholder="Xsmall" data={data} w={224} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
