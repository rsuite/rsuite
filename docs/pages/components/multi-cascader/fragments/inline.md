<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
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
    <MultiCascader inline data={data} searchable={false} menuHeight="auto" menuWidth={180} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
