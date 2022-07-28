<!--start-code-->

```js
import { Cascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.name[methodName[layer]]();
  }
});
const styles = { width: 224, display: 'block', marginBottom: 10 };

const App = () => (
  <>
    <Cascader toggleAs={Button} size="lg" placeholder="Large" data={data} style={styles} />
    <Cascader toggleAs={Button} size="md" placeholder="Medium" data={data} style={styles} />
    <Cascader toggleAs={Button} size="sm" placeholder="Small" data={data} style={styles} />
    <Cascader toggleAs={Button} size="xs" placeholder="Xsmall" data={data} style={styles} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
