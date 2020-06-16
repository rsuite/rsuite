### Draggable

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const App = () => {
  const [treeData, setTreeData] = useState(data);
  return (
    <Tree
      data={treeData}
      draggable
      defaultExpandAll
      onDrop={({ createUpdateDataFunction }, event) =>
        setTreeData(createUpdateDataFunction(treeData))
      }
    />
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
