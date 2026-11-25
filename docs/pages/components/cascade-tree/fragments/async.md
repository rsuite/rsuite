<!--start-code-->

```js
import { CascadeTree } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();
const initialData = getNodes(5);

const App = () => {
  return (
    <div style={{ overflow: 'auto' }}>
      <CascadeTree
        columnWidth={180}
        data={initialData}
        getChildren={node => {
          return fetchNodes(node.id);
        }}
        renderTreeNode={(label, item) => {
          return (
            <>
              {item.children ? <FolderFillIcon /> : <PageIcon />} {label}
            </>
          );
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
