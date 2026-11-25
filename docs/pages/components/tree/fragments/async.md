<!--start-code-->

```js
import { Tree } from 'rsuite';
import { mockAsyncData } from './mock';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';

const TreeNode = ({ children, ...rest }) => {
  return (
    <div {...rest} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {children}
    </div>
  );
};

const [getNodes, fetchNodes] = mockAsyncData();
const data = getNodes(5);

const App = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Tree
      data={data}
      value={value}
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
