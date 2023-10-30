<!--start-code-->

```js
import { TreePicker } from 'rsuite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => (
  <TreePicker
    defaultExpandAll
    data={data}
    style={{ width: 246 }}
    renderTreeNode={nodeData => {
      return (
        <span>
          <AdminIcon /> {nodeData.label}
        </span>
      );
    }}
    placeholder={
      <span>
        <PeoplesIcon /> Select
      </span>
    }
    renderValue={(value, item, selectedElement) => {
      return (
        <span>
          <PeoplesIcon /> {item.label}
        </span>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
