<!--start-code-->

```js
import { Cascader } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();
const initialData = getNodes(5);

const App = () => {
  const [value, setValue] = React.useState();

  return (
    <div className="example-item">
      <Cascader
        value={value}
        onChange={setValue}
        placeholder="Select"
        style={{ width: 224 }}
        data={initialData}
        columnWidth={200}
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
