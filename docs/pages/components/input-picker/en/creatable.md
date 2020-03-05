### Creatable

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <InputPicker
      creatable
      data={data}
      style={{ width: 224 }}

    />
    <hr />
    <InputPicker
      creatable
      data={data}
      style={{ width: 224 }}

      groupBy="role"
      placeholder="Group Select"
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
