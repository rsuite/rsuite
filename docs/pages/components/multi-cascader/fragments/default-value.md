<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <div>
    <p>Cascade:</p>
    <MultiCascader data={data} defaultValue={['1-1', '1-2', '2']} />
    <hr />
    <p>Not cascaded:</p>
    <MultiCascader data={data} defaultValue={['1-1', '1-2', '2']} cascade={false} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
