### 虚拟列表

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <TreePicker defaultExpandAll virtualized data={data} style={{ width: 246 }} />
);
ReactDOM.render(instance);
```

<!--end-code-->
