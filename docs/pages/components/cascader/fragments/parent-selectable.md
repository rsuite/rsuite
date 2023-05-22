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
    <Cascader data={data} parentSelectable style={{ width: 224 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
