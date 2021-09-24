<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <label>Disabled: </label>
    <InputPicker disabled data={data} defaultValue={'Julius'} />
    <label style={{ marginLeft: 10 }}> Disabled option: </label>
    <InputPicker
      data={data}
      defaultValue={'Julius'}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
    />
    <hr />
    <label>Read only: </label>
    <InputPicker readOnly data={data} defaultValue={'Julius'} />

    <hr />
    <label>Plaintext: </label>
    <InputPicker plaintext data={data} defaultValue={'Julius'} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
