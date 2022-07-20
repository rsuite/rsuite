<!--start-code-->

```js
import { Cascader } from 'rsuite';

const fetchNodes = id =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData());
    }, 500);
  });

const createNode = () => {
  const hasChildren = Math.random() > 0.2;
  return {
    label: `Node ${(Math.random() * 1e18).toString(36).slice(0, 3).toUpperCase()}`,
    value: Math.random() * 1e18,
    children: hasChildren ? [] : null
  };
};

const mockData = () => {
  const children = [];
  for (let i = 0; i < Math.random() * 10; i++) {
    children.push(createNode());
  }
  return children;
};

const data = mockData();

const App = () => {
  const [value, setValue] = React.useState();

  return (
    <div className="example-item">
      <Cascader
        value={value}
        onChange={setValue}
        placeholder="Select"
        style={{ width: 224 }}
        data={data}
        getChildren={node => {
          return fetchNodes(node.id);
        }}
        renderMenu={(children, menu, parentNode) => {
          if (parentNode && parentNode.loading) {
            return <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>Loading...</p>;
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
