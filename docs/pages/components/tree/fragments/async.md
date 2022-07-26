<!--start-code-->

```js
import { Tree } from 'rsuite';

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
  for (let i = 0; i < Math.random() * 5; i++) {
    children.push(createNode());
  }
  return children;
};

const App = () => {
  const [value, setValue] = React.useState([]);
  const [data, setData] = React.useState(mockData());

  const fetchChildrenData = activeNode => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData());
      }, 1000);
    });
  };

  return (
    <Tree
      data={data}
      style={{ width: 280 }}
      value={value}
      onChange={value => setValue(value)}
      getChildren={fetchChildrenData}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
