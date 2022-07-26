### Use with the button

<!--start-code-->

```js
import { MultiCascader, Button } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <MultiCascader data={data} toggleAs={Button} />
    <hr />
    <MultiCascader data={data} block toggleAs={Button} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
