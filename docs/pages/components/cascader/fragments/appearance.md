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
    <Cascader data={data} appearance="default" placeholder="Default" w={224} />
    <hr />
    <Cascader data={data} appearance="subtle" placeholder="Subtle" w={224} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
