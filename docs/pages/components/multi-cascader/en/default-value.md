### Default value

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <div>
    <p>Cascade:</p>
    <MultiCascader
      data={data}
      style={{ width: 224 }}
      defaultValue={['1-1', '1-2', '1-3']}
    />
    <hr />
    <p>Not cascaded:</p>
    <MultiCascader
      data={data}
      style={{ width: 224 }}
      defaultValue={['1-1', '1-2', '1-3']}
      cascade={false}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
