<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <CheckTreePicker defaultExpandAll data={data} style={{ width: 280 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
