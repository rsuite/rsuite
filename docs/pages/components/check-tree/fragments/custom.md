<!--start-code-->

```js
import { CheckTree } from 'rsuite';
import PageIcon from '@rsuite/icons/Page';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: layer => `Layer ${layer + 1}` });

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
