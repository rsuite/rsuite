<!--start-code-->

```js
import { CheckTreePicker, Button } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <CheckTreePicker data={data} style={{ width: 280 }} toggleAs={Button} />
    <hr />
    <CheckTreePicker data={data} block style={{ width: 280 }} toggleAs={Button} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
