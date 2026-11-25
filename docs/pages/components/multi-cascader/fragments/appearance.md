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
    <MultiCascader data={data} appearance="default" placeholder="Default" w={224} />
    <hr />
    <MultiCascader data={data} appearance="subtle" placeholder="Subtle" w={224} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
