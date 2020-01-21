### 直接展示

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <Cascader
    inline
    data={data}
    searchable={false}
    menuHeight="auto"
    menuWidth={180}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
