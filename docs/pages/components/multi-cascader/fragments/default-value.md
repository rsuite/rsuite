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
  <div>
    <p>Cascade:</p>
    <MultiCascader data={data} defaultValue={['1-1', '1-2', '2']} />
    <hr />
    <p>Not cascaded:</p>
    <MultiCascader data={data} defaultValue={['1-1', '1-2', '2']} cascade={false} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
