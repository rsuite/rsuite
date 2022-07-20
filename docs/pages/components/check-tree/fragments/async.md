<!--start-code-->

```js
import { CheckTree } from 'rsuite';

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
  const [value, setValue] = useState([]);
  const [data, setData] = useState(mockData());

  const fetchChildrenData = activeNode => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData());
      }, 1000);
    });
  };

  return (
    <CheckTree
      data={data}
      value={value}
      style={{ width: 280 }}
      onChange={value => setValue(value)}
      getChildren={fetchChildrenData}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
