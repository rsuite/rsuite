<!--start-code-->

```js
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import { MultiCascadeTree, HStack } from 'rsuite';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();
const initialData = getNodes(5);

const App = () => {
  const [value, setValue] = React.useState();

  return (
    <div style={{ overflow: 'auto' }}>
      <MultiCascadeTree
        value={value}
        onChange={setValue}
        columnWidth={180}
        data={initialData}
        getChildren={fetchNodes}
        renderTreeNode={(label, item) => {
          return (
            <HStack>
              {item.children ? <FolderFillIcon /> : <PageIcon />} {label}
            </HStack>
          );
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
