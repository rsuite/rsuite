<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import { mockAsyncData } from './mock';

const [getNodes, fetchNodes] = mockAsyncData();
const initialData = getNodes(5);

const App = () => {
  const [value, setValue] = React.useState();

  return (
    <div className="example-item">
      <MultiCascader
        value={value}
        onChange={setValue}
        placeholder="Select"
        style={{ width: 224 }}
        data={initialData}
        getChildren={fetchNodes}
        renderMenu={(children, menu, parentNode) => {
          if (parentNode && parentNode.loading) {
            return <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>Loading...</p>;
          }
          return menu;
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
