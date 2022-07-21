<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <div>
    <p>Cascade:</p>
    <MultiCascader data={data} defaultValue={['1-1', '1-2', '2']} />
    <hr />
    <p>Not cascaded:</p>
    <MultiCascader data={data} defaultValue={['1-1', '1-2', '2']} cascade={false} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
