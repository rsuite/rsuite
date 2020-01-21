### 自定义选项

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <CheckTree
    data={data}
    renderTreeNode={nodeData => {
      return (
        <span>
          <Icon icon="map-marker" /> {nodeData.label}
        </span>
      );
    }}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
