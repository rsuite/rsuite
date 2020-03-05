### Disabled

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <CheckPicker data={data} defaultValue={['Julius']} disabled />
    <hr />
    <p>禁用选项</p>
    <CheckPicker
      data={data}
      defaultValue={['Julius']}
      style={{ width: 224 }}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
