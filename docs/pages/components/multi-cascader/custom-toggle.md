### 和按钮组合

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/province-simplified.js
 */

const instance = (
  <div>
    <MultiCascader data={data} toggleComponentClass={Button} />
    <hr />
    <MultiCascader data={data} block toggleComponentClass={Button} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
