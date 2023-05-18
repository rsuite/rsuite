<!--start-code-->

```js
import { TreePicker } from 'rsuite';
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
    <TreePicker
      defaultExpandAll
      data={data}
      appearance="default"
      placeholder="Default"
      style={{ width: 246 }}
    />
    <hr />
    <TreePicker
      defaultExpandAll
      data={data}
      appearance="subtle"
      placeholder="Subtle"
      style={{ width: 246 }}
    />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
