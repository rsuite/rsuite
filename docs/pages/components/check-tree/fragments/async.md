<!--start-code-->

```js
const AsyncExample = () => {
  const [value, setValue] = useState([]);
  const [data, setData] = useState([
    {
      label: 'Parent Node',
      value: '0',
      children: []
    }
  ]);

  return (
    <CheckTree
      data={data}
      value={value}
      style={{ width: 280 }}
      onChange={value => setValue(value)}
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
