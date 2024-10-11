<!--start-code-->

```js
import { Cascader, VStack } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => {
  return (
    <VStack>
      <Cascader data={data} style={{ width: 224 }} />
      <Cascader
        data={data}
        searchable={false}
        style={{ width: 224 }}
        placeholder="Select without search"
      />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
