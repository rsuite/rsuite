### 禁用

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
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
    <p>禁用选项</p>
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
