### 外观

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <div>
    <CheckTreePicker
      defaultExpandAll
      data={data}
      appearance="default"
      placeholder="Default"
      style={{ width: 280 }}
    />
    <hr />
    <CheckTreePicker
      defaultExpandAll
      data={data}
      appearance="subtle"
      placeholder="Subtle"
      style={{ width: 280 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
