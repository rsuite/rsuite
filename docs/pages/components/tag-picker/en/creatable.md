### Creatable

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
 */

const instance = (
  <div>
    <TagPicker creatable data={data} style={{ width: 300 }} menuStyle={{width: 300}} />
    <hr />
    <TagPicker
      creatable
      data={data}
      style={{ width: 300 }} menuStyle={{width: 300}}
      groupBy="role"
      placeholder="Group Select"
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
