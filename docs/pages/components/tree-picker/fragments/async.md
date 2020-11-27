<!--start-code-->

```js
const AsyncExample = () => {
  const [data, setData] = useState([]);

  return (
    <TreePicker
      data={data}
      style={{ width: 280 }}
      onOpen={() => {
        if (data.length === 0) {
          setTimeout(() => {
            setData([
              {
                label: 'Parent Node',
                value: '0',
                children: []
              }
            ]);
          }, 1000);
        }
      }}
      renderMenu={menu => {
        if (data.length === 0) {
          return (
            <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
              <Spinner spin /> 加载中...
            </p>
          );
        }
        return menu;
      }}
      getChildren={activeNode =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve([
              {
                label: 'Child Node',
                value: `${activeNode.refKey}-0`,
                children: []
              },
              {
                label: 'Child Node',
                value: `${activeNode.refKey}-1`,
                children: []
              }
            ]);
          }, 1000);
        })
      }
    />
  );
};

ReactDOM.render(<AsyncExample />);
```

<!--end-code-->
