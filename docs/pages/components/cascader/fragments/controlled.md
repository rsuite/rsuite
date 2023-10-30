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

const App = () => {
  const [value, setValue] = React.useState('1-2-2');

  return <Cascader value={value} onChange={setValue} data={data} style={{ width: 224 }} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
