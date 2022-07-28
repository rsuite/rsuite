<!--start-code-->

```js
import { Tree } from 'rsuite';
import { mockAsyncData } from './mock';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';

const [getNodes, fetchNodes] = mockAsyncData();
const data = getNodes(5);

const App = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Tree
      data={data}
      style={{ width: 280 }}
      value={value}
      onChange={value => setValue(value)}
      getChildren={fetchNodes}
      renderTreeNode={node => {
        return (
          <>
            {node.children ? <FolderFillIcon /> : <PageIcon />} {node.label}
          </>
        );
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
