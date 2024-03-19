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

const disabledItemValues = [data[0].value];

const App = () => {
  return (
    <>
      <MultiCascadeTree data={data} disabledItemValues={disabledItemValues} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
