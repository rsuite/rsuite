### 默认

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <div>
    <p>级联：</p>
    <CheckTreePicker defaultExpandAll data={data} style={{ width: 280 }} />
    <hr />
    <p>非级联：</p>
    <CheckTreePicker
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
