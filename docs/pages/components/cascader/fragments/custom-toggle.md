### Use with the button

<!--start-code-->

```js
import { Cascader, Button } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <Cascader data={data} toggleAs={Button} />
    <hr />
    <Cascader data={data} block toggleAs={Button} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
