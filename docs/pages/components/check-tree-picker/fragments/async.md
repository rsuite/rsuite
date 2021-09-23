<!--start-code-->

```js
const AsyncExample = () => {
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);

  return (
    <CheckTreePicker
      data={data}
      value={value}
      style={{ width: 280 }}
      onChange={(value) => setValue(value)}
      onOpen={() => {
        if (data.length === 0) {
          setTimeout(() => {
            setData([
              {
                label: 'Parent Node',
                value: '0',
                children: [],
              },
            ]);
          }, 1000);
        }
      }}
      renderMenu={(menu) => {
        if (data.length === 0) {
          return (
            <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
              <Spinner spin /> 加载中...
            </p>
          );
        }
        return menu;
      }}
      getChildren={(activeNode) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                label: 'Child Node',
                value: `${activeNode.refKey}-0`,
                children: [],
              },
              {
                label: 'Child Node',
                value: `${activeNode.refKey}-1`,
                children: [],
              },
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
