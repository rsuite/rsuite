<!--start-code-->

```js
import { CheckTreePicker, Button } from 'rsuite';
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
  <CheckTreePicker
    defaultExpandAll
    data={data}
    style={{ width: 280 }}
    placeholder={
      <span>
        <PeoplesIcon /> Select
      </span>
    }
    renderTreeNode={nodeData => {
      return (
        <span>
          <AdminIcon /> {nodeData.label}
        </span>
      );
    }}
    renderValue={(value, checkedItems) => {
      return (
        <span>
          <span style={{ color: '#575757' }}>
            <PeoplesIcon /> Peoples:{' '}
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
