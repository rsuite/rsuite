<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <MultiCascader data={data} appearance="default" placeholder="Default" style={{ width: 224 }} />
    <hr />
    <MultiCascader data={data} appearance="subtle" placeholder="Subtle" style={{ width: 224 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
