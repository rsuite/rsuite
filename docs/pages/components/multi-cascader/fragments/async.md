<!--start-code-->

```js
function createNode() {
  const hasChildren = Math.random() > 0.2;
  return {
    label: `Node ${(Math.random() * 1e18).toString(36).slice(0, 3).toUpperCase()}`,
    value: Math.random() * 1e18,
    children: hasChildren ? [] : null
  };
}

function createChildren() {
  const children = [];
  for (let i = 0; i < Math.random() * 10; i++) {
    children.push(createNode());
  }
  return children;
}

function fetchNodes(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(createChildren());
    }, 500);
  });
}

const defaultData = createChildren();

const App = () => {
  const [value, setValue] = React.useState();

  return (
    <div className="example-item">
      <MultiCascader
        value={value}
        onChange={setValue}
        placeholder="Select"
        style={{ width: 224 }}
        data={defaultData}
        getChildren={node => {
          return fetchNodes(node.id);
        }}
        /**
         *  Set the status of data loading.
        renderMenu={(children, menu, parentNode) => {
          if (parentNode && parentNode.loading) {
            return (
              <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                <Spinner spin /> Loading...
              </p>
            );
          }
          return menu;
        }}
        */
      />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
