<!--start-code-->

```js
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import { TreePicker, HStack, Loader } from 'rsuite';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();

const App = () => {
  const [value, setValue] = React.useState();
  const [data, setData] = React.useState([]);

  return (
    <TreePicker
      data={data}
      style={{ width: 280 }}
      value={value}
      onChange={value => setValue(value)}
      getChildren={fetchNodes}
      onOpen={() => {
        if (data.length === 0) {
          setTimeout(() => setData(getNodes(5)), 1000);
        }
      }}
      renderTreeNode={item => {
        return (
          <HStack>
            {item.children ? <FolderFillIcon /> : <PageIcon />} {item.label}
          </HStack>
        );
      }}
      renderTree={tree => {
        if (data.length === 0) {
          return (
            <HStack justifyContent="center">
              <Loader content="Loading..." />
            </HStack>
          );
        }
        return tree;
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
