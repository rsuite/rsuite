<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.name[methodName[layer]]();
  }
});

const App = () => (
  <>
    <CheckTreePicker defaultExpandAll data={data} style={{ width: 280 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
