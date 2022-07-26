<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <MultiCascader inline data={data} searchable={false} menuHeight="auto" menuWidth={180} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
