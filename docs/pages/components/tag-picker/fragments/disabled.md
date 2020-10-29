<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <label>Disabled: </label>
    <TagPicker
      disabled
      data={data}
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <TagPicker
      data={data}
      defaultValue={['Julius']}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
    <hr />
    <label>Read only: </label>
    <TagPicker
      readOnly
      data={data}
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
    <hr />
    <label>Plaintext: </label>
    <TagPicker
      plaintext
      data={data}
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
