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

const App = () => <CheckTreePicker defaultExpandAll data={data} w={280} showIndentLine />;

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
