### 禁用

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/province-simplified.js
 */

const instance = (
  <div>
    <Cascader data={data} style={{ width: 224 }} disabled />
    <hr />
    <p>禁用选项</p>
    <Cascader
      data={data}
      style={{ width: 224 }}
      disabledItemValues={['2', '1-1']}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
