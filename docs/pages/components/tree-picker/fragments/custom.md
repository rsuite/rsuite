<!--start-code-->

```js
import { TreePicker } from 'rsuite';
import LocationIcon from '@rsuite/icons/Location';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <TreePicker
    defaultExpandAll
    data={data}
    style={{ width: 246 }}
    renderTreeNode={nodeData => {
      return (
        <span>
          <LocationIcon /> {nodeData.label}
        </span>
      );
    }}
    placeholder={
      <span>
        <LocationIcon /> Select region
      </span>
    }
    renderValue={(value, item, selectedElement) => {
      return (
        <span>
          <LocationIcon /> {item.label}
        </span>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
