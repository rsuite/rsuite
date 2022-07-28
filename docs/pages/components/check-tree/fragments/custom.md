<!--start-code-->

```js
import { CheckTree } from 'rsuite';
import PageIcon from '@rsuite/icons/Page';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.name[methodName[layer]]();
  }
});

const App = () => (
  <CheckTree
    data={data}
    defaultExpandAll
    renderTreeNode={nodeData => {
      return (
        <span>
          <PageIcon /> {nodeData.label}
        </span>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
