<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <CheckTree
    data={data}
    defaultExpandAll
    renderTreeNode={(nodeData) => {
      return (
        <span>
          <MapMarker /> {nodeData.label}
        </span>
      );
    }}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
