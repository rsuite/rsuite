<!--start-code-->

```js
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import { TreePicker, HStack } from 'rsuite';
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
        <HStack>
          <AdminIcon /> {nodeData.label}
        </HStack>
      );
    }}
    placeholder={
      <HStack>
        <PeoplesIcon /> Select
      </HStack>
    }
    renderValue={(value, item, selectedElement) => {
      return (
        <HStack>
          <PeoplesIcon /> {item.label}
        </HStack>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
