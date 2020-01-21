### 和按钮组合

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <div>
    <CheckTreePicker
      data={data}
      style={{ width: 280 }}
      toggleComponentClass={Button}
    />
    <hr />
    <CheckTreePicker
      data={data}
      block
      style={{ width: 280 }}
      toggleComponentClass={Button}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
