### Disabled

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/province-simplified.js
 */

const instance = (
  <div>
    <Cascader data={data} disabled style={{ widht: 224 }} />
    <hr />
    <p>Disabled Option</p>
    <Cascader
      data={data}
      disabledItemValues={['2', '1-1']}
      style={{ widht: 224 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
