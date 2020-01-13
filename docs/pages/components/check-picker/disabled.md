### 禁用

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
 */

const instance = (
  <div>
    <CheckPicker
      data={data}
      style={{ width: 224 }}
      defaultValue={['Julius']}
      disabled
    />
    <hr />
    <p>禁用选项</p>
    <CheckPicker
      data={data}
      style={{ width: 224 }}
      defaultValue={['Julius']}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
