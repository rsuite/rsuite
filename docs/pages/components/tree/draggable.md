### 可拖拽

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const Basic = () => {
  const [treeData, setTreeData] = useState(data);
  return (
    <Tree
      data={treeData}
      draggable
      onDrop={({ createUpdateDataFunction }, event) =>
        setTreeData(createUpdateDataFunction(treeData))
      }
    />
  );
};
ReactDOM.render(<Basic />);
```

<!--end-code-->
