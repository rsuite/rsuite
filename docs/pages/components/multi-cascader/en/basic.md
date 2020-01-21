### Default

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <div>
    <p>Cascade: </p>
    <MultiCascader data={data} style={{ width: 224 }} />
    <hr />
    <p>Not cascaded:</p>
    <MultiCascader cascade={false} data={data} style={{ width: 224 }} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
