<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <label>Disabled: </label>
    <SelectPicker disabled data={data} defaultValue={'Julius'} style={{ width: 224 }} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <SelectPicker
      data={data}
      style={{ width: 224 }}
      defaultValue={'Julius'}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
    />
    <hr />
    <label>Read only: </label>
    <SelectPicker readOnly data={data} defaultValue={'Julius'} style={{ width: 224 }} />

    <hr />
    <label>Plaintext: </label>
    <SelectPicker plaintext data={data} defaultValue={'Julius'} style={{ width: 224 }} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
