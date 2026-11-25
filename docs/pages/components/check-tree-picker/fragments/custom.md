<!--start-code-->

```js
import { CheckTreePicker, Button, HStack } from 'rsuite';
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
    block
    defaultExpandAll
    data={data}
    placeholder={
      <HStack>
        <PeoplesIcon /> Select
      </HStack>
    }
    renderTreeNode={nodeData => {
      return (
        <HStack>
          <AdminIcon /> {nodeData.label}
        </HStack>
      );
    }}
    renderValue={(value, checkedItems) => {
      return (
        <HStack>
          <HStack c="#575757">
            <PeoplesIcon /> Peoples:
          </HStack>
          {checkedItems.map(item => item.label).join(' , ')}
        </HStack>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
