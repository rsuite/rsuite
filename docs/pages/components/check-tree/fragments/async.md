<!--start-code-->

```js
import { CheckTree } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();
const data = getNodes(5);

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
