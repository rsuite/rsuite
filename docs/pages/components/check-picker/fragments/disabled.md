<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <label>Disabled: </label>
    <CheckPicker disabled data={data} defaultValue={['Julius']} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <CheckPicker
      data={data}
      defaultValue={['Julius']}
      style={{ width: 224 }}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
    />
    <hr />
    <label>Read only: </label>
    <CheckPicker readOnly data={data} defaultValue={['Julius']} />

    <hr />
    <label>Plaintext: </label>
    <CheckPicker plaintext data={data} defaultValue={['Julius']} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
