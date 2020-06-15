### Virtualized List

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/en/city-simplified.json
 */

const instance = (
  <div>
    <CheckTreePicker
      virtualized
      defaultExpandAll
      data={data}
      cascade={false}
      style={{ width: 280 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
