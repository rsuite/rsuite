<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <div>
    <label>Disabled: </label>
    <MultiCascader disabled defaultValue={['1-1']} data={data} style={{ width: 224 }} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <MultiCascader data={data} disabledItemValues={['1', '2-1']} style={{ width: 224 }} />
    <hr />
    <label>Read only: </label>
    <MultiCascader readOnly defaultValue={['1-1']} data={data} style={{ width: 224 }} />

    <hr />
    <label>Plaintext: </label>
    <MultiCascader plaintext defaultValue={['1-1']} data={data} style={{ width: 224 }} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
