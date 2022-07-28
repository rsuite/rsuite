<!--start-code-->

```js
import { TreePicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
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
          <>
            {item.children ? <FolderFillIcon /> : <PageIcon />} {item.label}
          </>
        );
      }}
      renderMenu={menu => {
        if (data.length === 0) {
          return (
            <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>
              <SpinnerIcon spin /> Loading...
            </p>
          );
        }
        return menu;
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
