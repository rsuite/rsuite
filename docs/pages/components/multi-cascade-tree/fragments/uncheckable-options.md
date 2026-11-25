<!--start-code-->

```js
import { MultiCascadeTree } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const uncheckableItemValues = [data[0].value, data[1].value, data[2].value];

const App = () => {
  return (
    <>
      <MultiCascadeTree data={data} uncheckableItemValues={uncheckableItemValues} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
