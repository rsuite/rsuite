<!--start-code-->

```js
import { Cascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => (
  <>
    <Cascader block data={data} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
