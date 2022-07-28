<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();

const App = () => {
  const [value, setValue] = React.useState([]);
  const [data, setData] = React.useState([]);

  return (
    <CheckTreePicker
      data={data}
      value={value}
      style={{ width: 280 }}
      getChildren={fetchNodes}
      onChange={value => setValue(value)}
      onOpen={() => {
        if (data.length === 0) {
          setTimeout(() => setData(getNodes(5)), 1000);
        }
      }}
      renderMenu={menu => {
        if (data.length === 0) {
          return (
            <div style={{ padding: 10, color: '#999', textAlign: 'center' }}>
              <SpinnerIcon spin /> Loading...
            </div>
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
