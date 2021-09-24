<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <div>
    <label>Disabled: </label>
    <TreePicker disabled data={data} defaultValue={24} style={{ width: 246 }} />
    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <TreePicker
      defaultExpandAll
      data={data}
      defaultValue={24}
      disabledItemValues={[2]}
      style={{ width: 246 }}
    />

    <hr />
    <label>Read only: </label>
    <TreePicker readOnly data={data} defaultValue={24} style={{ width: 246 }} />

    <hr />
    <label>Plaintext: </label>
    <TreePicker plaintext data={data} defaultValue={24} style={{ width: 246 }} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
