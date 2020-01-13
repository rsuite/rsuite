### Default

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/en/city-simplified.ts
 */

const instance = (
  <div>
    <p>Cascade:</p>
    <CheckTreePicker defaultExpandAll data={data} style={{ width: 280 }} />
    <hr />
    <p>Not cascaded:</p>
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
