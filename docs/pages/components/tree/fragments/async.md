<!--start-code-->

```js
const AsyncExample = () => {
  const [data, setData] = useState([
    {
      label: 'Parent Node',
      value: '0',
      children: []
    }
  ]);

  return (
    <Tree
      data={data}
      style={{ width: 280 }}
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
