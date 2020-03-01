### 禁用

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const instance = (
  <div>
    <InputPicker
      data={data}
      defaultValue={'Julius'}
      disabled
      style={{ width: 224 }}

    />
    <hr />
    <p>禁用选项</p>
    <InputPicker
      data={data}
      defaultValue={'Julius'}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
      style={{ width: 224 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
