### Disabled

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/en/city-simplified.ts
 */

const instance = (
  <div>
    <TreePicker data={data} disabled style={{ width: 246 }} />
    <hr />
    <p>Disabled Option</p>
    <TreePicker
      defaultExpandAll
      data={data}
      disabledItemValues={[2]}
      style={{ width: 246 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
