<!--start-code-->

```js
import { CheckTreePicker, Button } from 'rsuite';
import LocationIcon from '@rsuite/icons/Location';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <CheckTreePicker
    defaultExpandAll
    data={data}
    style={{ width: 280 }}
    placeholder={
      <span>
        <LocationIcon /> Select region
      </span>
    }
    renderTreeNode={nodeData => {
      return (
        <span>
          <LocationIcon /> {nodeData.label}
        </span>
      );
    }}
    renderValue={(value, checkedItems) => {
      return (
        <span>
          <span style={{ color: '#575757' }}>
            <LocationIcon /> Region :
          </span>
          {checkedItems.map(item => item.label).join(' , ')}
        </span>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
