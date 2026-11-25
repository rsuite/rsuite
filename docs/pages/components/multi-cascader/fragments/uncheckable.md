<!--start-code-->

```js
import { MultiCascader, Button } from 'rsuite';
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
    <MultiCascader
      data={data}
      block
      renderValue={(value, selectedItems) => selectedItems.map(item => item.label).join(' , ')}
      uncheckableItemValues={['1', '2', '2-1']}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
