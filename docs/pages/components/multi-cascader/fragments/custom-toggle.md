### Use with the button

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
    <MultiCascader data={data} toggleAs={Button} />
    <hr />
    <MultiCascader data={data} block toggleAs={Button} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
