### Custom options

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/en/city-simplified.ts
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
