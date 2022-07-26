<!--start-code-->

```js
import { Cascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const CustomCascader = ({ placement }) => (
  <Cascader data={data} placement={placement} placeholder={placement} />
);

const App = () => (
  <>
    <CustomCascader placement="topStart" /> <CustomCascader placement="bottomStart" />{' '}
    <CustomCascader placement="autoVerticalStart" />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
