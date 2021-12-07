<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/main/docs/public/data/en/city-simplified.json
 */

const App = () => {
  const treeRef = React.useRef();
  const [index, setIndex] = React.useState(1);
  return (
    <div bordered>
      <Panel bordered>
        <Tree data={data} ref={treeRef} defaultExpandAll virtualized />
      </Panel>
      <hr />
      <div style={{ justifyContent: 'flex-start', display: 'flex' }}>
        <InputNumber value={index} onChange={setIndex} style={{ width: 100, marginRight: 10 }} />
        <Button
          onClick={() => {
            // https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#scrolltorow-index-number
            treeRef.current.list.scrollToRow(index);
          }}
        >
          scrollToRow
        </Button>
      </div>
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
