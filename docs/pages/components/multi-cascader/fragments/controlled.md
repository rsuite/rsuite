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

const App = () => {
  const [value, setValue] = React.useState(['1-1', '1-2']);

  return <MultiCascader value={value} onChange={setValue} data={data} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
