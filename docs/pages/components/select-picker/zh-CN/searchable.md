### 禁用搜索框

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <SelectPicker
    data={data}
    style={{ width: 224 }}

    searchable={false}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
