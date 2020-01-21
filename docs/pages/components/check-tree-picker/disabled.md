### 禁用与不可选

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <div>
    <CheckTreePicker data={data} disabled style={{ width: 280 }} />
    <hr />
    <p>Disabled item</p>
    <CheckTreePicker
      defaultExpandAll
      data={data}
      disabledItemValues={[1, 3, 36]}
      style={{ width: 280 }}
    />
    <hr />
    <p>Uncheckable</p>
    <CheckTreePicker
      defaultExpandAll
      style={{ width: 280 }}
      data={data}
      uncheckableItemValues={[1, 3, 36]}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
