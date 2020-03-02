### Disable Search

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
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
