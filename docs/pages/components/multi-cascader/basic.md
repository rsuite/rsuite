### 默认

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/province-simplified.js
 */

const instance = (
  <div>
    <p>级联：</p>
    <MultiCascader data={data} style={{ width: 224 }} />
    <hr />
    <p>非级联：</p>
    <MultiCascader cascade={false} data={data} style={{ width: 224 }} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
