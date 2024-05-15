<!--start-code-->

```js
import { CheckTree } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();
const data = getNodes(5);

const TreeNode = ({ children, ...rest }) => {
  return (
    <div {...rest} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {children}
    </div>
  );
};

const App = () => {
  const [value, setValue] = React.useState([]);

  return (
    <CheckTree
      data={data}
      value={value}
      style={{ width: 280 }}
      onChange={value => setValue(value)}
      getChildren={fetchNodes}
      renderTreeNode={node => {
        return (
          <TreeNode>
            {node.children ? <FolderFillIcon /> : <PageIcon />} {node.label}
          </TreeNode>
        );
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
