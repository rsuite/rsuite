### Use with the button

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/province-simplified.js
 */

const instance = (
  <div>
    <Cascader data={data} toggleComponentClass={Button} />
    <hr />
    <Cascader data={data} block toggleComponentClass={Button} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
