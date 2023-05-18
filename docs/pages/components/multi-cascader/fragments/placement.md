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

const CustomMultiCascader = ({ placement }) => (
  <MultiCascader data={data} placement={placement} placeholder={placement} />
);

const App = () => (
  <>
    <CustomMultiCascader placement="topStart" /> <CustomMultiCascader placement="bottomStart" />{' '}
    <CustomMultiCascader placement="autoVerticalStart" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
