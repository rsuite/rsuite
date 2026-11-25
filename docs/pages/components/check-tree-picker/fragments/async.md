<!--start-code-->

```js
import { CheckTreePicker, Loader, HStack } from 'rsuite';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();

const App = () => {
  const [value, setValue] = React.useState([]);
  const [data, setData] = React.useState([]);

  return (
    <CheckTreePicker
      data={data}
      value={value}
      w={280}
      getChildren={fetchNodes}
      onChange={value => setValue(value)}
      onOpen={() => {
        if (data.length === 0) {
          setTimeout(() => setData(getNodes(5)), 1000);
        }
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
