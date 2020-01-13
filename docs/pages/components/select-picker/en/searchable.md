### Disable Search

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
 */

const instance = (
  <SelectPicker
    data={data}
    searchable={false}
    style={{ width: 224 }}

  />
);
ReactDOM.render(instance);
```

<!--end-code-->
