<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <div>
    <label>Disabled: </label>
    <Cascader disabled defaultValue="1-1" data={data} style={{ widht: 224 }} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <Cascader
      data={data}
      defaultValue="1-1"
      disabledItemValues={['2', '1-1']}
      style={{ widht: 224 }}
    />
    <hr />
    <label>Read only: </label>
    <Cascader readOnly defaultValue="1-1" data={data} style={{ widht: 224 }} />

    <hr />
    <label>Plaintext: </label>
    <Cascader plaintext defaultValue="1-1" data={data} style={{ widht: 224 }} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
