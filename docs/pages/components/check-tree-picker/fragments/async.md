<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

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
  const [data, setData] = React.useState([]);

  const fetchChildrenData = activeNode => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData());
      }, 1000);
    });
  };

  return (
    <CheckTreePicker
      data={data}
      value={value}
      style={{ width: 280 }}
      onChange={value => setValue(value)}
      onOpen={() => {
        if (data.length === 0) {
          setTimeout(() => setData(mockData()), 1000);
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
      getChildren={fetchChildrenData}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
