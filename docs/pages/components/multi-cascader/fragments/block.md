<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => <MultiCascader block data={data} />;

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
