<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const Label = props => {
  return <label style={{ width: 120, display: 'inline-block', marginTop: 10 }} {...props} />;
};

const instance = (
  <div>
    <Label>Disabled: </Label>
    <CheckTreePicker disabled data={data} defaultValue={[24]} style={{ width: 220 }} />
    <br />
    <Label>Disabled option: </Label>
    <CheckTreePicker
      defaultExpandAll
      data={data}
      disabledItemValues={[1, 3, 36]}
      defaultValue={[24]}
      style={{ width: 220 }}
    />
    <br />
    <Label>Uncheckable: </Label>
    <CheckTreePicker
      defaultExpandAll
      data={data}
      uncheckableItemValues={[1, 3, 36]}
      defaultValue={[24]}
      style={{ width: 220 }}
    />

    <hr />
    <Label>Read only: </Label>
    <CheckTreePicker readOnly data={data} defaultValue={[24]} style={{ width: 220 }} />
    <hr />
    <Label>Plaintext: </Label>
    <CheckTreePicker plaintext data={data} defaultValue={[24]} style={{ width: 220 }} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
