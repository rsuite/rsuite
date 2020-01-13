### 默认

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/city-simplified.ts
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
