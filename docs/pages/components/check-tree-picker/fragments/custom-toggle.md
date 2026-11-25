<!--start-code-->

```js
import { CheckTreePicker, Button } from 'rsuite';
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
    <CheckTreePicker data={data} w={280} toggleAs={Button} />
    <hr />
    <CheckTreePicker data={data} block w={280} toggleAs={Button} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
