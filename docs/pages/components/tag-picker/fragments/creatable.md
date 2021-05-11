<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <TagPicker
      creatable
      data={data}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagPicker
      creatable
      data={data}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
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
