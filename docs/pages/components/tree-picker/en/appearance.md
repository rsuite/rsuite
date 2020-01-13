### Appearance

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/en/city-simplified.ts
 */

const instance = (
  <div>
    <TreePicker
      defaultExpandAll
      data={data}
      appearance="default"
      placeholder="Default"
      style={{ width: 246 }}
    />
    <hr />
    <TreePicker
      defaultExpandAll
      data={data}
      appearance="subtle"
      placeholder="Subtle"
      style={{ width: 246 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
