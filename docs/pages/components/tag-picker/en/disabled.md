### Disabled

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const instance = (
  <div>
    <TagPicker
      data={data}
      defaultValue={['Julius']}
      disabled
      style={{ width: 300 }} menuStyle={{width: 300}}
    />
    <hr />
    <p>Disabled option</p>
    <TagPicker
      data={data}
      defaultValue={['Julius']}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
      style={{ width: 300 }} menuStyle={{width: 300}}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
