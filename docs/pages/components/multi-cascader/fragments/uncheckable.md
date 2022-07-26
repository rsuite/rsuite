<!--start-code-->

```js
import { MultiCascader, Button } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <MultiCascader
      data={data}
      block
      renderValue={(value, selectedItems) => selectedItems.map(item => item.label).join(' , ')}
      uncheckableItemValues={['1', '2', '2-1']}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
