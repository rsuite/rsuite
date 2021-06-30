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
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <InputPicker
      creatable
      data={data}
      style={{ width: 224 }}
      groupBy="role"
      placeholder="Group Select"
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
